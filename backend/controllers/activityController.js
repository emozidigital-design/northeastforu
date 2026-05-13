const pool = require('../lib/db');

// GET /api/activities
exports.getAllActivities = async (req, res, next) => {
    try {
        const { search = '', state_id, page = 1, limit = 50 } = req.query;

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
        if (state_id) {
            const sid = parseInt(state_id);
            if (!isNaN(sid)) {
                params.push(sid);
                where += ` AND a.state_id = $${params.length}`;
            }
        }

        params.push(limitInt);
        params.push(offset);
        const { rows } = await pool.query(
            `SELECT a.*, s.name AS state_name, s.slug AS state_slug
             FROM activities a
             LEFT JOIN states s ON s.id = a.state_id
             ${where} ORDER BY a.name LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );
        const count = await pool.query(`SELECT COUNT(*) FROM activities a ${where}`, params.slice(0, -2));
        const data = rows.map(r => ({ ...r, state: r.state_id ? { name: r.state_name, slug: r.state_slug } : null }));
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

// GET /api/activities/:slug
exports.getActivityBySlug = async (req, res, next) => {
    try {
        const { rows } = await pool.query(
            `SELECT a.*, 
                    s.name AS state_name, s.slug AS state_slug,
                    c.name AS city_name, c.slug AS city_slug
             FROM activities a 
             LEFT JOIN states s ON s.id = a.state_id
             LEFT JOIN cities c ON c.id = a.city_id
             WHERE a.slug = $1`,
            [req.params.slug]
        );
        if (!rows.length) {
            return res.status(404).json({ error: 'Not found' });
        }
        const a = rows[0];
        a.state = a.state_id ? { name: a.state_name, slug: a.state_slug } : null;
        a.city = a.city_id ? { name: a.city_name, slug: a.city_slug } : null;
        res.json({ success: true, data: a });
    } catch (error) { next(error); }
};

// POST /api/activities
exports.createActivity = async (req, res, next) => {
    try {
        const {
            name, slug, state_id, city_id, description, category,
            difficulty, duration, price, best_season, seo_title,
            seo_description, featured_image, booking_link,
            // new fields
            gallery_images, highlights, inclusions, exclusions, important_info,
            meeting_point, meeting_point_lat, meeting_point_lng,
            cancellation_policy, languages, group_size_min, group_size_max,
            age_requirement, physical_rating, what_to_bring, faqs,
            price_original, price_discounted, instant_confirmation,
            free_cancellation, rating, review_count
        } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ error: 'Name and slug are required.' });
        }

        const { rows } = await pool.query(
            `INSERT INTO activities (
                name, slug, state_id, city_id, description, category, 
                difficulty, duration, price, best_season, seo_title, 
                seo_description, featured_image, booking_link, is_published,
                gallery_images, highlights, inclusions, exclusions, important_info,
                meeting_point, meeting_point_lat, meeting_point_lng,
                cancellation_policy, languages, group_size_min, group_size_max,
                age_requirement, physical_rating, what_to_bring, faqs,
                price_original, price_discounted, instant_confirmation,
                free_cancellation, rating, review_count
            )
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
                     $16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,
                     $28,$29,$30,$31,$32,$33,$34,$35,$36,$37) RETURNING *`,
            [
                name,
                slug,
                (state_id && state_id !== '') ? parseInt(state_id) : null,
                (city_id && city_id !== '') ? parseInt(city_id) : null,
                description || '',
                category || 'Adventure',
                difficulty || 'Moderate',
                duration || null,
                (price && price !== '') ? parseFloat(price) : null,
                best_season || null,
                seo_title || name,
                seo_description || '',
                featured_image || null,
                booking_link || null,
                true,
                // new fields
                JSON.stringify(gallery_images || []),
                JSON.stringify(highlights || []),
                JSON.stringify(inclusions || []),
                JSON.stringify(exclusions || []),
                JSON.stringify(important_info || []),
                meeting_point || null,
                (meeting_point_lat && meeting_point_lat !== '') ? parseFloat(meeting_point_lat) : null,
                (meeting_point_lng && meeting_point_lng !== '') ? parseFloat(meeting_point_lng) : null,
                cancellation_policy || 'Free cancellation up to 24 hours before the activity starts',
                JSON.stringify(languages || ['English', 'Hindi']),
                (group_size_min && group_size_min !== '') ? parseInt(group_size_min) : 1,
                (group_size_max && group_size_max !== '') ? parseInt(group_size_max) : 15,
                age_requirement || 'Suitable for all ages',
                physical_rating || 'Moderate',
                JSON.stringify(what_to_bring || []),
                JSON.stringify(faqs || []),
                (price_original && price_original !== '') ? parseFloat(price_original) : null,
                (price_discounted && price_discounted !== '') ? parseFloat(price_discounted) : null,
                instant_confirmation !== undefined ? instant_confirmation : true,
                free_cancellation !== undefined ? free_cancellation : true,
                (rating && rating !== '') ? parseFloat(rating) : 0,
                (review_count && review_count !== '') ? parseInt(review_count) : 0,
            ]
        );
        res.status(201).json({ success: true, data: rows[0] });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'An activity with this slug already exists.' });
        }
        next(error);
    }
};

// PUT /api/activities/:id
exports.updateActivity = async (req, res, next) => {
    try {
        const existing = await pool.query('SELECT * FROM activities WHERE id = $1', [req.params.id]);
        if (!existing.rows.length) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        const cur = existing.rows[0];

        const get = (key, transform) => {
            if (req.body[key] !== undefined) {
                const v = req.body[key];
                return transform ? transform(v) : v;
            }
            return cur[key];
        };

        const toInt = v => (v !== null && v !== '' && v !== undefined) ? parseInt(v) : null;
        const toFloat = v => (v !== null && v !== '' && v !== undefined) ? parseFloat(v) : null;
        const toJson = v => (v !== undefined) ? JSON.stringify(v) : null;

        const vals = [
            get('name') || cur.name,
            get('slug') || cur.slug,
            req.body.state_id !== undefined ? toInt(req.body.state_id) : cur.state_id,
            req.body.city_id !== undefined ? toInt(req.body.city_id) : cur.city_id,
            req.body.description !== undefined ? (req.body.description || '') : cur.description,
            req.body.category !== undefined ? (req.body.category || null) : cur.category,
            req.body.difficulty !== undefined ? (req.body.difficulty || null) : cur.difficulty,
            req.body.duration !== undefined ? (req.body.duration || null) : cur.duration,
            req.body.price !== undefined ? toFloat(req.body.price) : cur.price,
            req.body.best_season !== undefined ? (req.body.best_season || null) : cur.best_season,
            req.body.seo_title !== undefined ? (req.body.seo_title || null) : cur.seo_title,
            req.body.seo_description !== undefined ? (req.body.seo_description || null) : cur.seo_description,
            req.body.featured_image !== undefined ? (req.body.featured_image || null) : cur.featured_image,
            req.body.booking_link !== undefined ? (req.body.booking_link || null) : cur.booking_link,
            req.body.is_published !== undefined ? req.body.is_published : cur.is_published,
            // new fields
            req.body.gallery_images !== undefined ? JSON.stringify(req.body.gallery_images) : cur.gallery_images,
            req.body.highlights !== undefined ? JSON.stringify(req.body.highlights) : cur.highlights,
            req.body.inclusions !== undefined ? JSON.stringify(req.body.inclusions) : cur.inclusions,
            req.body.exclusions !== undefined ? JSON.stringify(req.body.exclusions) : cur.exclusions,
            req.body.important_info !== undefined ? JSON.stringify(req.body.important_info) : cur.important_info,
            req.body.meeting_point !== undefined ? (req.body.meeting_point || null) : cur.meeting_point,
            req.body.meeting_point_lat !== undefined ? toFloat(req.body.meeting_point_lat) : cur.meeting_point_lat,
            req.body.meeting_point_lng !== undefined ? toFloat(req.body.meeting_point_lng) : cur.meeting_point_lng,
            req.body.cancellation_policy !== undefined ? req.body.cancellation_policy : cur.cancellation_policy,
            req.body.languages !== undefined ? JSON.stringify(req.body.languages) : cur.languages,
            req.body.group_size_min !== undefined ? toInt(req.body.group_size_min) : cur.group_size_min,
            req.body.group_size_max !== undefined ? toInt(req.body.group_size_max) : cur.group_size_max,
            req.body.age_requirement !== undefined ? req.body.age_requirement : cur.age_requirement,
            req.body.physical_rating !== undefined ? req.body.physical_rating : cur.physical_rating,
            req.body.what_to_bring !== undefined ? JSON.stringify(req.body.what_to_bring) : cur.what_to_bring,
            req.body.faqs !== undefined ? JSON.stringify(req.body.faqs) : cur.faqs,
            req.body.price_original !== undefined ? toFloat(req.body.price_original) : cur.price_original,
            req.body.price_discounted !== undefined ? toFloat(req.body.price_discounted) : cur.price_discounted,
            req.body.instant_confirmation !== undefined ? req.body.instant_confirmation : cur.instant_confirmation,
            req.body.free_cancellation !== undefined ? req.body.free_cancellation : cur.free_cancellation,
            req.body.rating !== undefined ? toFloat(req.body.rating) : cur.rating,
            req.body.review_count !== undefined ? toInt(req.body.review_count) : cur.review_count,
            req.params.id
        ];

        const { rows } = await pool.query(
            `UPDATE activities SET
                name             = $1,  slug             = $2,  state_id         = $3,
                city_id          = $4,  description      = $5,  category         = $6,
                difficulty       = $7,  duration         = $8,  price            = $9,
                best_season      = $10, seo_title        = $11, seo_description  = $12,
                featured_image   = $13, booking_link     = $14, is_published     = $15,
                gallery_images   = $16, highlights       = $17, inclusions       = $18,
                exclusions       = $19, important_info   = $20, meeting_point    = $21,
                meeting_point_lat= $22, meeting_point_lng= $23, cancellation_policy = $24,
                languages        = $25, group_size_min   = $26, group_size_max   = $27,
                age_requirement  = $28, physical_rating  = $29, what_to_bring    = $30,
                faqs             = $31, price_original   = $32, price_discounted = $33,
                instant_confirmation = $34, free_cancellation = $35,
                rating           = $36, review_count     = $37,
                updated_at       = CURRENT_TIMESTAMP
            WHERE id = $38 RETURNING *`,
            vals
        );

        if (!rows.length) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Another activity with this slug already exists.' });
        }
        next(error);
    }
};

// DELETE /api/activities/:id
exports.deleteActivity = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid activity ID' });
        }
        const { rowCount } = await pool.query('DELETE FROM activities WHERE id = $1', [id]);
        if (!rowCount) return res.status(404).json({ error: 'Activity not found' });
        res.json({ success: true, message: 'Activity deleted.' });
    } catch (error) { next(error); }
};
