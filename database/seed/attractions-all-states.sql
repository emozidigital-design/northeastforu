-- SEED DATA FOR TOP 3 ATTRACTIONS PER STATE
-- ASSAM
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Kaziranga National Park', 'kaziranga-national-park', (SELECT id FROM cities WHERE name = 'Kaziranga'), 'UNESCO site with the world''s largest population of one-horned rhinos.', '250', '7 AM to 4 PM (Safari)', 'Kaziranga National Park | Safari Guide', 'Experience the wildlife of Assam. Safari timings, elephant rides, and rhinos.', CURRENT_DATE),
('Kamakhya Temple', 'kamakhya-temple', (SELECT id FROM cities WHERE name = 'Guwahati'), 'One of the oldest and most revered Shakti Peethas in India.', '0', '5 AM to 10 PM', 'Kamakhya Temple Guwahati | Pilgrimage Guide', 'Plan your visit to Kamakhya Temple. Timings, rituals, and significance.', CURRENT_DATE),
('Majuli Island Satras', 'majuli-satras', (SELECT id FROM cities WHERE name = 'Majuli Island'), 'Vaishnavite monasteries that are centers of art, music, and drama.', '0', '6 AM to 6 PM', 'Majuli Satras Guide | Vaishnavite Culture', 'Discover the unique satras of Majuli. Mask making, dance, and spiritual life.', CURRENT_DATE);

-- ARUNACHAL PRADESH
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Tawang Monastery', 'tawang-monastery', (SELECT id FROM cities WHERE name = 'Tawang'), 'The largest monastery in India and second largest in the world.', '50', '7 AM to 7 PM', 'Tawang Monastery Guide | Hidden Himalayan Gem', 'Visit the 17th-century Tawang Monastery. History, murals, and architecture guide.', CURRENT_DATE),
('Sela Pass', 'sela-pass', (SELECT id FROM cities WHERE name = 'Tawang'), 'High altitude mountain pass at 13,700 ft with the beautiful Sela Lake.', '0', 'Open All Day', 'Sela Pass Tawang | High Altitude Gateway', 'Crossing the Sela Pass: Logistics, weather, and the legendary lake.', CURRENT_DATE),
('Madhuri Lake', 'madhuri-lake', (SELECT id FROM cities WHERE name = 'Tawang'), 'Actually Sangetsar Lake, made famous by a Bollywood movie.', '100', '8 AM to 5 PM', 'Madhuri Lake Guide | Sacred High Altitude Lake', 'Visit Sangetsar Lake near Tawang. A hauntingly beautiful high-altitude lake.', CURRENT_DATE);

-- NAGALAND
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Dzukou Valley', 'dzukou-valley', (SELECT id FROM cities WHERE name = 'Kohima'), 'A valley of flowers and rolling green hills on the Nagaland-Manipur border.', '100', '6 AM to 5 PM', 'Dzukou Valley Trek | Land of Flowers', 'Plan your trek to Dzukou Valley. Best time, permit details, and stay guide.', CURRENT_DATE),
('Kohima War Cemetery', 'kohima-war-cemetery', (SELECT id FROM cities WHERE name = 'Kohima'), 'A poignant memorial for the soldiers who died in the WWII Battle of Kohima.', '0', '7 AM to 5 PM', 'Kohima War Cemetery | WWII History', 'Visit the memorial site of the famous Battle of Kohima. History and entry guide.', CURRENT_DATE),
('Longwa Village', 'longwa-village', (SELECT id FROM cities WHERE name = 'Mon'), 'A village where the border with Myanmar passes through the Angh''s house.', '0', '8 AM to 5 PM', 'Longwa Village Guide | Cross Border Naga Heritage', 'Visit the Konyak Naga village of Longwa. Meet the last tattoo headhunters.', CURRENT_DATE);

-- SIKKIM
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Tsomgo Lake', 'tsomgo-lake', (SELECT id FROM cities WHERE name = 'Gangtok'), 'A glacial lake at 12,400 ft, often frozen in winter and sacred to Sikkimese.', '200', '8 AM to 5 PM', 'Tsomgo Lake Guide | Sacred Glacial Lake Sikkim', 'Visit Changu Lake from Gangtok. Yak rides, permits, and travel tips.', CURRENT_DATE),
('Nathula Pass', 'nathula-pass', (SELECT id FROM cities WHERE name = 'Gangtok'), 'Strategic border pass between India and China at 14,140 ft.', '200', '7 AM to 4 PM (Closed Mon/Tue)', 'Nathula Pass Guide | India-China Border', 'Crossing the Nathula Pass: Permit requirements and visiting days.', CURRENT_DATE),
('Gurudongmar Lake', 'gurudongmar-lake', (SELECT id FROM cities WHERE name = 'Lachen'), 'One of the highest lakes in the world, considered very sacred.', '0', '6 AM to 4 PM', 'Gurudongmar Lake Guide | Sacred High Altitude Sikkim', 'Visit the highest lake in India. Altitude warnings, permits, and timings.', CURRENT_DATE);

-- MANIPUR
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Loktak Lake Floating Park', 'loktak-floating-park', (SELECT id FROM cities WHERE name = 'Loktak Lake'), 'World''s only floating national park, home to the dancing Sangai deer.', '50', '6 AM to 6 PM', 'Loktak Lake Guide | Floating Phumdis Manipur', 'Explore the world''s only floating national park on Loktak Lake.', CURRENT_DATE),
('Ima Keithel Market', 'ima-keithel-market', (SELECT id FROM cities WHERE name = 'Imphal'), 'Asian largest market run exclusively by over 5000 women (Imas).', '0', '9 AM to 5 PM', 'Ima Keithel Guide | World''s Largest Women''s Market', 'Discover the cultural heartbeat of Manipur at the Mothers'' Market.', CURRENT_DATE),
('Kangla Fort', 'kangla-fort', (SELECT id FROM cities WHERE name = 'Imphal'), 'Ancient seat of the Meitei royal family on the banks of Imphal river.', '25', '9 AM to 5 PM', 'Kangla Fort Guide | Royal Citadel of Manipur', 'Explore the historical fort of Imphal. Temples, ruins, and archeology.', CURRENT_DATE);

-- MIZORAM
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Vantawng Falls', 'vantawng-falls', (SELECT id FROM cities WHERE name = 'Aizawl'), 'Highest waterfall in Mizoram, plunging from nearly 750 ft.', '0', '7 AM to 5 PM', 'Vantawng Falls Guide | Mizoram''s Highest Waterfall', 'Visit the majestic Vantawng Falls. Best viewing spots and logistics.', CURRENT_DATE),
('Reiek Heritage Village', 'reiek-heritage-village', (SELECT id FROM cities WHERE name = 'Reiek'), 'Traditional Mizo village setup demonstrating the ancestor''s lifestyle.', '50', '8 AM to 5 PM', 'Reiek Heritage Village | Mizo Tribal Life', 'Explore the lifestyle and architecture of ancient Mizo tribes at Reiek.', CURRENT_DATE),
('Phawngpui National Park', 'phawngpui-park', (SELECT id FROM cities WHERE name = 'Aizawl'), 'Known as the "Blue Mountain", it is highest peak in the state.', '100', '6 AM to 5 PM', 'Phawngpui National Park | Blue Mountain Guide', 'High-altitude adventure in Mizoram. Flora, fauna, and trekking tips.', CURRENT_DATE);

-- TRIPURA
INSERT INTO attractions (name, slug, city_id, description, entry_fee, timings, seo_title, seo_description, last_verified_date) VALUES
('Unakoti Rock Carvings', 'unakoti-rock-carvings', (SELECT id FROM cities WHERE name = 'Unakoti'), 'Mysterious and massive bas-relief sculptures from the 7th century.', '25', '8 AM to 5 PM', 'Unakoti Rock Carvings | Ancient Shaivite Site', 'Explore the Angkor Wat of North East India at Unakoti, Tripura.', CURRENT_DATE),
('Ujjayanta Palace', 'ujjayanta-palace', (SELECT id FROM cities WHERE name = 'Agartala'), 'Magnificent white palace built by the Manikya Kings in the heart of the city.', '10', '10 AM to 5 PM', 'Ujjayanta Palace Guide | Royal Tripura Heritage', 'Visit the royal palace of Agartala. Museums, gardens, and history.', CURRENT_DATE),
('Neermahal Water Palace', 'neermahal-palace', (SELECT id FROM cities WHERE name = 'Agartala'), 'Unique royal palace built in the middle of Rudrasagar Lake.', '30', '9 AM to 5 PM', 'Neermahal Palace Guide | Lake Palace of Tripura', 'Plan your visit to Neermahal. Boating and architecture guide.', CURRENT_DATE);
