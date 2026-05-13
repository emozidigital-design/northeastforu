const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const topicResearch = require('../services/topicResearch.service');
const blogWriter = require('../services/blogWriter.service');
const socialShare = require('../services/socialShare.service');
const newsletterSend = require('../services/newsletterSend.service');
const imageGenerator = require('../services/imageGenerator.service');

router.get('/stale-content', authMiddleware, async (req, res, next) => {
    try {
        const staleThreshold = new Date();
        staleThreshold.setDate(staleThreshold.getDate() - 180);

        const staleStates = await prisma.states.findMany({
            where: { last_verified_date: { lt: staleThreshold } },
            select: { name: true, last_verified_date: true, slug: true }
        });

        const staleCities = await prisma.cities.findMany({
            where: { last_verified_date: { lt: staleThreshold } },
            select: { name: true, last_verified_date: true, slug: true }
        });

        const staleAttractions = await prisma.attractions.findMany({
            where: { last_verified_date: { lt: staleThreshold } },
            select: { name: true, last_verified_date: true, slug: true }
        });

        const staleActivities = await prisma.activities.findMany({
            where: { last_verified_date: { lt: staleThreshold } },
            select: { name: true, last_verified_date: true, slug: true }
        });

        const allStale = [
            ...staleStates.map(s => ({ type: 'State', ...s })),
            ...staleCities.map(c => ({ type: 'City', ...c })),
            ...staleAttractions.map(a => ({ type: 'Attraction', ...a })),
            ...staleActivities.map(ac => ({ type: 'Activity', ...ac }))
        ].map(item => ({
            ...item,
            days_stale: Math.floor((new Date() - new Date(item.last_verified_date)) / (1000 * 60 * 60 * 24))
        }));

        res.status(200).json({ success: true, count: allStale.length, data: allStale });
    } catch (error) {
        next(error);
    }
});

// Automation Stats
router.get('/automation/stats', authMiddleware, async (req, res, next) => {
    try {
        const totalPublished = await prisma.blog.count({ where: { ai_draft: true } });
        const failedCount = await prisma.blog_queue.count({ where: { status: 'failed' } });

        res.status(200).json({
            success: true,
            data: {
                totalPublished,
                failedCount,
                successRate: totalPublished + failedCount === 0 ? 100 : Math.round((totalPublished / (totalPublished + failedCount)) * 100),
                nextBatchDate: 'Tomorrow 6am'
            }
        });
    } catch (error) {
        next(error);
    }
});

// Blog Queue
router.get('/automation/queue', authMiddleware, async (req, res, next) => {
    try {
        const queue = await prisma.blog_queue.findMany({
            orderBy: { scheduled_for: 'desc' },
            take: 20
        });
        res.status(200).json({ success: true, data: queue });
    } catch (error) {
        next(error);
    }
});

// Topic Bank
router.get('/automation/topics', authMiddleware, async (req, res, next) => {
    try {
        const topics = await prisma.blog_topics.findMany({
            orderBy: { created_at: 'desc' },
            take: 50
        });
        res.status(200).json({ success: true, data: topics });
    } catch (error) {
        next(error);
    }
});

// Social Shares
router.get('/automation/social-shares', authMiddleware, async (req, res, next) => {
    try {
        const shares = await prisma.social_shares.findMany({
            orderBy: { shared_at: 'desc' },
            take: 30
        });
        res.status(200).json({ success: true, data: shares });
    } catch (error) {
        next(error);
    }
});

// Newsletter Sends
router.get('/automation/newsletter-sends', authMiddleware, async (req, res, next) => {
    try {
        const sends = await prisma.newsletter_sends.findMany({
            orderBy: { sent_at: 'desc' },
            take: 20
        });
        res.status(200).json({ success: true, data: sends });
    } catch (error) {
        next(error);
    }
});

// Retry Failed Queue Item
router.post('/automation/queue/:id/retry', authMiddleware, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const item = await prisma.blog_queue.findUnique({ where: { id } });
        if (!item) return res.status(404).json({ error: 'Queue item not found' });

        // Update status to pending for retry
        await prisma.blog_queue.update({
            where: { id },
            data: { status: 'pending', error_message: null }
        });

        res.status(200).json({ success: true, message: 'Retrying job...' });
    } catch (error) {
        next(error);
    }
});

// Manual Research Trigger
router.post('/automation/run-research', authMiddleware, async (req, res, next) => {
    try {
        await topicResearch.researchTopics();
        res.status(200).json({ success: true, message: 'Topic research started' });
    } catch (error) {
        next(error);
    }
});

// Content Discovery Gaps
router.get('/content-gaps', authMiddleware, async (req, res, next) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const researchFile = path.join(__dirname, '../research/assamholidays-research.json');

        if (!fs.existsSync(researchFile)) {
            return res.status(200).json([]);
        }

        const researchData = JSON.parse(fs.readFileSync(researchFile, 'utf8'));
        res.status(200).json(researchData.destinationGaps);
    } catch (error) {
        next(error);
    }
});

// Trigger Automated Content Generation
router.post('/trigger-content-generation', authMiddleware, async (req, res, next) => {
    try {
        const { spawn } = require('child_process');
        const path = require('path');

        const researchFile = path.join(__dirname, '../research/assamholidays-research.json');
        const researchData = require(researchFile);
        const highPriorityGaps = researchData.destinationGaps.filter(gap => gap.priority === 'high');
        const totalItems = highPriorityGaps.length + 1 + 5; // Gaps + FAQs + Itineraries

        // Create job record
        const job = await prisma.automation_jobs.create({
            data: {
                job_type: 'content-discovery',
                status: 'running',
                total_items: totalItems,
                current_item: 'Initializing...',
                progress: 0
            }
        });

        const jobPath = path.join(__dirname, '../jobs/processResearchGaps.js');

        // Run as a background process with job ID
        const child = spawn('node', [jobPath, job.id], {
            detached: true,
            stdio: 'ignore',
            env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
        });

        child.unref();

        res.status(200).json({ success: true, message: 'Automated content generation job started', job_id: job.id });
    } catch (error) {
        next(error);
    }
});

// Get job status
router.get('/automation/job-status', authMiddleware, async (req, res, next) => {
    try {
        const job = await prisma.automation_jobs.findFirst({
            orderBy: { started_at: 'desc' }
        });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
