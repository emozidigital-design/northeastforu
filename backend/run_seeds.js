const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function runSeeds() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });

    try {
        await client.connect();
        console.log('Connected to DB...');

        // Clear existing data
        console.log('Truncating tables...');
        await client.query('TRUNCATE states, cities, attractions, activities CASCADE;');

        // 1. Seed States (using SQL for speed and consistency with others)
        console.log('Seeding States...');
        const states = [
            ['Arunachal Pradesh', 'arunachal-pradesh', 'Itanagar'],
            ['Assam', 'assam', 'Dispur'],
            ['Meghalaya', 'meghalaya', 'Shillong'],
            ['Manipur', 'manipur', 'Imphal'],
            ['Nagaland', 'nagaland', 'Kohima'],
            ['Mizoram', 'mizoram', 'Aizawl'],
            ['Sikkim', 'sikkim', 'Gangtok'],
            ['Tripura', 'tripura', 'Agartala']
        ];
        for (const [name, slug, capital] of states) {
            await client.query('INSERT INTO states (name, slug, capital) VALUES ($1, $2, $3)', [name, slug, capital]);
        }
        console.log('✅ States seeded');

        const seedDir = path.join(__dirname, '../database/seed');

        // Order matters: states -> cities -> attractions -> activities
        const seeds = [
            'states.sql',
            'all-states-cities.sql',
            'attractions-all-states.sql'
        ];

        for (const file of seeds) {
            const filePath = path.join(seedDir, file);
            if (fs.existsSync(filePath)) {
                console.log(`Running seed: ${file}`);
                const sql = fs.readFileSync(filePath, 'utf8');
                await client.query(sql);
                console.log(`✅ Success: ${file}`);
            } else {
                console.warn(`⚠️ Warning: ${file} not found at ${filePath}`);
            }
        }

    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    } finally {
        await client.end();
    }
}

runSeeds();
