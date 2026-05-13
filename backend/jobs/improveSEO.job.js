/**
 * improveSEO.job.js
 * Finds all pages (states, cities, attractions, activities, blogs)
 * with weak/missing SEO fields and generates better titles/descriptions.
 * Processes in batches of 20 with 3-second delays.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const buildPrompt = (type, name, location, currentDesc) => `Generate an optimised SEO title and meta description for this travel page on NorthEastForU.com.

Page type: ${type}
Page name: ${name}
Location: ${location}
Current description: ${(currentDesc || '').substring(0, 200)}

Rules:
- SEO title: max 60 characters, include page name and location, end with | NorthEastForU
- Meta description: max 160 characters, compelling, include main keyword naturally, include a benefit or unique angle

Return JSON:
{
  "seoTitle": "optimised title",
  "seoDescription": "optimised description",
  "primaryKeyword": "main keyword this page targets",
  "secondaryKeywords": ["keyword2", "keyword3"]
}`;

const getWeakRecords = async () => {
    const weak = [];

    const states = await prisma.states.findMany();
    states.forEach(s => {
        if (!s.seo_title || s.seo_title.length < 30 || !s.seo_description)
            weak.push({ type: 'state', id: s.id, name: s.name, location: 'North East India', desc: s.description, currentSeoTitle: s.seo_title, currentSeoDesc: s.seo_description });
    });

    const cities = await prisma.cities.findMany({ include: { state: true } });
    cities.forEach(c => {
        if (!c.seo_title || c.seo_title.length < 30 || !c.seo_description)
            weak.push({ type: 'city', id: c.id, name: c.name, location: c.state?.name || 'North East India', desc: c.description, currentSeoTitle: c.seo_title, currentSeoDesc: c.seo_description });
    });

    const attractions = await prisma.attractions.findMany({ include: { city: { include: { state: true } } } });
    attractions.forEach(a => {
        if (!a.seo_title || !a.seo_description)
            weak.push({ type: 'attraction', id: a.id, name: a.name, location: `${a.city?.name}, ${a.city?.state?.name}`, desc: a.description, currentSeoTitle: a.seo_title, currentSeoDesc: a.seo_description });
    });

    const blogs = await prisma.blog.findMany();
    blogs.forEach(b => {
        if (!b.seo_title || !b.seo_description)
            weak.push({ type: 'blog', id: b.id, name: b.title, location: 'North East India', desc: b.content?.substring(0, 200), currentSeoTitle: b.seo_title, currentSeoDesc: b.seo_description });
    });

    return weak;
};

const run = async () => {
    const allWeak = await getWeakRecords();
    console.log(`[improveSEO] Found ${allWeak.length} pages with weak SEO.`);

    const jobId = await ci.createJob('Bulk SEO Improvement', 'mixed', allWeak.length);
    let completed = 0, failed = 0;

    // Process in batches of 20
    for (let i = 0; i < allWeak.length; i++) {
        const item = allWeak[i];
        console.log(`[improveSEO] [${i + 1}/${allWeak.length}] ${item.type}: ${item.name}`);

        try {
            const result = await ci.callClaude(buildPrompt(item.type, item.name, item.location, item.desc));

            if (result.seoTitle) await ci.saveVersion(item.type, item.id, 'seo_title', item.currentSeoTitle || '', result.seoTitle);
            if (result.seoDescription) await ci.saveVersion(item.type, item.id, 'seo_description', item.currentSeoDesc || '', result.seoDescription);

            completed++;
            await ci.updateJob(jobId, { completed, failed });
        } catch (err) {
            failed++;
            console.error(`[improveSEO] ✗ ${item.name}:`, err.message);
            await ci.updateJob(jobId, { completed, failed });
        }

        // 3-second delay; extra delay every 20 items
        await ci.sleep(i % 20 === 19 ? 10000 : 3000);
    }

    await ci.updateJob(jobId, { completed, failed, status: 'completed' });
    console.log(`[improveSEO] Done. ${completed} improved, ${failed} failed.`);
    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[improveSEO] Fatal:', err);
    await prisma.$disconnect();
    process.exit(1);
});
