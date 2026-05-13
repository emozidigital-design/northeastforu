const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * GET /api/faq/:pageType/:slug
 * Returns all approved FAQ items for a given page.
 */
router.get('/:pageType/:slug', async (req, res, next) => {
    try {
        const { pageType, slug } = req.params;
        const faqs = await prisma.faq_items.findMany({
            where: {
                page_type: pageType,
                page_slug: slug,
                is_approved: true,
            },
            orderBy: { display_order: 'asc' },
        });
        res.json({ success: true, data: faqs });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
