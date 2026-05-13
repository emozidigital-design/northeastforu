const pool = require('./lib/db');
async function checkSchema() {
    try {
        const { rows } = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'activities'
        `);
        console.log('Columns in activities table:');
        rows.forEach(row => console.log(`- ${row.column_name} (${row.data_type})`));
        process.exit(0);
    } catch (err) {
        console.error('Error checking schema:', err);
        process.exit(1);
    }
}
checkSchema();
