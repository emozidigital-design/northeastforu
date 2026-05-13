const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkDB() {
    const tables = ['states', 'cities', 'attractions', 'activities', 'blogs'];
    console.log('| Table | Count |');
    console.log('|-------|-------|');

    for (const table of tables) {
        try {
            const { rows } = await pool.query(`SELECT COUNT(*) FROM ${table}`);
            console.log(`| ${table} | ${rows[0].count} |`);
        } catch (error) {
            console.log(`| ${table} | ERROR: ${error.message} |`);
        }
    }

    // Also check states data
    try {
        const { rows } = await pool.query(`SELECT id, name, slug FROM states`);
        console.log('\nStates in DB:');
        console.table(rows);
    } catch (error) {
        console.error('Error fetching states:', error.message);
    }

    await pool.end();
}

checkDB();
