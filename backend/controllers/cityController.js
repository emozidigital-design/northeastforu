const pool = require('../lib/db');

// GET /api/cities
exports.getAllCities = async (req, res, next) => {
    try {
        const { search = '', state_id, state, page = 1, limit = 50 } = req.query;

        const safeInt = (val, defaultVal) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? defaultVal : parsed;
        };

        const pageInt = safeInt(page, 1);
        const limitInt = safeInt(limit, 50);
        const offset = (pageInt - 1) * limitInt;

        const params = [];
        let where = 'WHERE 1=1';
        if (search) { params.push(`%${search}%`); where += ` AND c.name ILIKE $${params.length}`; }
        if (state_id) {
            const sid = parseInt(state_id);
            if (!isNaN(sid)) {
                params.push(sid);
                where += ` AND c.state_id = $${params.length}`;
            }
        }
        if (state) { params.push(state); where += ` AND s.slug = $${params.length}`; }

        params.push(limitInt);
        params.push(offset);

        const query = `
            SELECT c.*, s.name AS state_name, s.slug AS state_slug
            FROM cities c
            LEFT JOIN states s ON s.id = c.state_id
            ${where}
            ORDER BY c.name
            LIMIT $${params.length - 1} OFFSET $${params.length}
        `;
        const countQuery = `
            SELECT COUNT(*) 
            FROM cities c 
            LEFT JOIN states s ON s.id = c.state_id 
            ${where}
        `;
        const countParams = params.slice(0, -2);
        const [dataResult, countResult] = await Promise.all([
            pool.query(query, params),
            pool.query(countQuery, countParams)
        ]);
        const data = dataResult.rows.map(r => ({ ...r, state: { name: r.state_name, slug: r.state_slug } }));
        res.json({
            success: true,
            data,
            pagination: {
                total: parseInt(countResult.rows[0].count),
                page: pageInt,
                limit: limitInt
            }
        });
    } catch (error) { next(error); }
};

// GET /api/cities/:slug
exports.getCityBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.*, s.name AS state_name, s.slug AS state_slug
             FROM cities c LEFT JOIN states s ON s.id = c.state_id
             WHERE c.slug = $1`,
            [req.params.slug]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        const city = rows[0];
        city.state = { name: city.state_name, slug: city.state_slug };
        const attractions = await pool.query(
            'SELECT id, name, slug, category, featured_image, entry_fee FROM attractions WHERE city_id = $1 ORDER BY name',
            [city.id]
        );
        city.attractions = attractions.rows;
        res.json({ success: true, data: city });
    } catch (error) { next(error); }
};

// POST /api/cities
exports.createCity = async (req, res, next) => {
    try {
        const { name, slug, state_id, description, best_time_to_visit, budget_per_day, seo_title, seo_description, featured_image, tagline, how_to_reach, gallery_images } = req.body;
        if (!name || !slug || !state_id) return res.status(400).json({ error: 'name, slug, and state_id are required.' });
        
        const galleryJson = gallery_images ? (typeof gallery_images === 'string' ? gallery_images : JSON.stringify(gallery_images)) : '[]';

        const { rows } = await pool.query(
            `INSERT INTO cities (name, slug, state_id, description, best_time_to_visit, budget_per_day, seo_title, seo_description, featured_image, tagline, how_to_reach, gallery_images)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
            [name, slug, state_id, description || '', best_time_to_visit || null, budget_per_day || null, seo_title || name, seo_description || '', featured_image || null, tagline || '', how_to_reach || '', galleryJson]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// PUT /api/cities/:id
exports.updateCity = async (req, res, next) => {
    try {
        const { name, description, best_time_to_visit, budget_per_day, seo_title, seo_description, featured_image, tagline, how_to_reach, gallery_images } = req.body;
        
        const galleryJson = gallery_images ? (typeof gallery_images === 'string' ? gallery_images : JSON.stringify(gallery_images)) : null;

        const { rows } = await pool.query(
            `UPDATE cities SET
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                best_time_to_visit = COALESCE($3, best_time_to_visit),
                budget_per_day = COALESCE($4, budget_per_day),
                seo_title = COALESCE($5, seo_title),
                seo_description = COALESCE($6, seo_description),
                featured_image = COALESCE($7, featured_image),
                tagline = COALESCE($8, tagline),
                how_to_reach = COALESCE($9, how_to_reach),
                gallery_images = COALESCE($10, gallery_images)
            WHERE id = $11 RETURNING *`,
            [name, description, best_time_to_visit, budget_per_day, seo_title, seo_description, featured_image, tagline, how_to_reach, galleryJson, req.params.id]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// DELETE /api/cities/:id
exports.deleteCity = async (req, res, next) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM cities WHERE id = $1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'City not found' });
        res.json({ success: true, message: 'City deleted.' });
    } catch (error) { next(error); }
};
