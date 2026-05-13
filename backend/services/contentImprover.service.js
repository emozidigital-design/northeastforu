const Anthropic = require('@anthropic-ai/sdk');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an expert travel content writer and SEO specialist for NorthEastForU.com, the leading travel guide for North East India.

Your job is to improve travel content to be:
- Deeply informative with real specific local details
- Engaging and warm in tone
- Rich with practical traveller tips
- SEO optimised naturally
- Accurate with real place names, distances, costs
- Helpful for both first time and experienced travellers

You have expert knowledge of all 8 North East India states:
Assam, Meghalaya, Arunachal Pradesh, Nagaland, Sikkim, Manipur, Mizoram, and Tripura.

Always include:
- Specific local details only a real traveller would know
- Honest mentions of challenges like road conditions, altitude sickness, permit requirements
- Real approximate costs in Indian Rupees
- Local food recommendations with dish names
- Cultural sensitivity notes where relevant
- Practical how to reach information

Never write generic tourist brochure content.
Never use phrases like "hidden gem" or "breathtaking views" or "off the beaten path".
Always return valid JSON as specified.`;

/**
 * Call Claude API with a user prompt and the expert system prompt.
 */
exports.callClaude = async (userPrompt, retries = 2) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await anthropic.messages.create({
                model: 'claude-3-opus-20240229',
                max_tokens: 4000,
                system: SYSTEM_PROMPT,
                messages: [{ role: 'user', content: userPrompt }],
            });

            const raw = response.content[0].text;
            const start = raw.indexOf('{') !== -1 ? raw.indexOf('{') : raw.indexOf('[');
            const end = raw.lastIndexOf('}') !== -1 ? raw.lastIndexOf('}') + 1 : raw.lastIndexOf(']') + 1;
            return JSON.parse(raw.substring(start, end));
        } catch (err) {
            console.error(`Claude call attempt ${attempt + 1} failed:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(r => setTimeout(r, 3000));
        }
    }
};

/**
 * Save one improved field to content_versions.
 */
exports.saveVersion = async (contentType, contentId, fieldName, oldValue, newValue) => {
    return prisma.content_versions.create({
        data: {
            content_type: contentType,
            content_id: contentId,
            field_name: fieldName,
            old_value: String(oldValue || ''),
            new_value: String(newValue || ''),
            improved_by: 'claude-ai',
            status: 'pending_review',
        },
    });
};

/**
 * Bulk-save FAQ items for a page.
 */
exports.saveFAQs = async (pageType, pageSlug, faqArray) => {
    if (!faqArray || !faqArray.length) return;
    const data = faqArray.map((f, i) => ({
        page_type: pageType,
        page_slug: pageSlug,
        question: f.question,
        answer: f.answer,
        display_order: i,
        is_approved: false,
        schema_eligible: true,
    }));
    return prisma.faq_items.createMany({ data, skipDuplicates: true });
};

/**
 * Bulk-save insider tips for a page.
 */
exports.saveTips = async (pageType, pageSlug, tipsArray) => {
    if (!tipsArray || !tipsArray.length) return;
    const data = tipsArray.map(t => ({
        page_type: pageType,
        page_slug: pageSlug,
        tip_title: t.tipTitle || t.tip_title || '',
        tip_content: t.tipContent || t.tip_content || '',
        tip_category: t.tipCategory || t.tip_category || 'General',
        is_approved: false,
    }));
    return prisma.insider_tips.createMany({ data, skipDuplicates: false });
};

/**
 * Create a new job record and return its id.
 */
exports.createJob = async (jobName, contentType, totalItems) => {
    const job = await prisma.automation_jobs.create({
        data: {
            job_type: jobName,
            total_items: totalItems,
            status: 'running',
            started_at: new Date(),
        },
    });
    return job.id;
};

/**
 * Update job progress.
 */
exports.updateJob = async (jobId, { completed, failed, status, errorLog } = {}) => {
    const data = {};
    if (completed !== undefined) data.progress = completed;
    if (status) data.status = status;
    if (errorLog) data.error_message = typeof errorLog === 'string' ? errorLog : JSON.stringify(errorLog);
    await prisma.automation_jobs.update({ where: { id: jobId }, data });
};

/**
 * Utility: sleep for a given number of ms.
 */
exports.sleep = (ms) => new Promise(r => setTimeout(r, ms));
