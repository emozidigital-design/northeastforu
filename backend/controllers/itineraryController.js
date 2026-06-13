const pool = require('../lib/db');

// GET /api/itineraries
exports.getAllItineraries = async (req, res, next) => {
    try {
        const { search = '', limit = 10 } = req.query;
        let query = 'SELECT * FROM itineraries WHERE 1=1';
        const params = [];

        if (search) {
            params.push(`%${search}%`);
            query += ` AND title ILIKE $${params.length}`;
        }

        query += ` ORDER BY created_at DESC LIMIT $${params.length + 1}`;
        params.push(parseInt(limit) || 10);

        const { rows } = await pool.query(query, params);
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

// GET /api/itineraries/:slug
exports.getItineraryBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM itineraries WHERE slug = $1',
            [req.params.slug]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

const toJson = (val, fallback) =>
    val == null ? fallback : (typeof val === 'string' ? val : JSON.stringify(val));

// POST /api/itineraries (Internal/Admin use)
exports.createItinerary = async (req, res, next) => {
    try {
        const { title, slug, description, tagline, duration_days, price_estimate, featured_image, category, highlights, daily_schedule, pricing_tiers } = req.body;
        if (!title || !slug || !duration_days) {
            return res.status(400).json({ error: 'title, slug and duration_days are required.' });
        }
        const { rows } = await pool.query(
            `INSERT INTO itineraries (title, slug, description, tagline, duration_days, price_estimate, featured_image, category, highlights, daily_schedule, pricing_tiers)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [title, slug, description || '', tagline || null, parseInt(duration_days), price_estimate || null, featured_image || null, category || null, toJson(highlights, '[]'), toJson(daily_schedule, '[]'), toJson(pricing_tiers, '[]')]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// PUT /api/itineraries/:id (Admin)
exports.updateItinerary = async (req, res, next) => {
    try {
        const { title, slug, description, tagline, duration_days, price_estimate, featured_image, category, highlights, daily_schedule, pricing_tiers } = req.body;
        const { rows } = await pool.query(
            `UPDATE itineraries SET
                title = COALESCE($1, title),
                slug = COALESCE($2, slug),
                description = COALESCE($3, description),
                tagline = COALESCE($4, tagline),
                duration_days = COALESCE($5, duration_days),
                price_estimate = COALESCE($6, price_estimate),
                featured_image = COALESCE($7, featured_image),
                category = COALESCE($8, category),
                highlights = COALESCE($9, highlights),
                daily_schedule = COALESCE($10, daily_schedule),
                pricing_tiers = COALESCE($11, pricing_tiers)
             WHERE id = $12 RETURNING *`,
            [title, slug, description, tagline, duration_days ? parseInt(duration_days) : null, price_estimate, featured_image, category, toJson(highlights, null), toJson(daily_schedule, null), toJson(pricing_tiers, null), req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Itinerary not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/itineraries/:id (Admin)
exports.deleteItinerary = async (req, res, next) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM itineraries WHERE id = $1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'Itinerary not found' });
        res.json({ success: true, message: 'Itinerary deleted.' });
    } catch (error) {
        next(error);
    }
};
