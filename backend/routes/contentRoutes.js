const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/authMiddleware');

// ─── Content Versions ─────────────────────────────────────────────────────────

/** GET /api/content/versions/pending — list all pending_review versions */
router.get('/versions/pending', authMiddleware, async (req, res, next) => {
    try {
        const versions = await prisma.content_versions.findMany({
            where: { status: 'pending_review' },
            orderBy: { created_at: 'desc' },
            take: 200,
        });
        res.json({ success: true, data: versions });
    } catch (err) { next(err); }
});

/** POST /api/content/versions/:id/approve — apply improvement to live table */
router.post('/versions/:id/approve', authMiddleware, async (req, res, next) => {
    try {
        const version = await prisma.content_versions.findUnique({ where: { id } });
        if (!version) {
            return res.status(404).json({ error: 'Not found' });
        }

        // Apply to live table
        const tableName = `${version.content_type}s`; // e.g. 'states', 'cities', 'blogs'
        const updateData = { [version.field_name]: version.new_value };

        // Prisma dynamic table — use raw query approach based on type
        const typeMap = {
            state: () => prisma.states.update({ where: { id: version.content_id }, data: updateData }),
            city: () => prisma.cities.update({ where: { id: version.content_id }, data: updateData }),
            blog: () => prisma.blog.update({ where: { id: version.content_id }, data: updateData }),
            attraction: () => prisma.attractions.update({ where: { id: version.content_id }, data: updateData }),
            activity: () => prisma.activities.update({ where: { id: version.content_id }, data: updateData }),
        };

        if (typeMap[version.content_type]) {
            await typeMap[version.content_type]();
        }

        await prisma.content_versions.update({
            where: { id },
            data: { status: 'approved', reviewed_at: new Date(), reviewed_by: 'admin' },
        });

        res.json({ success: true, message: 'Content updated in live database.' });
    } catch (err) { next(err); }
});

/** POST /api/content/versions/:id/reject */
router.post('/versions/:id/reject', authMiddleware, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.content_versions.update({
            where: { id },
            data: { status: 'rejected', reviewed_at: new Date(), reviewed_by: 'admin' },
        });
        res.json({ success: true, message: 'Version rejected.' });
    } catch (err) { next(err); }
});

/** POST /api/content/bulk-approve — bulk approve by type (faqs, tips, seo) */
router.post('/bulk-approve', authMiddleware, async (req, res, next) => {
    try {
        const { type } = req.body; // 'faq', 'tip', 'seo'

        if (type === 'faq') {
            const result = await prisma.faq_items.updateMany({
                where: { is_approved: false },
                data: { is_approved: true },
            });
            return res.json({ success: true, updated: result.count });
        }

        if (type === 'tip') {
            const result = await prisma.insider_tips.updateMany({
                where: { is_approved: false },
                data: { is_approved: true },
            });
            return res.json({ success: true, updated: result.count });
        }

        if (type === 'seo') {
            const seoVersions = await prisma.content_versions.findMany({
                where: {
                    status: 'pending_review',
                    field_name: { in: ['seo_title', 'seo_description'] },
                },
            });

            let approved = 0;
            for (const v of seoVersions) {
                try {
                    const typeMap = {
                        state: () => prisma.states.update({ where: { id: v.content_id }, data: { [v.field_name]: v.new_value } }),
                        city: () => prisma.cities.update({ where: { id: v.content_id }, data: { [v.field_name]: v.new_value } }),
                        blog: () => prisma.blog.update({ where: { id: v.content_id }, data: { [v.field_name]: v.new_value } }),
                        attraction: () => prisma.attractions.update({ where: { id: v.content_id }, data: { [v.field_name]: v.new_value } }),
                    };
                    if (typeMap[v.content_type]) await typeMap[v.content_type]();
                    await prisma.content_versions.update({ where: { id: v.id }, data: { status: 'approved', reviewed_at: new Date() } });
                    approved++;
                } catch (_) { }
            }
            return res.json({ success: true, updated: approved });
        }

        res.status(400).json({ error: 'Invalid type. Use faq, tip, or seo.' });
    } catch (err) { next(err); }
});

// ─── Insider Tips ─────────────────────────────────────────────────────────────

/** GET /api/content/tips/:pageType/:slug */
router.get('/tips/:pageType/:slug', async (req, res, next) => {
    try {
        const { pageType, slug } = req.params;
        const tips = await prisma.insider_tips.findMany({
            where: { page_type: pageType, page_slug: slug, is_approved: true },
            orderBy: { created_at: 'asc' },
            take: 5,
        });
        res.json({ success: true, data: tips });
    } catch (err) { next(err); }
});

/** GET /api/content/tips/pending — admin: all pending tips */
router.get('/tips/pending/all', authMiddleware, async (req, res, next) => {
    try {
        const tips = await prisma.insider_tips.findMany({
            where: { is_approved: false },
            orderBy: { created_at: 'desc' },
        });
        res.json({ success: true, data: tips });
    } catch (err) { next(err); }
});

/** POST /api/content/tips/:id/approve */
router.post('/tips/:id/approve', authMiddleware, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.insider_tips.update({ where: { id }, data: { is_approved: true } });
        res.json({ success: true });
    } catch (err) { next(err); }
});

/** POST /api/content/faqs/:id/approve */
router.post('/faqs/:id/approve', authMiddleware, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.faq_items.update({ where: { id }, data: { is_approved: true } });
        res.json({ success: true });
    } catch (err) { next(err); }
});

/** GET /api/content/faqs/pending/all — admin: all pending FAQs */
router.get('/faqs/pending/all', authMiddleware, async (req, res, next) => {
    try {
        const faqs = await prisma.faq_items.findMany({
            where: { is_approved: false },
            orderBy: { created_at: 'desc' },
        });
        res.json({ success: true, data: faqs });
    } catch (err) { next(err); }
});

// ─── Content Quality Scores ───────────────────────────────────────────────────

/** GET /api/content/scores */
router.get('/scores', authMiddleware, async (req, res, next) => {
    try {
        const contentScoreService = require('../services/contentScore.service');
        const scores = await contentScoreService.getAllScores();
        res.json({ success: true, data: scores });
    } catch (err) { next(err); }
});

// ─── Improvement Jobs ─────────────────────────────────────────────────────────

/** GET /api/content/jobs — list recent improvement jobs */
router.get('/jobs', authMiddleware, async (req, res, next) => {
    try {
        const jobs = await prisma.content_improvement_jobs.findMany({
            orderBy: { created_at: 'desc' },
            take: 20,
        });
        res.json({ success: true, data: jobs });
    } catch (err) { next(err); }
});

module.exports = router;
