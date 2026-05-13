/**
 * improveGlobalFAQ.job.js
 * Generates comprehensive site-wide FAQ content across 10 categories
 * using Claude AI. Saves to faq_items with page_type 'global'.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const PROMPT = `Generate comprehensive FAQ content for a North East India travel website covering all 8 states.

Generate 10 detailed questions and answers for each of these categories:
1. Getting There and Transport
2. Permits and Visa Requirements
3. Best Time to Visit Each State
4. Safety and Travel Tips
5. Budget and Costs
6. Top Destinations and Experiences
7. Adventure Activities
8. Food and Cuisine
9. Culture and Customs
10. Practical Travel Tips

Rules for each answer:
- Minimum 80 words per answer
- Include specific details, costs, timeframes
- Mention specific places by name
- Be honest about challenges
- Include pro tips where relevant

Return as JSON array:
[
  {
    "category": "category name",
    "question": "specific question",
    "answer": "detailed answer minimum 80 words",
    "relatedPageSlug": "/relevant/page/url or null"
  }
]`;

const run = async () => {
    console.log('[improveGlobalFAQ] Generating global FAQ bank...');
    const jobId = await ci.createJob('Global FAQ Generation', 'global', 1);

    try {
        const faqs = await ci.callClaude(PROMPT);

        if (!Array.isArray(faqs) || !faqs.length) {
            throw new Error('Claude returned invalid FAQ array');
        }

        const data = faqs.map((f, i) => ({
            page_type: 'global',
            page_slug: '/faq',
            question: f.question,
            answer: f.answer,
            display_order: i,
            is_approved: false,
            schema_eligible: true,
        }));

        await prisma.faq_items.createMany({ data, skipDuplicates: false });
        await ci.updateJob(jobId, { completed: 1, failed: 0, status: 'completed' });
        console.log(`[improveGlobalFAQ] ✓ Saved ${faqs.length} FAQs to DB.`);
    } catch (err) {
        await ci.updateJob(jobId, { completed: 0, failed: 1, status: 'failed', errorLog: err.message });
        console.error('[improveGlobalFAQ] ✗ Failed:', err.message);
    }

    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[improveGlobalFAQ] Fatal:', err);
    await prisma.$disconnect();
    process.exit(1);
});
