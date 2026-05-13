const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkColumns() {
    const tables = ['states', 'cities', 'attractions', 'activities', 'blogs'];

    for (const table of tables) {
        try {
            const { rows } = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '${table}'
      `);
            console.log(`\nColumns for ${table}:`);
            console.table(rows);
        } catch (error) {
            console.log(`| ${table} | ERROR: ${error.message} |`);
        }
    }

    await pool.end();
}

checkColumns();
