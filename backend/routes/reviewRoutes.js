const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/reviews - Submit a review
router.post('/', async (req, res, next) => {
    try {
        const { page_type, page_slug, reviewer_name, reviewer_email, rating, review_text } = req.body;

        if (!page_type || !page_slug || !reviewer_name || !reviewer_email || !rating) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const review = await prisma.reviews.create({
            data: {
                page_type,
                page_slug,
                reviewer_name,
                reviewer_email,
                rating: parseInt(rating),
                review_text,
                is_approved: false // Default to false
            }
        });

        res.status(201).json({ success: true, message: 'Review submitted for approval', data: review });
    } catch (error) {
        next(error);
    }
});

// GET /api/reviews/:page_type/:slug - Get approved reviews for a page
router.get('/:page_type/:slug', async (req, res, next) => {
    try {
        const { page_type, slug } = req.params;
        const reviews = await prisma.reviews.findMany({
            where: {
                page_type,
                page_slug: slug,
                is_approved: true
            },
            orderBy: { created_at: 'desc' }
        });

        const avgRating = reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        res.status(200).json({
            success: true,
            data: reviews,
            meta: {
                count: reviews.length,
                average_rating: parseFloat(avgRating.toFixed(1))
            }
        });
    } catch (error) {
        next(error);
    }
});

// GET /api/reviews/pending - Admin only
router.get('/pending', authMiddleware, async (req, res, next) => {
    try {
        const reviews = await prisma.reviews.findMany({
            where: { is_approved: false },
            orderBy: { created_at: 'desc' }
        });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        next(error);
    }
});

// GET /api/reviews?status=pending|approved|all - Admin moderation list
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const { status = 'all' } = req.query;
        const where =
            status === 'pending' ? { is_approved: false } :
            status === 'approved' ? { is_approved: true } : {};
        const reviews = await prisma.reviews.findMany({
            where,
            orderBy: { created_at: 'desc' }
        });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        next(error);
    }
});

// PUT /api/reviews/:id/approve - Admin toggle approval { is_approved }
router.put('/:id/approve', authMiddleware, async (req, res, next) => {
    try {
        const review = await prisma.reviews.update({
            where: { id: parseInt(req.params.id) },
            data: { is_approved: req.body.is_approved !== false }
        });
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/reviews/:id - Admin delete
router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        await prisma.reviews.delete({ where: { id: parseInt(req.params.id) } });
        res.status(200).json({ success: true, message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
});

// PATCH /api/reviews/:id - Admin approve/reject
router.patch('/:id', authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_approved } = req.body;

        const review = await prisma.reviews.update({
            where: { id: parseInt(id) },
            data: { is_approved }
        });

        if (!review) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.status(200).json({ success: true, data: review });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
