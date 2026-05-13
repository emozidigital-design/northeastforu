const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const pool = require('../lib/db');
const contentGenerator = require('../services/contentGenerator.service');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function updateJob(jobId, data) {
    if (!jobId) return;
    try {
        const { status, progress, current_item, error_message } = data;
        await pool.query(
            `UPDATE automation_jobs SET
             status = COALESCE($1, status),
             progress = COALESCE($2, progress),
             current_item = COALESCE($3, current_item),
             error_message = COALESCE($4, error_message),
             updated_at = NOW()
             WHERE id = $5`,
            [status, progress, current_item, error_message, jobId]
        );
    } catch (err) {
        console.error('Failed to update job status:', err.message);
    }
}

async function processGaps(jobId) {
    console.log(`Starting content processing job ${jobId || '(no ID)'} with rate limit handling...`);
    const researchFile = path.join(__dirname, '../research/assamholidays-research.json');
    const researchData = JSON.parse(fs.readFileSync(researchFile, 'utf8'));

    const highPriorityGaps = researchData.destinationGaps.filter(gap => gap.priority === 'high');
    const totalItems = highPriorityGaps.length + 1 + 5; // Gaps + FAQs + Itineraries
    let processedItems = 0;

    console.log(`Found ${highPriorityGaps.length} high priority gaps to process.`);

    // Get Assam state ID
    const stateRes = await pool.query("SELECT id FROM states WHERE slug = 'assam'");
    if (stateRes.rows.length === 0) {
        const err = 'Assam state not found in database.';
        console.error(err);
        await updateJob(jobId, { status: 'failed', error_message: err });
        return;
    }
    const stateId = stateRes.rows[0].id;

    for (const gap of highPriorityGaps) {
        try {
            console.log(`Processing gap: ${gap.topic} (${gap.suggestedPageType})`);
            await updateJob(jobId, {
                current_item: `Generating ${gap.suggestedPageType}: ${gap.topic}`,
                progress: Math.round((processedItems / totalItems) * 100)
            });

            if (gap.suggestedPageType === 'city') {
                await sleep(10000);
                const content = await contentGenerator.generateCityContent(gap.topic);
                await saveCity(content, stateId);
            } else if (gap.suggestedPageType === 'attraction') {
                await sleep(60000);
                const parentCitySlug = gap.suggestedUrl.split('/')[2];
                const content = await contentGenerator.generateAttractionContent(gap.topic, parentCitySlug);
                await saveAttraction(content);
            } else if (gap.suggestedPageType === 'blog') {
                await sleep(60000);
                const content = await contentGenerator.generateBlogContent(gap.topic, 'Travel Guide');
                await saveBlog(content);
            }

            processedItems++;
            console.log(`✅ Successfully processed: ${gap.topic}`);
        } catch (error) {
            console.error(`Failed to process gap ${gap.topic}:`, error);
        }
    }

    console.log('Generating 30 Assam FAQs...');
    await updateJob(jobId, {
        current_item: 'Generating 30 Assam FAQs...',
        progress: Math.round((processedItems / totalItems) * 100)
    });

    try {
        await sleep(60000);
        const faqs = await contentGenerator.generateMassFAQs();
        await saveFAQs(faqs);
        processedItems++;
        console.log('✅ Successfully saved 30 FAQs');
    } catch (error) {
        console.error('Failed to generate FAQs:', error);
    }

    console.log('Generating Itineraries...');
    const itineraryTypes = [
        { type: '3 Days Assam Wildlife', duration: '3 days', focus: 'Kaziranga, Pobitora, Manas', keyword: '3 days assam itinerary' },
        { type: '5 Days Classic Assam', duration: '5 days', focus: 'Guwahati, Kamakhya, Kaziranga, Majuli', keyword: '5 days assam tour package' },
        { type: '7 Days Complete Assam', duration: '7 days', focus: 'All major Assam destinations', keyword: '7 days assam travel itinerary' },
        { type: 'Assam Tea Tourism', duration: 'X days', focus: 'Tea gardens, Jorhat, Dibrugarh', keyword: 'assam tea garden tour' },
        { type: 'Assam River Journey', duration: 'X days', focus: 'Brahmaputra cruise, river islands', keyword: 'brahmaputra river cruise assam' }
    ];

    for (const itin of itineraryTypes) {
        try {
            await updateJob(jobId, {
                current_item: `Generating itinerary: ${itin.type}`,
                progress: Math.round((processedItems / totalItems) * 100)
            });
            await sleep(60000);
            const content = await contentGenerator.generateItineraryContent(itin.type, itin.duration, itin.focus, itin.keyword);
            await saveItinerary(content);
            processedItems++;
            console.log(`✅ Successfully saved itinerary: ${itin.type}`);
        } catch (error) {
            console.error(`Failed to generate itinerary ${itin.type}:`, error);
        }
    }

    await updateJob(jobId, {
        status: 'completed',
        progress: 100,
        current_item: 'All content generated successfully.'
    });
    console.log('Content processing job completed.');
}

async function saveCity(content, stateId) {
    const truncate = (str, len) => str ? String(str).substring(0, len) : null;

    const checkRes = await pool.query("SELECT id FROM cities WHERE slug = $1", [content.slug]);
    if (checkRes.rows.length > 0) {
        console.log(`City ${content.slug} already exists. Skipping...`);
        return;
    }

    await pool.query(
        `INSERT INTO cities (state_id, name, slug, description, budget_per_day, how_to_reach, best_time_to_visit, seo_title, seo_description, faq)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            stateId,
            truncate(content.name, 255),
            truncate(content.slug, 255),
            content.description,
            content.budgetPerDay,
            typeof content.howToReach === 'object' ? JSON.stringify(content.howToReach) : content.howToReach,
            truncate(content.bestTimeToVisit, 255),
            truncate(content.seoTitle, 255),
            content.seoDescription,
            JSON.stringify(content.faqQuestions)
        ]
    );
    console.log(`Saved new city: ${content.name}`);
}

async function saveAttraction(content) {
    const truncate = (str, len) => str ? String(str).substring(0, len) : null;

    const cityRes = await pool.query("SELECT id FROM cities WHERE slug = $1", [content.citySlug]);
    if (cityRes.rows.length === 0) {
        console.error(`City ${content.citySlug} not found for attraction ${content.name}`);
        return;
    }
    const cityId = cityRes.rows[0].id;

    const checkRes = await pool.query("SELECT id FROM attractions WHERE slug = $1", [content.slug]);
    if (checkRes.rows.length > 0) {
        console.log(`Attraction ${content.slug} already exists.`);
        return;
    }

    await pool.query(
        `INSERT INTO attractions (city_id, name, slug, description, entry_fee, timings, best_time, seo_title, seo_description, faq)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            cityId,
            truncate(content.name, 255),
            truncate(content.slug, 255),
            content.description,
            truncate(content.entryFee, 255),
            truncate(content.openingHours, 255),
            truncate(content.bestTimeToVisit, 255),
            truncate(content.seoTitle, 255),
            content.seoDescription,
            JSON.stringify(content.faqQuestions)
        ]
    );
    console.log(`Saved new attraction: ${content.name}`);
}

async function saveBlog(content) {
    const checkRes = await pool.query("SELECT id FROM blogs WHERE slug = $1", [content.slug]);
    let slug = content.slug;
    if (checkRes.rows.length > 0) {
        slug = `${slug}-2`;
    }

    await pool.query(
        `INSERT INTO blogs (title, slug, content, category, seo_title, seo_description, ai_draft, published_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
            content.title,
            slug,
            content.content,
            content.category,
            content.seoTitle,
            content.seoDescription,
            true,
            null // Unpublished
        ]
    );
    console.log(`Saved new blog: ${content.title}`);
}

async function saveFAQs(faqs) {
    for (const faq of faqs) {
        await pool.query(
            `INSERT INTO faq_items (page_type, page_slug, question, answer, is_approved)
             VALUES ($1, $2, $3, $4, $5)`,
            ['state', 'assam', faq.question, faq.answer, false]
        );
    }
    console.log(`Saved ${faqs.length} FAQs for Assam.`);
}

async function saveItinerary(content) {
    const durationDays = parseInt(content.duration) || 0;
    const priceEstimate = parseFloat(content.totalEstimatedCost.midRange.replace(/[^0-9.]/g, '')) || 0;

    // Construct rich description from days
    let description = content.introduction + '\n\n';
    content.days.forEach(day => {
        description += `### Day ${day.dayNumber}: ${day.title}\n${day.description}\n**Stay:** ${day.accommodation}\n**Meals:** ${day.meals}\n**Tips:** ${day.tips}\n\n`;
    });
    description += `**Best time to book:** ${content.bestTimeToBook}\n`;
    description += `**Budget:** ${content.totalEstimatedCost.budget}\n`;
    description += `**Luxury:** ${content.totalEstimatedCost.luxury}\n`;

    await pool.query(
        `INSERT INTO itineraries (title, slug, description, duration_days, price_estimate)
         VALUES ($1, $2, $3, $4, $5)`,
        [
            content.title,
            content.slug,
            description,
            durationDays,
            priceEstimate
        ]
    );
    console.log(`Saved new itinerary: ${content.title}`);
}

if (require.main === module) {
    const jobId = process.argv[2];
    processGaps(jobId).catch(async err => {
        console.error('Job failed:', err);
        await updateJob(jobId, { status: 'failed', error_message: err.message });
        process.exit(1);
    });
}
