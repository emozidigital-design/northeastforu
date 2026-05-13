const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkFKs() {
    try {
        const { rows } = await pool.query(`
            SELECT c.name as city_name, s.name as state_name 
            FROM cities c 
            LEFT JOIN states s ON c.state_id = s.id 
            ORDER BY s.name;
        `);
        console.log('| City | State |');
        console.log('|------|-------|');
        rows.forEach(row => {
            console.log(`| ${row.city_name} | ${row.state_name || 'NULL'} |`);
        });

        const unlinked = rows.filter(r => !r.state_name).length;
        if (unlinked > 0) {
            console.log(`\n⚠️ Found ${unlinked} unlinked cities!`);
        } else {
            console.log('\n✅ All cities are correctly linked to states.');
        }

    } catch (error) {
        console.error('Error checking FKs:', error.message);
    } finally {
        await pool.end();
    }
}

checkFKs();
