/**
 * improveBlogs.job.js
 * Finds blogs with weak content (< 800 words, missing H2s, missing FAQs)
 * and rewrites them via Claude. Processes max 10 per run.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ci = require('../services/contentImprover.service');

const wordCount = (text) => (text || '').split(/\s+/).filter(Boolean).length;
const hasH2 = (text) => /##\s/.test(text || '') || /<h2/i.test(text || '');
const hasFAQ = (text) => /faq|frequently asked/i.test(text || '');

const buildPrompt = (blog) => `Improve this travel blog post for NorthEastForU.com.

Current title: ${blog.title}
Current content:
${(blog.content || '').substring(0, 3000)}

Rewrite and improve this article to be:
- Minimum 1200 words
- Has engaging introduction answering the main question immediately
- Has minimum 5 H2 section headings (use ## in markdown)
- Has a practical tips section
- Has a FAQ section with 5 questions at the end
- Has a strong conclusion with a call to action
- Naturally mentions related destinations in North East India
- Feels written by someone who has actually visited

Return JSON in exactly this format:
{
  "improvedTitle": "better engaging title",
  "improvedContent": "full rewritten article in markdown",
  "improvedSeoTitle": "max 60 characters",
  "improvedSeoDescription": "max 160 characters",
  "suggestedTags": ["tag1","tag2","tag3"],
  "suggestedCategory": "best category",
  "readingTimeMinutes": 6,
  "wordCount": 1250,
  "faqQuestions": [
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""},
    {"question":"","answer":""}
  ]
}`;

const run = async () => {
    const allBlogs = await prisma.blog.findMany({ take: 100 });

    // Filter to only blogs that need improvement
    const needsWork = allBlogs.filter(b =>
        wordCount(b.content) < 800 ||
        !b.seo_title ||
        !b.seo_description ||
        !hasH2(b.content) ||
        !hasFAQ(b.content)
    ).slice(0, 10); // max 10 per run

    console.log(`[improveBlogs] ${needsWork.length} blogs need improvement.`);
    if (!needsWork.length) return;

    const jobId = await ci.createJob('Improve Blog Posts', 'blog', needsWork.length);
    let completed = 0, failed = 0;

    for (const blog of needsWork) {
        console.log(`[improveBlogs] Processing: "${blog.title}"`);
        try {
            const result = await ci.callClaude(buildPrompt(blog));

            const fields = {
                title: result.improvedTitle,
                content: result.improvedContent,
                seo_title: result.improvedSeoTitle,
                seo_description: result.improvedSeoDescription,
                category: result.suggestedCategory,
            };

            for (const [field, newVal] of Object.entries(fields)) {
                if (newVal) await ci.saveVersion('blog', blog.id, field, blog[field] || '', newVal);
            }

            if (result.faqQuestions?.length) {
                await ci.saveFAQs('blog', blog.slug, result.faqQuestions);
            }

            completed++;
            await ci.updateJob(jobId, { completed, failed });
            console.log(`[improveBlogs] ✓ "${blog.title}"`);
        } catch (err) {
            failed++;
            console.error(`[improveBlogs] ✗ "${blog.title}":`, err.message);
            await ci.updateJob(jobId, { completed, failed });
        }

        await ci.sleep(5000);
    }

    await ci.updateJob(jobId, { completed, failed, status: 'completed' });
    console.log(`[improveBlogs] Done. ${completed} improved, ${failed} failed.`);
    await prisma.$disconnect();
};

run().catch(async (err) => {
    console.error('[improveBlogs] Fatal:', err);
    await prisma.$disconnect();
    process.exit(1);
});
