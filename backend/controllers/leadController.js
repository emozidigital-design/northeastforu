const pool = require('../lib/db');

// GET /api/leads  (admin-protected)
exports.getAllLeads = async (req, res, next) => {
    try {
        const { search = '', status, page = 1, limit = 50 } = req.query;

        const safeInt = (val, defaultVal) => {
            const parsed = parseInt(val);
            return isNaN(parsed) ? defaultVal : parsed;
        };

        const pageInt = safeInt(page, 1);
        const limitInt = safeInt(limit, 50);
        const offset = (pageInt - 1) * limitInt;

        const params = [];
        let where = 'WHERE 1=1';
        if (status) { params.push(status); where += ` AND status = $${params.length}`; }
        if (search) {
            params.push(`%${search}%`);
            where += ` AND (name ILIKE $${params.length} OR email ILIKE $${params.length} OR destination ILIKE $${params.length})`;
        }
        params.push(limitInt); params.push(offset);
        const { rows } = await pool.query(
            `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );
        const count = await pool.query(`SELECT COUNT(*) FROM leads ${where}`, params.slice(0, -2));
        res.json({
            success: true,
            data: rows,
            pagination: {
                total: parseInt(count.rows[0].count),
                page: pageInt,
                limit: limitInt
            }
        });
    } catch (error) { next(error); }
};

// POST /api/leads  (public)
exports.createLead = async (req, res, next) => {
    try {
        const { name, email, phone, country, destination, travel_date, message, source_page } = req.body;
        if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required.' });
        const { rows } = await pool.query(
            `INSERT INTO leads (name, email, phone, country, destination, travel_date, message, source_page, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'new') RETURNING *`,
            [name, email, phone || null, country || null, destination || null, travel_date ? new Date(travel_date) : null, message, source_page || null]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// PUT /api/leads/:id/status  (admin-protected)
exports.updateLeadStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const { rows } = await pool.query(
            'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) { next(error); }
};

// DELETE /api/leads/:id  (admin-protected)
exports.deleteLead = async (req, res, next) => {
    try {
        const { rowCount } = await pool.query('DELETE FROM leads WHERE id = $1', [req.params.id]);
        if (!rowCount) return res.status(404).json({ error: 'Lead not found' });
        res.json({ success: true });
    } catch (error) { next(error); }
};
