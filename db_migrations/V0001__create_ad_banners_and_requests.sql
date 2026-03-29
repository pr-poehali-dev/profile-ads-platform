
CREATE TABLE IF NOT EXISTS t_p86061415_profile_ads_platform.ad_banners (
    id SERIAL PRIMARY KEY,
    slot INTEGER NOT NULL CHECK (slot BETWEEN 1 AND 4),
    advertiser_name VARCHAR(255),
    link_url TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p86061415_profile_ads_platform.ad_requests (
    id SERIAL PRIMARY KEY,
    advertiser_name VARCHAR(255) NOT NULL,
    link_url TEXT NOT NULL,
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p86061415_profile_ads_platform.ad_banners (slot, is_active)
VALUES (1, false), (2, false), (3, false), (4, false);
