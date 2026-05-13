const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res, next) => {
    try {
        const { email, name, source_page } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const existing = await prisma.newsletter.findUnique({ where: { email } });
        if (existing) {
            if (!existing.is_active) {
                await prisma.newsletter.update({
                    where: { email },
                    data: { is_active: true, name: name || existing.name }
                });
                return res.status(200).json({ success: true, message: 'Welcome back!' });
            }
            return res.status(400).json({ error: 'Already subscribed' });
        }

        await prisma.newsletter.create({
            data: { email, name, source_page, is_active: true }
        });

        res.status(201).json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        next(error);
    }
});

// GET /api/newsletter/subscribers (Admin only)
const authMiddleware = require('../middleware/authMiddleware');
router.get('/subscribers', authMiddleware, async (req, res, next) => {
    try {
        const subscribers = await prisma.newsletter.findMany({
            orderBy: { subscribed_at: 'desc' }
        });
        res.status(200).json({ success: true, data: subscribers });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
