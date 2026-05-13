const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
    const migrations = [
        // States
        "ALTER TABLE states RENAME COLUMN hero_image TO featured_image",
        "ALTER TABLE states ADD COLUMN IF NOT EXISTS capital VARCHAR(255)",
        "ALTER TABLE states ADD COLUMN IF NOT EXISTS language VARCHAR(255)",
        "ALTER TABLE states ADD COLUMN IF NOT EXISTS best_season VARCHAR(255)",
        "ALTER TABLE states ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

        // Cities
        "ALTER TABLE cities RENAME COLUMN hero_image TO featured_image",
        "ALTER TABLE cities ADD COLUMN IF NOT EXISTS best_time_to_visit VARCHAR(255)",
        "ALTER TABLE cities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

        // Attractions
        "ALTER TABLE attractions RENAME COLUMN hero_image TO featured_image",
        "ALTER TABLE attractions ADD COLUMN IF NOT EXISTS category VARCHAR(255)",
        "ALTER TABLE attractions ADD COLUMN IF NOT EXISTS best_time VARCHAR(255)",
        "ALTER TABLE attractions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

        // Activities
        "ALTER TABLE activities RENAME COLUMN title TO name",
        "ALTER TABLE activities RENAME COLUMN hero_image TO featured_image",
        "ALTER TABLE activities ADD COLUMN IF NOT EXISTS state_id INTEGER REFERENCES states(id) ON DELETE SET NULL",
        "ALTER TABLE activities ADD COLUMN IF NOT EXISTS category VARCHAR(255)",
        "ALTER TABLE activities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

        // Blogs
        "ALTER TABLE blogs ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft'",
        "ALTER TABLE blogs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",

        // Blog Automation Pipeline
        `CREATE TABLE IF NOT EXISTS blog_topics (
            id          SERIAL PRIMARY KEY,
            topic       VARCHAR(300) NOT NULL,
            keyword     VARCHAR(200),
            source      VARCHAR(100),
            trend_score INTEGER,
            is_used     BOOLEAN DEFAULT FALSE,
            created_at  TIMESTAMP DEFAULT NOW()
        )`,
        `CREATE TABLE IF NOT EXISTS blog_queue (
            id              SERIAL PRIMARY KEY,
            topic_id        INTEGER REFERENCES blog_topics(id),
            title           VARCHAR(300),
            status          VARCHAR(50) DEFAULT 'pending', -- pending | generating | published | failed
            scheduled_for   TIMESTAMP,
            published_at    TIMESTAMP,
            blog_id         INTEGER REFERENCES blogs(id),
            error_message   TEXT,
            created_at      TIMESTAMP DEFAULT NOW()
        )`
    ];

    for (const sql of migrations) {
        try {
            await pool.query(sql);
            console.log(`✅ EXECUTED: ${sql}`);
        } catch (error) {
            console.log(`❌ FAILED: ${sql} | ERROR: ${error.message}`);
        }
    }

    await pool.end();
}

runMigrations();
