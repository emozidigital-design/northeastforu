/**
 * generateInsiderTips.job.js
 * Generates 5 genuine insider tips per state and city page
 * that does not already have approved tips.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const buildPrompt = (destination) => `Generate 5 genuine insider travel tips for ${destination} in North East India.

These must be tips that typical travel guides miss. Real practical advice from experienced travellers. Not generic safety advice found everywhere.

Return JSON array:
[
  {
    "tipTitle": "short catchy title for tip",
    "tipContent": "detailed tip 2 to 3 sentences with specific actionable advice",
    "tipCategory": "Budget|Safety|Food|Transport|Photography|Culture|Timing|Permits|Packing"
  }
]

Examples of good insider tips:
- Budget: specific money saving trick unique to location
- Food: specific dish at specific type of local eatery
- Transport: specific route or shortcut locals use
- Timing: specific time of day to visit to avoid crowds
- Photography: specific spot at specific time for best shots
- Culture: specific local custom to respect or embrace`;

const run = async () => {
    // Find pages without approved tips
    const approvedSlugs = await prisma.insider_tips.groupBy({
        by: ['page_slug'],
        where: { is_approved: true },
    });
    const approvedSet = new Set(approvedSlugs.map(r => r.page_slug));

    const states = await prisma.states.findMany();
    const cities = await prisma.cities.findMany();

    const queue = [
        ...states.filter(s => !approvedSet.has(s.slug)).map(s => ({ type: 'state', slug: s.slug, name: s.name })),
        ...cities.filter(c => !approvedSet.has(c.slug)).map(c => ({ type: 'city', slug: c.slug, name: c.name })),
    ];

    console.log(`[generateInsiderTips] ${queue.length} pages need tips.`);
    if (!queue.length) return;

    const jobId = await ci.createJob('Generate Insider Tips', 'mixed', queue.length);
    let completed = 0, failed = 0;

    for (const page of queue) {
        console.log(`[generateInsiderTips] Generating tips for: ${page.name}`);
        try {
            const tips = await ci.callClaude(buildPrompt(page.name));
            if (Array.isArray(tips) && tips.length) {
                await ci.saveTips(page.type, page.slug, tips);
            }
            completed++;
            await ci.updateJob(jobId, { completed, failed });
            console.log(`[generateInsiderTips] ✓ ${page.name} — ${tips?.length || 0} tips saved.`);
        } catch (err) {
            failed++;
            console.error(`[generateInsiderTips] ✗ ${page.name}:`, err.message);
            await ci.updateJob(jobId, { completed, failed });
        }
        await ci.sleep(4000);
    }

    await ci.updateJob(jobId, { completed, failed, status: 'completed' });
    console.log(`[generateInsiderTips] Done. ${completed} OK, ${failed} failed.`);
    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[generateInsiderTips] Fatal:', err);
    await prisma.$disconnect();
    process.exit(1);
});
