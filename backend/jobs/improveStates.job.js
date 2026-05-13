/**
 * improveStates.job.js
 * Processes all 8 states, sends each to Claude for improvement,
 * and saves results to content_versions / faq_items / insider_tips
 * WITHOUT touching the live states table.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const buildPrompt = (state) => `Improve the travel content for ${state.name} in North East India.

Current description: ${state.description || '(none)'}

Return JSON in exactly this format:
{
  "improvedDescription": "rewritten description minimum 300 words covering geography, culture, best experiences, unique features, practical info",
  "whyVisit": "compelling 2 sentence reason to visit",
  "localSecrets": ["specific insider tip 1","specific insider tip 2","specific insider tip 3","specific insider tip 4","specific insider tip 5"],
  "bestExperiences": ["experience 1 with specific detail","experience 2 with specific detail","experience 3 with specific detail"],
  "practicalInfo": {
    "bestTimeToVisit": "specific months and why",
    "avoidMonths": "months to avoid and why",
    "typicalBudgetPerDay": "INR range",
    "permitRequired": "yes or no and details",
    "nearestAirport": "airport name and distance",
    "nearestRailwayStation": "station name",
    "languagesSpoken": "list of languages",
    "localCuisine": "top 3 must try dishes"
  },
  "seoTitle": "improved title max 60 characters",
  "seoDescription": "improved meta description max 160 characters including main keyword",
  "faqQuestions": [
    {"question":"specific question travellers ask","answer":"detailed helpful answer 50 to 100 words"},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""}
  ],
  "insiderTips": [
    {"tipTitle":"short tip title","tipContent":"detailed tip 2 to 3 sentences","tipCategory":"Budget|Safety|Food|Transport|Photography|Culture|Timing|Permits|Packing"},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""},
    {"tipTitle":"","tipContent":"","tipCategory":""}
  ]
}`;

const run = async () => {
    const states = await prisma.states.findMany();
    console.log(`[improveStates] Found ${states.length} states to improve.`);

    const jobId = await ci.createJob('Improve All States', 'state', states.length);
    let completed = 0;
    let failed = 0;

    for (const state of states) {
        console.log(`[improveStates] Processing: ${state.name}`);
        try {
            const result = await ci.callClaude(buildPrompt(state));

            const fields = {
                description: result.improvedDescription,
                seo_title: result.seoTitle,
                seo_description: result.seoDescription,
                why_visit: result.whyVisit,
                practical_info: JSON.stringify(result.practicalInfo),
                best_experiences: JSON.stringify(result.bestExperiences),
                local_secrets: JSON.stringify(result.localSecrets),
            };

            for (const [field, newVal] of Object.entries(fields)) {
                if (newVal) {
                    await ci.saveVersion('state', state.id, field, state[field] || '', newVal);
                }
            }

            if (result.faqQuestions?.length) {
                await ci.saveFAQs('state', state.slug, result.faqQuestions);
            }

            if (result.insiderTips?.length) {
                await ci.saveTips('state', state.slug, result.insiderTips);
            }

            completed++;
            await ci.updateJob(jobId, { completed, failed });
            console.log(`[improveStates] ✓ Saved improvements for ${state.name}`);
        } catch (err) {
            failed++;
            console.error(`[improveStates] ✗ Failed ${state.name}:`, err.message);
            await ci.updateJob(jobId, { completed, failed, errorLog: `${state.name}: ${err.message}` });
        }

        // Rate limit: 5 second delay between states
        if (states.indexOf(state) < states.length - 1) {
            await ci.sleep(5000);
        }
    }

    await ci.updateJob(jobId, { completed, failed, status: 'completed' });
    console.log(`[improveStates] Job complete. ${completed} succeeded, ${failed} failed.`);
    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[improveStates] Fatal error:', err);
    await prisma.$disconnect();
    process.exit(1);
});
