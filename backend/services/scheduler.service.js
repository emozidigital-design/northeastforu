const cron = require('node-cron');
const topicResearch = require('./topicResearch.service');
const blogWriter = require('./blogWriter.service');
const imageGenerator = require('./imageGenerator.service');
const socialShare = require('./socialShare.service');
const newsletterSend = require('./newsletterSend.service');
const monitor = require('./monitor.service');

/**
 * Initializes all automated cron jobs for the platform.
 */
exports.initAutomation = () => {
    console.log('Initializing Master Automation Scheduler...');

    // DAILY 6:00 AM - FULL BLOG PUBLISHING PIPELINE
    cron.schedule('0 6 * * *', async () => {
        console.log('[CRON] Starting Daily Blog Pipeline...');
        try {
            // 1. Write the blog
            const blog = await blogWriter.writeDailyBlog();
            if (!blog) return;

            // 2. Generate and upload image
            await imageGenerator.generateFeaturedImage(blog.id, blog.title);

            // 3. Share on Social Media
            await socialShare.shareBlogOnSocial(blog);

            // 4. Send Newsletter
            await newsletterSend.sendNewBlogNewsletter(blog);

            console.log('[CRON] Daily Blog Pipeline completed successfully.');
        } catch (error) {
            console.error('[CRON] Pipeline failed:', error.message);
            await monitor.sendImmediateAlert('Blog Pipeline Failure', error.message);
        }
    });

    // SUNDAY 8:00 PM - WEEKLY TOPIC RESEARCH
    cron.schedule('0 20 * * 0', async () => {
        console.log('[CRON] Running Weekly Topic Research...');
        try {
            await topicResearch.researchTopics();
        } catch (error) {
            console.error('[CRON] Topic Research failed:', error.message);
        }
    });

    // DAILY 7:00 AM - HEALTH CHECK & REPORT
    cron.schedule('0 7 * * *', async () => {
        console.log('[CRON] Generating Daily Health Report...');
        await monitor.generateDailyReport();
    });

    // EVERY 6 HOURS - SITEMAP UPDATE & GOOGLE PING
    cron.schedule('0 */6 * * *', async () => {
        console.log('[CRON] Updating Sitemap...');
    });

    // ── Content Improvement Nightly Schedule ─────────────────────────────────

    // SUNDAY 10:00 PM - Improve all 8 state pages
    cron.schedule('0 22 * * 0', async () => {
        console.log('[CRON] Running State Content Improvement...');
        try { require('../jobs/improveStates.job'); } catch (e) { console.error('[CRON] improveStates failed:', e.message); }
    });

    // MONDAY 10:00 PM - City batch 1 (first 10 cities)
    cron.schedule('0 22 * * 1', async () => {
        console.log('[CRON] Running City Improvement Batch 1...');
        process.argv.push('--batch=1');
        try { require('../jobs/improveCities.job'); } catch (e) { console.error('[CRON] improveCities batch 1 failed:', e.message); }
    });

    // TUESDAY 10:00 PM - City batch 2
    cron.schedule('0 22 * * 2', async () => {
        console.log('[CRON] Running City Improvement Batch 2...');
        process.argv.push('--batch=2');
        try { require('../jobs/improveCities.job'); } catch (e) { console.error('[CRON] improveCities batch 2 failed:', e.message); }
    });

    // WEDNESDAY 10:00 PM - City batch 3
    cron.schedule('0 22 * * 3', async () => {
        console.log('[CRON] Running City Improvement Batch 3...');
        process.argv.push('--batch=3');
        try { require('../jobs/improveCities.job'); } catch (e) { console.error('[CRON] improveCities batch 3 failed:', e.message); }
    });

    // THURSDAY 10:00 PM - Improve 10 blog posts
    cron.schedule('0 22 * * 4', async () => {
        console.log('[CRON] Running Blog Improvement Job...');
        try { require('../jobs/improveBlogs.job'); } catch (e) { console.error('[CRON] improveBlogs failed:', e.message); }
    });

    // FRIDAY 10:00 PM - Fix weak SEO across all content
    cron.schedule('0 22 * * 5', async () => {
        console.log('[CRON] Running SEO Improvement Job...');
        try { require('../jobs/improveSEO.job'); } catch (e) { console.error('[CRON] improveSEO failed:', e.message); }
    });

    // SATURDAY 10:00 PM - Generate insider tips AND global FAQ refresh
    cron.schedule('0 22 * * 6', async () => {
        console.log('[CRON] Running Insider Tips + Global FAQ Jobs...');
        try { require('../jobs/generateInsiderTips.job'); } catch (e) { console.error('[CRON] generateInsiderTips failed:', e.message); }
        try { require('../jobs/improveGlobalFAQ.job'); } catch (e) { console.error('[CRON] improveGlobalFAQ failed:', e.message); }
    });

    console.log('[CRON] Master Automation Scheduler initialized. Content improvement jobs scheduled nightly.');
};
