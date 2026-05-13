-- ============================================================
-- NorthEastForU Platform — Complete Database Schema
-- Last updated: 2026-03-07
-- ============================================================

-- ─────────────────────────────────────────────
-- CORE CONTENT TABLES
-- ─────────────────────────────────────────────

-- States Table
CREATE TABLE IF NOT EXISTS states (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(255) UNIQUE NOT NULL,
    description         TEXT,
    featured_image      TEXT,                        -- renamed from hero_image
    capital             VARCHAR(255),
    language            VARCHAR(255),
    best_season         VARCHAR(255),
    seo_title           VARCHAR(255),
    seo_description     TEXT,
    last_verified_date  TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities Table
CREATE TABLE IF NOT EXISTS cities (
    id                  SERIAL PRIMARY KEY,
    state_id            INTEGER NOT NULL REFERENCES states(id) ON DELETE CASCADE,
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(255) UNIQUE NOT NULL,
    description         TEXT,
    featured_image      TEXT,                        -- renamed from hero_image
    budget_per_day      DECIMAL(10, 2),
    best_time_to_visit  VARCHAR(255),
    latitude            DECIMAL(10, 8),
    longitude           DECIMAL(11, 8),
    seo_title           VARCHAR(255),
    seo_description     TEXT,
    faq_data            JSONB,
    last_verified_date  TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attractions Table
CREATE TABLE IF NOT EXISTS attractions (
    id                  SERIAL PRIMARY KEY,
    city_id             INTEGER NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(255) UNIQUE NOT NULL,
    description         TEXT,
    category            VARCHAR(255),
    location            TEXT,
    entry_fee           VARCHAR(255),
    best_time           VARCHAR(255),
    opening_hours       VARCHAR(255),
    featured_image      TEXT,                        -- renamed from hero_image
    latitude            DECIMAL(10, 8),
    longitude           DECIMAL(11, 8),
    seo_title           VARCHAR(255),
    seo_description     TEXT,
    faq_data            JSONB,
    last_verified_date  TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activities Table
-- NOTE: activities are linked to a STATE (not a city) for top-level browsing
CREATE TABLE IF NOT EXISTS activities (
    id                  SERIAL PRIMARY KEY,
    state_id            INTEGER REFERENCES states(id) ON DELETE SET NULL,
    city_id             INTEGER REFERENCES cities(id) ON DELETE SET NULL,
    name                VARCHAR(255) NOT NULL,       -- renamed from title
    slug                VARCHAR(255) UNIQUE NOT NULL,
    description         TEXT,
    category            VARCHAR(255),               -- e.g. Adventure, Cultural, Wildlife
    difficulty          VARCHAR(100),               -- Easy, Moderate, Hard, Expert
    duration            VARCHAR(255),
    price               DECIMAL(10, 2),
    booking_link        TEXT,
    best_season         VARCHAR(255),
    featured_image      TEXT,
    seo_title           VARCHAR(255),
    seo_description     TEXT,
    faq_data            JSONB,
    is_published        BOOLEAN DEFAULT TRUE,
    last_verified_date  TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- BLOG & CONTENT
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blogs (
    id              SERIAL PRIMARY KEY,
    title           VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    content         TEXT,
    author          VARCHAR(255) DEFAULT 'NorthEastForU Team',
    featured_image  TEXT,
    category        VARCHAR(255),
    status          VARCHAR(50) DEFAULT 'draft',   -- draft | published | archived
    ai_draft        BOOLEAN DEFAULT FALSE,
    seo_title       VARCHAR(255),
    seo_description TEXT,
    published_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Automation Pipeline
CREATE TABLE IF NOT EXISTS blog_topics (
    id          SERIAL PRIMARY KEY,
    topic       VARCHAR(300) NOT NULL,
    keyword     VARCHAR(200),
    source      VARCHAR(100),
    trend_score INTEGER,
    is_used     BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_queue (
    id              SERIAL PRIMARY KEY,
    topic_id        INTEGER REFERENCES blog_topics(id),
    title           VARCHAR(300),
    status          VARCHAR(50) DEFAULT 'pending', -- pending | generating | published | failed
    scheduled_for   TIMESTAMP,
    published_at    TIMESTAMP,
    blog_id         INTEGER REFERENCES blogs(id),
    error_message   TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_shares (
    id              SERIAL PRIMARY KEY,
    blog_id         INTEGER REFERENCES blogs(id),
    platform        VARCHAR(50),
    status          VARCHAR(50),
    shared_at       TIMESTAMP,
    post_url        VARCHAR(500),
    error_message   TEXT
);

CREATE TABLE IF NOT EXISTS newsletter_sends (
    id                  SERIAL PRIMARY KEY,
    blog_id             INTEGER REFERENCES blogs(id),
    total_subscribers   INTEGER,
    sent_count          INTEGER,
    failed_count        INTEGER,
    sent_at             TIMESTAMP,
    status              VARCHAR(50)
);

-- ─────────────────────────────────────────────
-- CRM & LEADS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    phone           VARCHAR(50),
    country         VARCHAR(100),
    destination     VARCHAR(255),
    travel_date     DATE,
    message         TEXT NOT NULL,
    source_page     TEXT,
    status          VARCHAR(50) DEFAULT 'new',      -- new | contacted | planning | converted | closed
    assigned_to     VARCHAR(255),
    follow_up_date  TIMESTAMP,
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- MEDIA LIBRARY
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS media (
    id              SERIAL PRIMARY KEY,
    file_name       VARCHAR(255) NOT NULL,
    file_url        TEXT NOT NULL,
    file_type       VARCHAR(50),                    -- image/jpeg, image/png, video/mp4
    file_size       INTEGER,                        -- bytes
    alt_text        TEXT,
    uploaded_by     VARCHAR(255),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- NEWSLETTER SUBSCRIBERS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS newsletters (
    id                  SERIAL PRIMARY KEY,
    email               VARCHAR(255) UNIQUE NOT NULL,
    name                VARCHAR(255),
    subscribed_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active           BOOLEAN DEFAULT TRUE,
    source_page         TEXT,
    unsubscribe_token   VARCHAR(255) UNIQUE
);

-- ─────────────────────────────────────────────
-- REVIEWS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reviews (
    id              SERIAL PRIMARY KEY,
    page_type       VARCHAR(50) NOT NULL,       -- state | city | attraction | activity
    page_slug       VARCHAR(255) NOT NULL,
    reviewer_name   VARCHAR(255) NOT NULL,
    reviewer_email  VARCHAR(255) NOT NULL,
    rating          INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text     TEXT,
    is_approved     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- SEO & TRENDS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS trends (
    id          SERIAL PRIMARY KEY,
    keyword     VARCHAR(255) NOT NULL,
    score       INTEGER,
    category    VARCHAR(100),
    fetched_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- CONTENT IMPROVEMENT SYSTEM (AI)
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS content_versions (
    id              SERIAL PRIMARY KEY,
    content_type    VARCHAR(50) NOT NULL,  -- state | city | attraction | activity | blog
    content_id      INTEGER NOT NULL,
    field_name      VARCHAR(100) NOT NULL,
    old_value       TEXT,
    new_value       TEXT,
    improved_by     VARCHAR(100) DEFAULT 'claude-ai',
    status          VARCHAR(50) DEFAULT 'pending_review', -- pending_review | approved | rejected
    reviewed_by     VARCHAR(100),
    reviewed_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_improvement_jobs (
    id              SERIAL PRIMARY KEY,
    job_name        VARCHAR(200),
    content_type    VARCHAR(50),
    total_items     INTEGER DEFAULT 0,
    completed_items INTEGER DEFAULT 0,
    failed_items    INTEGER DEFAULT 0,
    status          VARCHAR(50) DEFAULT 'pending',  -- pending | running | completed | failed
    started_at      TIMESTAMP,
    completed_at    TIMESTAMP,
    error_log       TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS insider_tips (
    id              SERIAL PRIMARY KEY,
    page_type       VARCHAR(50) NOT NULL,
    page_slug       VARCHAR(200) NOT NULL,
    tip_title       VARCHAR(200),
    tip_content     TEXT NOT NULL,
    tip_category    VARCHAR(100),
    is_approved     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faq_items (
    id              SERIAL PRIMARY KEY,
    page_type       VARCHAR(50) NOT NULL,
    page_slug       VARCHAR(200) NOT NULL,
    question        TEXT NOT NULL,
    answer          TEXT NOT NULL,
    display_order   INTEGER DEFAULT 0,
    is_approved     BOOLEAN DEFAULT FALSE,
    schema_eligible BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- USER GENERATED CONTENT & COMMUNITY
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_photos (
    id                  SERIAL PRIMARY KEY,
    page_type           VARCHAR(50),
    page_slug           VARCHAR(200),
    photographer_name   VARCHAR(100) NOT NULL,
    photographer_email  VARCHAR(150) NOT NULL,
    photo_url           VARCHAR(500),
    caption             VARCHAR(300),
    location_tag        VARCHAR(200),
    is_approved         BOOLEAN DEFAULT FALSE,
    is_featured         BOOLEAN DEFAULT FALSE,
    uploaded_at         TIMESTAMP DEFAULT NOW()
);

-- Forum
CREATE TABLE IF NOT EXISTS forum_categories (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(300),
    icon        VARCHAR(50),
    post_count  INTEGER DEFAULT 0,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_posts (
    id              SERIAL PRIMARY KEY,
    category_id     INTEGER REFERENCES forum_categories(id),
    author_name     VARCHAR(100) NOT NULL,
    author_email    VARCHAR(150) NOT NULL,
    title           VARCHAR(300) NOT NULL,
    content         TEXT NOT NULL,
    is_approved     BOOLEAN DEFAULT FALSE,
    is_pinned       BOOLEAN DEFAULT FALSE,
    view_count      INTEGER DEFAULT 0,
    reply_count     INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
    id              SERIAL PRIMARY KEY,
    post_id         INTEGER REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_name     VARCHAR(100) NOT NULL,
    author_email    VARCHAR(150) NOT NULL,
    content         TEXT NOT NULL,
    is_approved     BOOLEAN DEFAULT FALSE,
    is_helpful      BOOLEAN DEFAULT FALSE,
    helpful_count   INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- LOYALTY & GAMIFICATION
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS loyalty_members (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    points          INTEGER DEFAULT 0,
    tier            VARCHAR(50) DEFAULT 'Explorer', -- Explorer | Adventurer | Pioneer | Legend
    total_earned    INTEGER DEFAULT 0,
    joined_at       TIMESTAMP DEFAULT NOW(),
    last_active     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id          SERIAL PRIMARY KEY,
    member_id   INTEGER REFERENCES loyalty_members(id),
    action      VARCHAR(100) NOT NULL,
    points      INTEGER NOT NULL,
    description VARCHAR(300),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- MONETISATION
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS affiliate_links (
    id              SERIAL PRIMARY KEY,
    page_slug       VARCHAR(200),
    link_type       VARCHAR(50),       -- hotel | flight | tour | gear
    provider        VARCHAR(100),
    link_url        VARCHAR(500),
    display_text    VARCHAR(200),
    commission_info VARCHAR(200),
    is_active       BOOLEAN DEFAULT TRUE,
    click_count     INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────
-- PUSH NOTIFICATIONS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS push_subscribers (
    id              SERIAL PRIMARY KEY,
    endpoint        TEXT NOT NULL UNIQUE,
    p256dh          TEXT NOT NULL,
    auth            TEXT NOT NULL,
    subscribed_at   TIMESTAMP DEFAULT NOW(),
    is_active       BOOLEAN DEFAULT TRUE
);

-- ─────────────────────────────────────────────
-- PERFORMANCE INDEXES
-- ─────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);

CREATE INDEX IF NOT EXISTS idx_cities_slug ON cities(slug);
CREATE INDEX IF NOT EXISTS idx_cities_state_id ON cities(state_id);

CREATE INDEX IF NOT EXISTS idx_attractions_slug ON attractions(slug);
CREATE INDEX IF NOT EXISTS idx_attractions_city_id ON attractions(city_id);

CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_state_id ON activities(state_id);
CREATE INDEX IF NOT EXISTS idx_activities_city_id ON activities(city_id);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

CREATE INDEX IF NOT EXISTS idx_reviews_slug ON reviews(page_slug);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);

CREATE INDEX IF NOT EXISTS idx_newsletters_email ON newsletters(email);

CREATE INDEX IF NOT EXISTS idx_trends_keyword ON trends(keyword);

CREATE INDEX IF NOT EXISTS idx_content_versions_status ON content_versions(status);
CREATE INDEX IF NOT EXISTS idx_content_versions_type ON content_versions(content_type, content_id);

CREATE INDEX IF NOT EXISTS idx_faq_items_slug ON faq_items(page_slug, is_approved);
CREATE INDEX IF NOT EXISTS idx_insider_tips_slug ON insider_tips(page_slug, is_approved);

CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_approved ON forum_posts(is_approved);

CREATE INDEX IF NOT EXISTS idx_user_photos_approved ON user_photos(is_approved);
CREATE INDEX IF NOT EXISTS idx_loyalty_members_email ON loyalty_members(email);
CREATE INDEX IF NOT EXISTS idx_push_subscribers_active ON push_subscribers(is_active);

-- ─────────────────────────────────────────────
-- MIGRATION: Rename columns from old schema
-- Run ONLY if migrating an existing database.
-- ─────────────────────────────────────────────
/*
ALTER TABLE states    RENAME COLUMN hero_image TO featured_image;
ALTER TABLE cities    RENAME COLUMN hero_image TO featured_image;
ALTER TABLE cities    ADD COLUMN IF NOT EXISTS best_time_to_visit VARCHAR(255);
ALTER TABLE cities    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE states    ADD COLUMN IF NOT EXISTS capital VARCHAR(255);
ALTER TABLE states    ADD COLUMN IF NOT EXISTS language VARCHAR(255);
ALTER TABLE states    ADD COLUMN IF NOT EXISTS best_season VARCHAR(255);
ALTER TABLE states    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE attractions RENAME COLUMN hero_image TO featured_image;
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS category VARCHAR(255);
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS best_time VARCHAR(255);
ALTER TABLE attractions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE activities RENAME COLUMN title TO name;
ALTER TABLE activities RENAME COLUMN hero_image TO featured_image;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS state_id INTEGER REFERENCES states(id) ON DELETE SET NULL;
ALTER TABLE activities ADD COLUMN IF NOT EXISTS category VARCHAR(255);
ALTER TABLE activities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE blogs      ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'draft';
ALTER TABLE blogs      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE leads      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE media      ADD COLUMN IF NOT EXISTS file_type VARCHAR(50);
ALTER TABLE media      ADD COLUMN IF NOT EXISTS file_size INTEGER;
*/

-- ─────────────────────────────────────────────
-- SEED DATA: Coordinates for Meghalaya cities
-- ─────────────────────────────────────────────
/*
UPDATE cities SET latitude = 25.5788, longitude = 91.8933 WHERE slug = 'shillong';
UPDATE cities SET latitude = 25.2898, longitude = 91.7236 WHERE slug = 'cherrapunji';
UPDATE cities SET latitude = 25.2036, longitude = 91.9204 WHERE slug = 'mawlynnong';
UPDATE cities SET latitude = 25.1911, longitude = 92.0181 WHERE slug = 'dawki';
UPDATE cities SET latitude = 25.4508, longitude = 92.2067 WHERE slug = 'jowai';
UPDATE cities SET latitude = 25.2676, longitude = 91.7204 WHERE slug = 'nongriat';
*/
