/**
 * improveCities.job.js
 * Processes cities in batches (10 per run) using Claude AI.
 * Pass optional --batch=1 (default) to run specific batch.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const BATCH_SIZE = 10;
const batchArg = process.argv.find(a => a.startsWith('--batch='));
const batchNum = batchArg ? parseInt(batchArg.split('=')[1]) : 1;

const buildPrompt = (city, stateName) => `Improve the travel content for ${city.name} in ${stateName}, North East India.

Current description: ${city.description || '(none)'}

Return JSON in exactly this format:
{
  "improvedDescription": "rewritten description minimum 250 words",
  "cityHighlights": ["highlight 1","highlight 2","highlight 3","highlight 4"],
  "localFoodGuide": {
    "mustTryDishes": [{"dishName":"","description":"","whereToFind":""}],
    "localDrinks": "traditional drinks to try",
    "foodBudget": "typical meal cost in INR"
  },
  "transportGuide": {
    "fromGuwahati": "distance and travel options",
    "fromNearestAirport": "airport name and how to reach",
    "localTransport": "how to get around the city",
    "roadConditions": "honest assessment"
  },
  "accommodation": {
    "budgetOption": "type and price range INR",
    "midRangeOption": "type and price range INR",
    "luxuryOption": "type and price range INR",
    "bookingTip": "practical booking advice"
  },
  "bestTimeToVisit": "specific months with reason",
  "avoidWhen": "when not to visit and why",
  "culturalTips": ["cultural tip 1","cultural tip 2"],
  "seoTitle": "max 60 characters with city name and main keyword",
  "seoDescription": "max 160 characters compelling description with keyword",
  "faqQuestions": [
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""}
  ],
  "insiderTips": [
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""}
  ]
}`;

const run = async () => {
    const skip = (batchNum - 1) * BATCH_SIZE;
    const cities = await prisma.cities.findMany({
        skip,
        take: BATCH_SIZE,
        include: { state: true },
        orderBy: { id: 'asc' },
    });

    if (!cities.length) {
        console.log('[improveCities] No more cities to process in this batch.');
        return;
    }

    console.log(`[improveCities] Batch ${batchNum}: Processing ${cities.length} cities (offset ${skip}).`);
    const jobId = await ci.createJob(`Improve Cities Batch ${batchNum}`, 'city', cities.length);
    let completed = 0, failed = 0;

    for (const city of cities) {
        const stateName = city.state?.name || 'North East India';
        console.log(`[improveCities] Processing: ${city.name}, ${stateName}`);
        try {
            const result = await ci.callClaude(buildPrompt(city, stateName));

            const fields = {
                description: result.improvedDescription,
                seo_title: result.seoTitle,
                seo_description: result.seoDescription,
                city_highlights: JSON.stringify(result.cityHighlights),
                local_food_guide: JSON.stringify(result.localFoodGuide),
                transport_guide: JSON.stringify(result.transportGuide),
                accommodation: JSON.stringify(result.accommodation),
                best_time_to_visit: result.bestTimeToVisit,
                avoid_when: result.avoidWhen,
                cultural_tips: JSON.stringify(result.culturalTips),
            };

            for (const [field, newVal] of Object.entries(fields)) {
                if (newVal) await ci.saveVersion('city', city.id, field, city[field] || '', newVal);
            }

            if (result.faqQuestions?.length) await ci.saveFAQs('city', city.slug, result.faqQuestions);
            if (result.insiderTips?.length) await ci.saveTips('city', city.slug, result.insiderTips);

            completed++;
            await ci.updateJob(jobId, { completed, failed });
            console.log(`[improveCities] ✓ ${city.name}`);
        } catch (err) {
            failed++;
            console.error(`[improveCities] ✗ ${city.name}:`, err.message);
            await ci.updateJob(jobId, { completed, failed });
        }

        await ci.sleep(5000);
    }

    await ci.updateJob(jobId, { completed, failed, status: 'completed' });
    console.log(`[improveCities] Batch ${batchNum} done. ${completed} OK, ${failed} failed.`);
    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[improveCities] Fatal:', err);
    await prisma.$disconnect();
    process.exit(1);
});
