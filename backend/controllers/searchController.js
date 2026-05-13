const pool = require('../lib/db');

exports.search = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q || q.length < 2) {
            return res.status(400).json({ error: 'Query must be at least 2 characters' });
        }

        const searchQuery = `%${q}%`;

        // Parallel queries for performance
        const [states, cities, attractions, activities, blogs] = await Promise.all([
            pool.query('SELECT name, slug, featured_image, description, \'state\' as type FROM states WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5', [searchQuery]),
            pool.query('SELECT name, slug, featured_image, description, \'city\' as type FROM cities WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5', [searchQuery]),
            pool.query('SELECT name, slug, featured_image, description, \'attraction\' as type FROM attractions WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5', [searchQuery]),
            pool.query('SELECT name, slug, featured_image, description, \'activity\' as type FROM activities WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5', [searchQuery]),
            pool.query('SELECT title as name, slug, featured_image, content as description, \'blog\' as type FROM blogs WHERE title ILIKE $1 OR content ILIKE $1 LIMIT 5', [searchQuery])
        ]);

        res.status(200).json({
            success: true,
            data: {
                states: states.rows,
                cities: cities.rows,
                attractions: attractions.rows,
                activities: activities.rows,
                blogs: blogs.rows
            }
        });
    } catch (error) {
        next(error);
    }
};
