// Run once: node migrate_itinerary_fields.js
// Adds tagline, daily_schedule, pricing_tiers columns to itineraries table
require('./lib/loadEnv');
const pool = require('./lib/db');

async function run() {
  await pool.query(`
    ALTER TABLE itineraries
      ADD COLUMN IF NOT EXISTS tagline VARCHAR(500),
      ADD COLUMN IF NOT EXISTS daily_schedule JSONB DEFAULT '[]',
      ADD COLUMN IF NOT EXISTS pricing_tiers JSONB DEFAULT '[]'
  `);
  console.log('Migration complete: tagline, daily_schedule, pricing_tiers added to itineraries.');
  await pool.end();
}

run().catch(e => { console.error(e); process.exit(1); });
