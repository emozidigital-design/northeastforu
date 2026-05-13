const pool = require('../lib/db');

// GET /api/attractions
exports.getAllAttractions = async (req, res, next) => {
    try {
        const { search = '', city_id, page = 1, limit = 50 } = req.query;

        const safeInt = (val, defaultVal) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? defaultVal : parsed;
        };

        const pageInt = safeInt(page, 1);
        const limitInt = safeInt(limit, 50);
        const offset = (pageInt - 1) * limitInt;

        const params = [];
        let where = 'WHERE 1=1';
        if (search) { params.push(`%${search}%`); where += ` AND a.name ILIKE $${params.length}`; }
        if (city_id) {
            const cid = parseInt(city_id);
            if (!isNaN(cid)) {
                params.push(cid);
                where += ` AND a.city_id = $${params.length}`;
            }
        }

        params.push(limitInt);
        params.push(offset);
        const { rows } = await pool.query(
            `SELECT a.*, c.name AS city_name, c.slug AS city_slug, s.name AS state_name, s.slug AS state_slug
             FROM attractions a
             LEFT JOIN cities c ON c.id = a.city_id
             LEFT JOIN states s ON s.id = c.state_id
             ${where} ORDER BY a.name LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );
        const count = await pool.query(`SELECT COUNT(*) FROM attractions a ${where}`, params.slice(0, -2));
        const data = rows.map(r => ({ ...r, city: { name: r.city_name, slug: r.city_slug, state: { name: r.state_name, slug: r.state_slug } } }));
        res.json({
            success: true,
            data,
            pagination: {
                total: parseInt(count.rows[0].count),
                page: pageInt,
                limit: limitInt
            }
        });
    } catch (error) { next(error); }
};

// GET /api/attractions/:slug
exports.getAttractionBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT a.*, c.name AS city_name, c.slug AS city_slug, s.name AS state_name, s.slug AS state_slug
             FROM attractions a
             LEFT JOIN cities c ON c.id = a.city_id
             LEFT JOIN states s ON s.id = c.state_id
             WHERE a.slug = $1`,
            [req.params.slug]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        const a = rows[0];
        a.city = { name: a.city_name, slug: a.city_slug, state: { name: a.state_name, slug: a.state_slug } };
        res.json({ success: true, data: a });
    } catch (error) { next(error); }
};

// POST /api/attractions
exports.createAttraction = async (req, res, next) => {
    try {
        const { name, slug, city_id, description, category, entry_fee, best_time, seo_title, seo_description, featured_image } = req.body;
        if (!name || !slug || !city_id) return res.status(400).json({ error: 'name, slug, city_id required.' });
        const { rows } = await pool.query(
            `INSERT INTO attractions (name, slug, city_id, description, category, entry_fee, best_time, seo_title, seo_description, featured_image)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [name, slug, city_id, description || '', category || 'Sightseeing', entry_fee || null, best_time || null, seo_title || name, seo_description || '', featured_image || null]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// PUT /api/attractions/:id
exports.updateAttraction = async (req, res, next) => {
    try {
        const { name, description, category, entry_fee, best_time, seo_title, seo_description, featured_image } = req.body;
        const { rows } = await pool.query(
            `UPDATE attractions SET
                name = COALESCE($1, name), description = COALESCE($2, description),
                category = COALESCE($3, category), entry_fee = COALESCE($4, entry_fee),
                best_time = COALESCE($5, best_time), seo_title = COALESCE($6, seo_title),
                seo_description = COALESCE($7, seo_description), featured_image = COALESCE($8, featured_image)
            WHERE id = $9 RETURNING *`,
            [name, description, category, entry_fee, best_time, seo_title, seo_description, featured_image, req.params.id]
        );
        if (!rows.length) return res.status(404).json({ error: 'Attraction not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// DELETE /api/attractions/:id
exports.deleteAttraction = async (req, res, next) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM attractions WHERE id = $1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'Attraction not found' });
        res.json({ success: true, message: 'Attraction deleted.' });
    } catch (error) { next(error); }
};
