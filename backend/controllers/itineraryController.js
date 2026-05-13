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

// POST /api/itineraries (Internal/Admin use)
exports.createItinerary = async (req, res, next) => {
    try {
        const { title, slug, description, duration_days, price_estimate, featured_image } = req.body;
        const { rows } = await pool.query(
            `INSERT INTO itineraries (title, slug, description, duration_days, price_estimate, featured_image)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, slug, description, duration_days, price_estimate, featured_image]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        next(error);
    }
};
