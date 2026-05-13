const pool = require('../lib/db');

// GET /api/blogs
exports.getAllBlogs = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, search = '', status } = req.query;

        const safeInt = (val, defaultVal) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? defaultVal : parsed;
        };

        const pageInt = safeInt(page, 1);
        const limitInt = safeInt(limit, 20);
        const offset = (pageInt - 1) * limitInt;

        const params = [];
        let where = 'WHERE 1=1';
        if (search) {
            params.push(`%${search}%`);
            where += ` AND (title ILIKE $${params.length} OR seo_title ILIKE $${params.length})`;
        }
        if (status) { params.push(status); where += ` AND status = $${params.length}`; }
        params.push(limitInt); params.push(offset);
        const { rows } = await pool.query(
            `SELECT id, title, slug, status, category, author, published_at, created_at, seo_title, seo_description, featured_image
             FROM blogs ${where} ORDER BY COALESCE(published_at, created_at) DESC
             LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );
        const count = await pool.query(`SELECT COUNT(*) FROM blogs ${where}`, params.slice(0, -2));
        const total = parseInt(count.rows[0].count);
        res.json({
            success: true,
            data: rows,
            pagination: {
                total,
                page: pageInt,
                limit: limitInt,
                totalPages: Math.ceil(total / limitInt)
            }
        });
    } catch (error) { next(error); }
};

// GET /api/blogs/:slug
exports.getBlogBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query('SELECT * FROM blogs WHERE slug = $1', [req.params.slug]);
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// POST /api/blogs
exports.createBlog = async (req, res, next) => {
    try {
        const { title, slug, content, category, author, status, seo_title, seo_description, featured_image } = req.body;
        if (!title || !slug) return res.status(400).json({ error: 'title and slug are required.' });
        const pub = status === 'published' ? new Date() : null;
        const { rows } = await pool.query(
            `INSERT INTO blogs (title, slug, content, category, author, status, seo_title, seo_description, featured_image, published_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [title, slug, content || '', category || 'General', author || 'NorthEastForU Team', status || 'draft', seo_title || title, seo_description || '', featured_image || null, pub]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// PUT /api/blogs/:id
exports.updateBlog = async (req, res, next) => {
    try {
        const { title, content, category, status, seo_title, seo_description, featured_image } = req.body;
        // Fetch current to preserve published_at if already set
        const existing = await pool.query('SELECT published_at FROM blogs WHERE id = $1', [req.params.id]);
        if (!existing.rows.length) return res.status(404).json({ error: 'Blog not found' });
        const existingPub = existing.rows[0].published_at;
        const pub = status === 'published' && !existingPub ? new Date() : existingPub;
        const { rows } = await pool.query(
            `UPDATE blogs SET
                title = COALESCE($1, title), content = COALESCE($2, content),
                category = COALESCE($3, category), status = COALESCE($4, status),
                seo_title = COALESCE($5, seo_title), seo_description = COALESCE($6, seo_description),
                featured_image = COALESCE($7, featured_image), published_at = $8
            WHERE id = $9 RETURNING *`,
            [title, content, category, status, seo_title, seo_description, featured_image, pub, req.params.id]
        );
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// DELETE /api/blogs/:id
exports.deleteBlog = async (req, res, next) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'Blog not found' });
        res.json({ success: true, message: 'Blog deleted.' });
    } catch (error) { next(error); }
};
