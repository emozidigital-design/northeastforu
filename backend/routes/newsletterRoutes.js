const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res, next) => {
    try {
        const { email, name, source_page } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const existing = await prisma.newsletters.findUnique({ where: { email } });
        if (existing) {
            if (!existing.is_active) {
                await prisma.newsletters.update({
                    where: { email },
                    data: { is_active: true, name: name || existing.name }
                });
                return res.status(200).json({ success: true, message: 'Welcome back!' });
            }
            return res.status(400).json({ error: 'Already subscribed' });
        }

        await prisma.newsletters.create({
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
        const subscribers = await prisma.newsletters.findMany({
            orderBy: { subscribed_at: 'desc' }
        });
        res.status(200).json({ success: true, data: subscribers });
    } catch (error) {
        next(error);
    }
});

const csvCell = (v) => {
    if (v == null) return '';
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// GET /api/newsletter/export (Admin only) — CSV
router.get('/export', authMiddleware, async (req, res, next) => {
    try {
        const subs = await prisma.newsletters.findMany({ orderBy: { subscribed_at: 'desc' } });
        const cols = ['id', 'email', 'name', 'source_page', 'is_active', 'subscribed_at'];
        const header = cols.join(',');
        const body = subs.map(r => cols.map(c => csvCell(r[c])).join(',')).join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="subscribers.csv"');
        res.send(header + '\n' + body);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/newsletter/:id (Admin only)
router.delete('/:id', authMiddleware, async (req, res, next) => {
    try {
        await prisma.newsletters.delete({ where: { id: parseInt(req.params.id) } });
        res.status(200).json({ success: true, message: 'Subscriber removed' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
