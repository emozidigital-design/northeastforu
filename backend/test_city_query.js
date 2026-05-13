require('dotenv').config();
const pool = require('./lib/db');

async function testQuery() {
    try {
        const state = 'assam';
        const page = 1;
        const limit = 50;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const params = [state, parseInt(limit), offset];
        const where = 'WHERE 1=1 AND s.slug = $1';

        const query = `
            SELECT c.*, s.name AS state_name, s.slug AS state_slug
            FROM cities c
            LEFT JOIN states s ON s.id = c.state_id
            ${where}
            ORDER BY c.name
            LIMIT $2 OFFSET $3
        `;
        const countQuery = `
            SELECT COUNT(*) 
            FROM cities c 
            LEFT JOIN states s ON s.id = c.state_id 
            ${where}
        `;
        const countParams = params.slice(0, -2);

        console.log('Query:', query);
        console.log('Params:', params);
        console.log('Count Query:', countQuery);
        console.log('Count Params:', countParams);

        const [dataResult, countResult] = await Promise.all([
            pool.query(query, params),
            pool.query(countQuery, countParams)
        ]);

        console.log('Data Rows:', dataResult.rows.length);
        console.log('Count Row:', countResult.rows[0]);
        console.log('Success!');
        process.exit(0);
    } catch (error) {
        console.error('Test Failed:', error);
        process.exit(1);
    }
}

testQuery();
