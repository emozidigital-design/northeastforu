const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadBuffer, destroy, isConfigured } = require('../lib/cloudinary');

// Files are buffered in memory and streamed to Cloudinary (no local disk).
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|avif/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp, avif)'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
});

function ensureConfigured(res) {
    if (!isConfigured()) {
        res.status(503).json({ error: 'Image storage is not configured. Set CLOUDINARY_* env vars.' });
        return false;
    }
    return true;
}

// POST /api/upload — upload a single image to Cloudinary, record in media table
router.post('/', authMiddleware, upload.single('image'), async (req, res, next) => {
    try {
        if (!ensureConfigured(res)) return;
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const { url, public_id } = await uploadBuffer(req.file.buffer);
        const record = await prisma.media.create({
            data: {
                file_name: req.file.originalname,
                file_url: url,
                public_id,
                alt_text: req.body.alt_text || null,
                uploaded_by: req.user?.email || null,
            },
        });
        res.json({ success: true, url, public_id, media: record });
    } catch (error) {
        next(error);
    }
});

// POST /api/upload/multiple — up to 20 images
router.post('/multiple', authMiddleware, upload.array('images', 20), async (req, res, next) => {
    try {
        if (!ensureConfigured(res)) return;
        if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });

        const results = [];
        for (const file of req.files) {
            const { url, public_id } = await uploadBuffer(file.buffer);
            await prisma.media.create({
                data: {
                    file_name: file.originalname,
                    file_url: url,
                    public_id,
                    uploaded_by: req.user?.email || null,
                },
            });
            results.push(url);
        }
        res.json({ success: true, urls: results });
    } catch (error) {
        next(error);
    }
});

// GET /api/upload/media — list media library (admin)
router.get('/media', authMiddleware, async (req, res, next) => {
    try {
        const items = await prisma.media.findMany({ orderBy: { created_at: 'desc' } });
        res.json({ success: true, data: items });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/upload/media/:id — remove from Cloudinary + DB
router.delete('/media/:id', authMiddleware, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const item = await prisma.media.findUnique({ where: { id } });
        if (!item) return res.status(404).json({ error: 'Media not found' });

        if (item.public_id && isConfigured()) {
            try { await destroy(item.public_id); } catch (e) { /* asset may already be gone */ }
        }
        await prisma.media.delete({ where: { id } });
        res.json({ success: true, message: 'Media deleted' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
