const pool = require('../lib/db');

// GET /api/states
exports.getAllStates = async (req, res, next) => {
    try {
        const { search = '' } = req.query;
        let query = `
            SELECT s.*, COUNT(c.id)::int AS city_count
            FROM states s
            LEFT JOIN cities c ON c.state_id = s.id
            WHERE 1=1
        `;
        const params = [];
        if (search) {
            params.push(`%${search}%`);
            query += ` AND s.name ILIKE $${params.length}`;
        }
        query += ' GROUP BY s.id ORDER BY s.name';
        const { rows } = await pool.query(query, params);
        res.json({ success: true, data: rows });
    } catch (error) { next(error); }
};

// GET /api/states/:slug
exports.getStateBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM states WHERE slug = $1',
            [req.params.slug]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        const state = rows[0];

        const cities = await pool.query(
            'SELECT id, name, slug, featured_image, budget_per_day, best_time_to_visit FROM cities WHERE state_id = $1 ORDER BY name',
            [state.id]
        );
        state.cities = cities.rows;
        res.json({ success: true, data: state });
    } catch (error) { next(error); }
};

// PUT /api/states/:id
exports.updateState = async (req, res, next) => {
    try {
        const { description, seo_title, seo_description, featured_image, capital, language, best_season, tagline, gallery_images } = req.body;
        
        // Ensure gallery_images is a valid JSON string if provided as an object/array
        const galleryJson = gallery_images ? (typeof gallery_images === 'string' ? gallery_images : JSON.stringify(gallery_images)) : null;

        const { rows } = await pool.query(
            `UPDATE states SET
                description = COALESCE($1, description),
                seo_title = COALESCE($2, seo_title),
                seo_description = COALESCE($3, seo_description),
                featured_image = COALESCE($4, featured_image),
                capital = COALESCE($5, capital),
                language = COALESCE($6, language),
                best_season = COALESCE($7, best_season),
                tagline = COALESCE($8, tagline),
                gallery_images = COALESCE($9, gallery_images)
            WHERE id = $10 RETURNING *`,
            [description, seo_title, seo_description, featured_image, capital, language, best_season, tagline, galleryJson, req.params.id]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};
