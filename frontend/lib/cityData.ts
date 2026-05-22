export interface PlaceData {
  name: string;
  slug: string;
  description: string;
  history?: string;
  why_visit: string[];
  category: 'temple' | 'nature' | 'heritage' | 'wildlife' | 'viewpoint' | 'market' | 'museum' | 'adventure' | 'lake' | 'waterfall' | 'festival';
  best_time?: string;
  image?: string;
}

export interface CityStaticData {
  name: string;
  slug: string;
  state: string;
  state_slug: string;
  tagline: string;
  description: string;
  best_time: string;
  how_to_reach?: string;
  featured_image?: string;
  hero_images?: { src: string; label: string; location: string }[];
  places: PlaceData[];
  quick_facts?: { label: string; value: string }[];
}

const CITY_DATA: CityStaticData[] = [
  // ─── ASSAM ────────────────────────────────────────────────────────────────

  {
    name: 'Guwahati',
    slug: 'guwahati',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'Gateway to Northeast India',
    description: `Guwahati is the largest city in Northeast India and the cultural and commercial capital of Assam. Perched on the southern banks of the mighty Brahmaputra River, the city is a vibrant blend of ancient spiritual heritage, colonial landmarks, and modern urban energy.\n\nHome to the sacred Kamakhya Temple — one of India's most important Shakti Peethas — Guwahati draws millions of pilgrims and travelers every year. The city also serves as the entry point for exploring the entire Northeast, with road, rail, and air connections fanning out to all eight states.\n\nBeyond its spiritual significance, Guwahati offers a compelling cultural scene: a state museum of rare tribal artefacts, river island temples, Brahmaputra sunset cruises, and a lively bazaar culture. For first-time Northeast travelers, Guwahati is almost always the beginning of the journey.`,
    best_time: 'October – March',
    how_to_reach: 'Fly into Lokpriya Gopinath Bordoloi International Airport (GAU). Well-connected by train (Guwahati Station) and road from across India.',
    featured_image: '/images/assam/Guwahati 1.jpg',
    hero_images: [
      { src: '/images/assam/Guwahati 1.jpg', label: 'Guwahati', location: 'Assam' },
      { src: '/images/assam/assam-1.jpg', label: 'Brahmaputra River', location: 'Guwahati' },
      { src: '/images/assam/assam-2.jpg', label: 'Assam Landscape', location: 'Guwahati' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Oct – Mar' },
      { label: 'Known For', value: 'Kamakhya Temple, Brahmaputra' },
      { label: 'Nearest Airport', value: 'Lokpriya Gopinath Bordoloi (GAU)' },
      { label: 'Language', value: 'Assamese, Bengali, Hindi' },
    ],
    places: [
      {
        name: 'Kamakhya Temple',
        slug: 'kamakhya-temple',
        category: 'temple',
        description: 'Kamakhya Temple is one of the most important Shakti Peethas in India and a major spiritual center dedicated to Goddess Kamakhya. The temple dates back several centuries and has deep connections with Tantric traditions and Hindu mythology.',
        why_visit: [
          'One of the most sacred temples in India',
          'Unique temple architecture and spiritual atmosphere',
          'Panoramic views of Guwahati and the Brahmaputra River',
          'Important center during the Ambubachi Mela festival',
        ],
        best_time: 'October – March (avoid Ambubachi crowds unless that\'s the goal)',
        image: '/images/assam/Guwahati 1.jpg',
      },
      {
        name: 'Umananda Island',
        slug: 'umananda-island',
        category: 'temple',
        description: 'Located in the middle of the Brahmaputra River, Umananda Island is home to the Umananda Temple dedicated to Lord Shiva. The island is considered one of the smallest inhabited river islands in the world.',
        why_visit: [
          'Scenic ferry ride on the Brahmaputra River',
          'Peaceful spiritual destination',
          'Excellent photography and sunset views',
          'Unique island experience within the city',
        ],
        best_time: 'October – April',
        image: '/images/assam/assam-1.jpg',
      },
      {
        name: 'Assam State Museum',
        slug: 'assam-state-museum',
        category: 'museum',
        description: 'The Assam State Museum preserves the cultural and historical heritage of Assam and the Northeast. Established during the colonial period, the museum showcases sculptures, tribal artifacts, manuscripts, and archaeological collections.',
        why_visit: [
          'Learn about Assamese history and tribal cultures',
          'Rare archaeological and historical exhibits',
          'Ideal for cultural and educational tourism',
          'Insight into regional traditions and heritage',
        ],
        best_time: 'Year round',
        image: '/images/assam/assam-2.jpg',
      },
      {
        name: 'Brahmaputra River Cruise',
        slug: 'brahmaputra-river-cruise',
        category: 'nature',
        description: 'The Brahmaputra River is central to Assam\'s identity and river cruises offer one of the best ways to experience the city\'s landscapes and sunsets.',
        why_visit: [
          'Scenic sunset experiences',
          'Riverside city views',
          'Traditional Assamese cultural performances on select cruises',
          'Relaxing leisure activity for families and couples',
        ],
        best_time: 'October – March (golden hour cruises)',
        image: '/images/assam/assam-3.jpg',
      },
    ],
  },

  // ─── KAZIRANGA ───────────────────────────────────────────────────────────

  {
    name: 'Kaziranga',
    slug: 'kaziranga',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'Kingdom of the One-Horned Rhino',
    description: `Kaziranga National Park is one of India's greatest conservation success stories — a UNESCO World Heritage Site that shelters the world's largest population of the great one-horned rhinoceros. Spread across floodplains, tall elephant grass, and dense forests alongside the Brahmaputra, the park is also home to tigers, wild elephants, wild water buffalo, and hundreds of bird species.\n\nJeep and elephant safaris at dawn, when the grassland mist hangs low and rhinos graze in the open, are among the defining wildlife experiences in India. Three main safari ranges — Central, Western, and Eastern — each offer distinct landscapes and wildlife densities.`,
    best_time: 'November – April (park closed during monsoon)',
    how_to_reach: 'Nearest airport: Jorhat (JRH, ~97 km). Also accessible from Guwahati (~230 km) by road.',
    featured_image: '/images/assam/Kaziranga 1.jpg',
    hero_images: [
      { src: '/images/assam/Kaziranga 1.jpg', label: 'Kaziranga National Park', location: 'Assam' },
      { src: '/images/assam/assam-1.jpg', label: 'Brahmaputra Floodplains', location: 'Kaziranga' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Nov – Apr' },
      { label: 'Known For', value: 'One-horned rhinos, UNESCO World Heritage' },
      { label: 'Nearest Airport', value: 'Jorhat (JRH)' },
      { label: 'Park Status', value: 'UNESCO World Heritage Site' },
    ],
    places: [
      {
        name: 'Kaziranga National Park',
        slug: 'kaziranga-national-park',
        category: 'wildlife',
        description: 'Kaziranga National Park is a UNESCO World Heritage Site famous for the world\'s largest population of one-horned rhinoceroses. Established as a protected area in the early 20th century, it remains one of India\'s greatest wildlife conservation success stories.',
        why_visit: [
          'Rhino safaris in natural grasslands',
          'Spot tigers, elephants, wild buffaloes, and deer',
          'UNESCO World Heritage Site',
          'One of India\'s best wildlife photography destinations',
        ],
        best_time: 'November – April',
        image: '/images/assam/Kaziranga 1.jpg',
      },
      {
        name: 'Central Range Safari',
        slug: 'central-range-safari',
        category: 'wildlife',
        description: 'The Central Range is the most popular safari zone inside Kaziranga and offers high chances of spotting rhinos and other wildlife.',
        why_visit: [
          'Excellent wildlife sightings',
          'Ideal for jeep safaris',
          'Birdwatching opportunities',
          'Scenic floodplain landscapes',
        ],
        best_time: 'November – April (early morning)',
        image: '/images/assam/Kaziranga 1.jpg',
      },
      {
        name: 'Western Range',
        slug: 'western-range-kaziranga',
        category: 'wildlife',
        description: 'The Western Range is known for its dense rhino population and scenic wetlands.',
        why_visit: [
          'Less crowded safari experience',
          'Rich biodiversity and migratory birds',
          'Great for nature photography',
          'Beautiful sunrise safari routes',
        ],
        best_time: 'November – March',
        image: '/images/assam/assam-1.jpg',
      },
      {
        name: 'Orchid and Biodiversity Park',
        slug: 'orchid-biodiversity-park',
        category: 'nature',
        description: 'This cultural and ecological park near Kaziranga promotes Assamese heritage, local crafts, orchids, and folk traditions.',
        why_visit: [
          'Traditional Assamese dance and music',
          'Orchid conservation displays',
          'Local food and handicrafts',
          'Family-friendly cultural attraction',
        ],
        best_time: 'Year round',
        image: '/images/assam/assam-2.jpg',
      },
    ],
  },

  // ─── MAJULI ──────────────────────────────────────────────────────────────

  {
    name: 'Majuli',
    slug: 'majuli',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'World\'s Largest River Island',
    description: `Majuli is the world's largest inhabited river island, cradled in the Brahmaputra River and recognized as India's first island district. This tranquil, flat expanse of land carries a spiritual weight far beyond its geography — it is the heartland of neo-Vaishnavite culture in Assam, home to centuries-old satras (monastery-communes) that preserve classical Assamese dance, music, mask-making, and religious philosophy.\n\nFar from crowded, Majuli rewards slow travelers: cycling through golden paddy fields, watching masked dance performances at dusk, and drifting on the Brahmaputra as the sun melts into the horizon. The island also hosts migratory birds between November and February.`,
    best_time: 'October – March',
    how_to_reach: 'Take a ferry from Jorhat (Nimatighat ferry ghat). Majuli is ~20 km by ferry.',
    featured_image: '/images/assam/assam-2.jpg',
    hero_images: [
      { src: '/images/assam/assam-2.jpg', label: 'Majuli Island', location: 'Assam' },
      { src: '/images/assam/assam-1.jpg', label: 'Brahmaputra River', location: 'Majuli' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Oct – Mar' },
      { label: 'Known For', value: 'Satras, river island, mask-making' },
      { label: 'Nearest Town', value: 'Jorhat' },
      { label: 'Access', value: 'Ferry from Nimatighat, Jorhat' },
    ],
    places: [
      {
        name: 'Auniati Satra',
        slug: 'auniati-satra',
        category: 'heritage',
        description: 'Auniati Satra is one of the oldest Vaishnavite monasteries in Majuli, established during the Ahom era. It preserves Assamese religious traditions, classical dance, and spiritual teachings.',
        why_visit: [
          'Experience traditional Assamese spirituality',
          'Historic monastery architecture',
          'Cultural performances and rituals',
          'Important center of neo-Vaishnavite culture',
        ],
        best_time: 'October – March',
        image: '/images/assam/assam-2.jpg',
      },
      {
        name: 'Samaguri Satra',
        slug: 'samaguri-satra',
        category: 'heritage',
        description: 'Samaguri Satra is famous for traditional Assamese mask-making art used in religious performances and storytelling.',
        why_visit: [
          'Witness handmade traditional mask creation',
          'Learn about Assamese folk theatre',
          'Cultural interaction with local artisans',
          'Excellent for heritage photography',
        ],
        best_time: 'Year round',
        image: '/images/assam/assam-1.jpg',
      },
      {
        name: 'Majuli Villages',
        slug: 'majuli-villages',
        category: 'heritage',
        description: 'The villages of Majuli reflect the island\'s peaceful rural lifestyle and tribal heritage.',
        why_visit: [
          'Authentic village tourism experience',
          'Cycling through scenic countryside',
          'Tribal culture and local cuisine',
          'Ideal for slow travel and photography',
        ],
        best_time: 'October – February',
        image: '/images/assam/assam-2.jpg',
      },
      {
        name: 'Brahmaputra Sunset Points',
        slug: 'brahmaputra-sunset-majuli',
        category: 'viewpoint',
        description: 'Majuli offers some of the most scenic sunset views over the Brahmaputra River.',
        why_visit: [
          'Peaceful natural atmosphere',
          'Stunning sunset photography',
          'Riverside relaxation',
          'Unique river island experience',
        ],
        best_time: 'October – March',
        image: '/images/assam/assam-3.jpg',
      },
    ],
  },

  // ─── POBITORA ────────────────────────────────────────────────────────────────

  {
    name: 'Pobitora',
    slug: 'pobitora',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'The Mini Kaziranga – Rhinos at Every Turn',
    description: `Pobitora Wildlife Sanctuary is one of Assam's best-kept secrets — a compact, ecologically rich reserve that shelters the highest density of one-horned rhinoceroses anywhere in the world. Located just 50 km from Guwahati, it makes for an effortless weekend wildlife escape without the crowds of Kaziranga.\n\nBeyond its star attraction, Pobitora's sprawling wetlands are a birdwatcher's paradise, drawing migratory species from Central and East Asia between November and February. The sanctuary borders the mysterious village of Mayong, adding a layer of folklore and cultural curiosity to any visit.\n\nJeep and elephant safaris through Pobitora's grasslands offer intimate wildlife encounters — rhinos grazing just meters away, wild pigs rustling in the reeds, and herons standing sentinel above seasonal pools. For travelers on a short schedule or those who want wildlife without the long drive, Pobitora is one of Assam's most rewarding destinations.`,
    best_time: 'November – March',
    how_to_reach: 'Approximately 50 km from Guwahati via NH27 (Morigaon route). Taxis and shared vehicles available from Guwahati. Nearest railway station is Morigaon (~20 km from sanctuary).',
    featured_image: '/images/assam/Pobitora 1.jpg',
    hero_images: [
      { src: '/images/assam/Pobitora 1.jpg', label: 'Pobitora Wildlife Sanctuary', location: 'Assam' },
      { src: '/images/assam/Pobitora 2.jpg', label: 'One-Horned Rhinoceros', location: 'Pobitora' },
      { src: '/images/assam/Pobitora 3.jpg', label: 'Wetland Ecosystem', location: 'Pobitora' },
      { src: '/images/assam/Pobitora 4.jpg', label: 'Safari at Dawn', location: 'Pobitora' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Nov – Mar' },
      { label: 'Known For', value: 'Highest rhino density, migratory birds' },
      { label: 'Distance from Guwahati', value: '~50 km (1–1.5 hrs)' },
      { label: 'Safari Types', value: 'Jeep Safari, Elephant Safari' },
    ],
    places: [
      {
        name: 'Pobitora Wildlife Sanctuary',
        slug: 'pobitora-wildlife-sanctuary',
        category: 'wildlife',
        description: 'Pobitora is famous for having one of the highest densities of one-horned rhinoceroses in India. The sanctuary covers floodplain grasslands and wetlands along the Brahmaputra, supporting rhinos, wild boars, leopards, and numerous bird species.',
        why_visit: [
          'Easy rhino sightings with the highest density in the world',
          'Short wildlife getaway from Guwahati (under 2 hours)',
          'Jeep and elephant safaris through open grasslands',
          'Rich birdwatching destination with migratory species',
        ],
        best_time: 'November – March',
        image: '/images/assam/Pobitora 1.jpg',
      },
      {
        name: 'Wetland Birding Areas',
        slug: 'pobitora-wetland-birding',
        category: 'nature',
        description: 'The wetlands around Pobitora attract spectacular migratory birds during winter months, including bar-headed geese, various duck species, and wading birds that transform the sanctuary into a birding paradise.',
        why_visit: [
          'World-class birdwatching with 375+ recorded species',
          'Migratory waterfowl from Central and East Asia',
          'Scenic wetland and grassland landscapes',
          'Peaceful eco-tourism away from crowds',
        ],
        best_time: 'November – February (peak migration)',
        image: '/images/assam/Pobitora 2.jpg',
      },
      {
        name: 'Mayong Village',
        slug: 'mayong-village-pobitora',
        category: 'heritage',
        description: 'Located close to Pobitora, Mayong is known as the "Land of Black Magic" — a village steeped in folklore, ancient healing traditions, and mystical legends that have fascinated anthropologists and travelers alike.',
        why_visit: [
          'Explore unique Assamese folklore and local legends',
          'Cultural and historical curiosity rarely seen elsewhere',
          'Traditional healing arts and ancient manuscripts',
          'Offbeat village experience near a major wildlife sanctuary',
        ],
        best_time: 'October – March',
        image: '/images/assam/Mayong 1.jpg',
      },
      {
        name: 'Pobitora Jungle Safari',
        slug: 'pobitora-jungle-safari',
        category: 'adventure',
        description: 'Early morning jeep safaris and elephant rides through Pobitora offer some of the most accessible and intimate wildlife encounters in Assam — rhinos, leopards, wild pigs, and migratory birds all within a compact circuit.',
        why_visit: [
          'Dawn safaris with near-guaranteed rhino sightings',
          'Elephant-back rides for a unique wildlife perspective',
          'Affordable and accessible compared to Kaziranga',
          'Compact sanctuary — ideal for a half-day or full-day excursion',
        ],
        best_time: 'November – March (early morning safaris)',
        image: '/images/assam/Pobitora 3.jpg',
      },
    ],
  },

  // ─── MANAS ───────────────────────────────────────────────────────────────────

  {
    name: 'Manas',
    slug: 'manas',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'UNESCO Wilderness at the Foot of the Himalayas',
    description: `Manas National Park is one of India's most spectacular wilderness destinations — a UNESCO World Heritage Site and Project Tiger reserve that straddles the foothills of the Bhutan Himalayas. The park protects a remarkable concentration of rare and endangered species: tigers, Asian elephants, pygmy hogs, golden langurs, hispid hares, and wild water buffaloes roam through dense forests and tall riverine grasslands.\n\nThe Manas River, crystal-clear and swift-moving, divides the Indian park from the Royal Manas National Park in Bhutan, creating a transboundary biodiversity hotspot unlike any other in South Asia. Unlike the more frequented Kaziranga, Manas offers a genuine sense of wilderness — vast, untamed, and deeply immersive.\n\nVisitors can explore the park through jeep safaris, elephant rides, and guided nature walks in the Bansbari range, the main tourism zone. The park's relative remoteness and low footfall make every wildlife sighting feel truly earned — and unforgettable.`,
    best_time: 'November – April (park closed May – October)',
    how_to_reach: 'Nearest airport: Bongaigaon (~100 km) or Guwahati (~175 km via road). The park headquarters at Bansbari is accessible via road from Barpeta Road railway station (~40 km).',
    featured_image: '/images/assam/Manas 1.jpg',
    hero_images: [
      { src: '/images/assam/Manas 1.jpg', label: 'Manas National Park', location: 'Assam' },
      { src: '/images/assam/Manas 2.jpg', label: 'Manas River', location: 'Manas' },
      { src: '/images/assam/Manas 3.jpg', label: 'Himalayan Foothills', location: 'Manas' },
      { src: '/images/assam/Manas 4.jpg', label: 'Wildlife Safari', location: 'Manas' },
      { src: '/images/assam/Manas 5.jpg', label: 'Bansbari Range', location: 'Manas' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Nov – Apr' },
      { label: 'Known For', value: 'UNESCO WHS, tigers, golden langurs' },
      { label: 'Nearest Railway', value: 'Barpeta Road (~40 km)' },
      { label: 'Park Status', value: 'UNESCO World Heritage Site & Tiger Reserve' },
    ],
    places: [
      {
        name: 'Manas National Park',
        slug: 'manas-national-park',
        category: 'wildlife',
        description: 'Manas is a UNESCO World Heritage Site and tiger reserve located near the Bhutan border. Its rich biodiversity — tigers, elephants, pygmy hogs, golden langurs — and pristine Himalayan foothill landscapes make it one of India\'s finest wildlife destinations.',
        why_visit: [
          'Rich wildlife biodiversity with rare endemic species',
          'Tiger reserve and elephant habitat in pristine wilderness',
          'Scenic Himalayan foothill landscapes and forest drives',
          'UNESCO World Heritage Site with low tourist footfall',
        ],
        best_time: 'November – April',
        image: '/images/assam/Manas 1.jpg',
      },
      {
        name: 'Manas River',
        slug: 'manas-river',
        category: 'nature',
        description: 'The Manas River flows crystal-clear through the park, forming the natural border with Bhutan. It supports river-based eco-tourism and creates stunning landscape backdrops for wildlife photography and guided nature walks.',
        why_visit: [
          'River rafting and water-based eco-tourism opportunities',
          'Scenic natural landscapes at the India-Bhutan border',
          'Excellent birdwatching along the riverbanks',
          'Peaceful forest environment with pristine water',
        ],
        best_time: 'November – March',
        image: '/images/assam/Manas 2.jpg',
      },
      {
        name: 'Bansbari Range',
        slug: 'bansbari-range',
        category: 'wildlife',
        description: 'Bansbari serves as the main tourism zone inside Manas National Park, offering the best-organized safari access, eco-tourism lodges, and wildlife encounter opportunities in the park.',
        why_visit: [
          'Main wildlife safari zone with organized jeep routes',
          'Eco-tourism lodges and premium nature stays',
          'Excellent jungle landscapes with elephant herds',
          'Gateway for elephant safaris and guided forest treks',
        ],
        best_time: 'November – April (early morning safaris)',
        image: '/images/assam/Manas 3.jpg',
      },
      {
        name: 'Golden Langur Trail',
        slug: 'golden-langur-trail',
        category: 'adventure',
        description: 'Manas is one of the few places in India where you can spot the rare golden langur — an endangered primate endemic to the Assam-Bhutan border zone — in its natural forest habitat.',
        why_visit: [
          'Rare chance to spot the endangered golden langur',
          'One of very few wild habitats for this endemic species',
          'Guided nature walks through diverse forest zones',
          'Superb primate and bird photography opportunities',
        ],
        best_time: 'November – March',
        image: '/images/assam/Manas 4.jpg',
      },
    ],
  },

  // ─── SIBSAGAR ────────────────────────────────────────────────────────────

  {
    name: 'Sibsagar',
    slug: 'sibsagar',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'Ancient Capital of the Ahom Kingdom',
    description: `Sibsagar was the ceremonial capital of the mighty Ahom Kingdom, which ruled Assam for nearly 600 years and famously repelled seventeen Mughal invasions. Today, the city is an open-air museum of Ahom history — ancient temples, royal tanks, amphitheaters, and palace ruins dot the landscape, offering one of the richest heritage experiences in Northeast India.\n\nRang Ghar, Asia's oldest amphitheater, and Talatal Ghar, a multi-storied palace with labyrinthine underground tunnels, are the crown jewels of a remarkable royal legacy that still feels alive in the town's streets and festivals.`,
    best_time: 'October – March',
    how_to_reach: 'Nearest airport: Jorhat (JRH, ~60 km). Well-connected by road from Guwahati (~360 km).',
    featured_image: '/images/assam/Sibsagar 1.jpg',
    hero_images: [
      { src: '/images/assam/Sibsagar 1.jpg', label: 'Sibsagar', location: 'Assam' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Oct – Mar' },
      { label: 'Known For', value: 'Ahom Kingdom heritage, Rang Ghar' },
      { label: 'Nearest Airport', value: 'Jorhat (JRH)' },
    ],
    places: [
      {
        name: 'Rang Ghar',
        slug: 'rang-ghar',
        category: 'heritage',
        description: 'Rang Ghar is one of Asia\'s oldest amphitheaters built during the Ahom Kingdom for royal entertainment and cultural events.',
        why_visit: [
          'Historic Ahom architecture',
          'Important Assamese heritage monument',
          'Unique royal amphitheater structure',
          'Great historical photography destination',
        ],
        best_time: 'October – March',
        image: '/images/assam/Sibsagar 1.jpg',
      },
      {
        name: 'Talatal Ghar',
        slug: 'talatal-ghar',
        category: 'heritage',
        description: 'Talatal Ghar was a royal palace and military base of the Ahom rulers featuring underground tunnels and strategic architecture.',
        why_visit: [
          'Explore ancient royal architecture',
          'Historical significance of the Ahom dynasty',
          'Unique underground passages',
          'Educational heritage tourism',
        ],
        best_time: 'October – March',
        image: '/images/assam/assam-1.jpg',
      },
      {
        name: 'Sibsagar Tank',
        slug: 'sibsagar-tank',
        category: 'heritage',
        description: 'The historic man-made water tank built during the Ahom era remains a major landmark of the city.',
        why_visit: [
          'Historical and architectural significance',
          'Peaceful city attraction',
          'Surrounded by temples and monuments',
          'Cultural importance in Assamese history',
        ],
        best_time: 'Year round',
        image: '/images/assam/assam-2.jpg',
      },
    ],
  },

  // ─── MAYONG ──────────────────────────────────────────────────────────────────

  {
    name: 'Mayong',
    slug: 'mayong',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'The Land of Black Magic & Ancient Mysteries',
    description: `Mayong is one of the most enigmatic and fascinating villages in Northeast India — a place where the boundaries between folklore, history, and mysticism blur into something genuinely unique. Located on the southern bank of the Brahmaputra, just 40 km from Guwahati, Mayong has been associated with the practice of black magic (locally called "bej") for centuries, earning it the evocative title "Land of Black Magic."\n\nAncient manuscripts preserved in the Mayong Central Museum document obscure tantric rituals, herbal healing practices, and incantations that were once used by the village's sorcerers. Local legend speaks of practitioners who could turn humans into animals, make themselves invisible, and cure ailments beyond the reach of conventional medicine.\n\nBeyond its mystical reputation, Mayong sits beside the lush wetlands of Pobitora Wildlife Sanctuary, offering a rich double itinerary of wildlife and cultural exploration. Traditional Assamese villages, riverine landscapes, and an atmosphere of quiet rural beauty make Mayong one of Assam's most memorable offbeat destinations.`,
    best_time: 'October – March',
    how_to_reach: 'Approximately 40 km from Guwahati via NH27 (Morigaon direction). Easily combined with a Pobitora Wildlife Sanctuary visit. Taxis and shared vehicles run regularly from Guwahati.',
    featured_image: '/images/assam/Mayong 1.jpg',
    hero_images: [
      { src: '/images/assam/Mayong 1.jpg', label: 'Mayong Village', location: 'Assam' },
      { src: '/images/assam/Mayong 2.jpg', label: 'Land of Black Magic', location: 'Mayong' },
      { src: '/images/assam/Mayong 3.jpg', label: 'Brahmaputra Riverscape', location: 'Mayong' },
      { src: '/images/assam/Mayong 4.jpg', label: 'Traditional Village Life', location: 'Mayong' },
      { src: '/images/assam/Mayong 5.jpg', label: 'Mayong Museum', location: 'Mayong' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Oct – Mar' },
      { label: 'Known For', value: 'Black magic folklore, ancient manuscripts' },
      { label: 'Distance from Guwahati', value: '~40 km (1 hr)' },
      { label: 'Nearby', value: 'Pobitora Wildlife Sanctuary' },
    ],
    places: [
      {
        name: 'Mayong Central Museum',
        slug: 'mayong-central-museum',
        category: 'museum',
        description: 'The Mayong Central Museum preserves ancient manuscripts, folklore records, and historical artifacts connected to Mayong\'s mystical traditions. It offers a rare and scholarly window into the tantric and healing practices that define the village\'s identity.',
        why_visit: [
          'Learn about local legends, folklore and black magic traditions',
          'Rare ancient manuscripts and tantric artifacts on display',
          'Cultural storytelling experience unlike anywhere in India',
          'Unique tourism concept — a museum dedicated to mysticism',
        ],
        best_time: 'Year round',
        image: '/images/assam/Mayong 1.jpg',
      },
      {
        name: 'Traditional Villages of Mayong',
        slug: 'traditional-villages-mayong',
        category: 'heritage',
        description: 'The surrounding villages of Mayong showcase authentic rural Assamese culture — traditional bamboo houses, local weaving, ancient healing practices, and a way of life largely unchanged over generations.',
        why_visit: [
          'Authentic Assamese countryside experience',
          'Warm traditional hospitality from local families',
          'Scenic rural photography amid bamboo groves and paddy fields',
          'Peaceful atmosphere far from mainstream tourism',
        ],
        best_time: 'October – February',
        image: '/images/assam/Mayong 2.jpg',
      },
      {
        name: 'Brahmaputra Riverside',
        slug: 'mayong-brahmaputra-riverside',
        category: 'nature',
        description: 'Mayong sits on the southern banks of the Brahmaputra, offering serene riverside views, morning mist over the floodplains, and easy access to the wetland ecosystems that border Pobitora Wildlife Sanctuary.',
        why_visit: [
          'Scenic Brahmaputra riverbank walks and photography',
          'Floodplain wetlands with migratory bird sightings',
          'Golden sunrise views over the river',
          'Combine with Pobitora for a wildlife + culture day trip',
        ],
        best_time: 'November – February',
        image: '/images/assam/Mayong 3.jpg',
      },
      {
        name: 'Mayong Bej Tradition',
        slug: 'mayong-bej-tradition',
        category: 'heritage',
        description: 'The "bej" tradition — local healers and practitioners of ancient folk medicine — remains alive in Mayong. Visitors can meet local practitioners and learn about medicinal plants, healing rituals, and the oral traditions passed down through generations.',
        why_visit: [
          'Meet local "bej" healers and hear oral traditions first-hand',
          'Learn about traditional plant-based medicine and rituals',
          'One of India\'s most offbeat cultural experiences',
          'Great for documentary photography and cultural journalism',
        ],
        best_time: 'October – March',
        image: '/images/assam/Mayong 4.jpg',
      },
    ],
  },

  // ─── ORANG NATIONAL PARK ─────────────────────────────────────────────────────

  {
    name: 'Orang National Park',
    slug: 'orang-national-park',
    state: 'Assam',
    state_slug: 'assam',
    tagline: 'Mini Kaziranga on the Northern Bank of the Brahmaputra',
    description: `Orang National Park — affectionately called "Mini Kaziranga" — is one of Assam's most rewarding and least-crowded wildlife destinations. Spread across the northern bank of the Brahmaputra River in Darrang and Sonitpur districts, the park protects one-horned rhinoceroses, tigers, wild elephants, and a staggering diversity of wetland birds within its compact 78 sq km boundary.\n\nUnlike the more famous Kaziranga, Orang offers an experience of genuine solitude — early morning safaris through tall elephant grass and along riverine channels where rhinos wade and fish eagles circle overhead. The park's rich wetland ecosystems support over 200 species of birds, making it a premier birdwatching destination in Northeast India.\n\nThe Brahmaputra forms the park's southern boundary, and the interplay of water, grassland, and forest creates constantly shifting wildlife habitats. For travelers who want world-class wildlife in an unhurried, intimate setting — Orang is one of Assam's finest secrets.`,
    best_time: 'November – April (park closed during monsoon)',
    how_to_reach: 'Nearest town: Tezpur (~100 km) or Mangaldoi (~30 km). Accessible by road from Guwahati (~140 km via NH15). Nearest railway stations: Rangiya or Dekargaon.',
    featured_image: '/images/assam/Orang 1.jpg',
    hero_images: [
      { src: '/images/assam/Orang 1.jpg', label: 'Orang National Park', location: 'Assam' },
      { src: '/images/assam/Orang 2.jpg', label: 'Wetland Ecosystems', location: 'Orang' },
      { src: '/images/assam/Orang 3.jpg', label: 'Brahmaputra Riverine Grasslands', location: 'Orang' },
    ],
    quick_facts: [
      { label: 'State', value: 'Assam' },
      { label: 'Best Time', value: 'Nov – Apr' },
      { label: 'Known For', value: 'Rhinos, tigers, wetland birds' },
      { label: 'Nearest Town', value: 'Mangaldoi (~30 km)' },
      { label: 'Area', value: '78 sq km (Tiger Reserve)' },
    ],
    places: [
      {
        name: 'Orang National Park',
        slug: 'orang-national-park-safari',
        category: 'wildlife',
        description: 'Often called the "Mini Kaziranga," Orang National Park is known for rhinos, tigers, wetlands, and rich biodiversity — with far fewer crowds than its more famous neighbour. The park\'s compact size makes wildlife sightings reliable and safaris intimate.',
        why_visit: [
          'Rhino and tiger safaris in a less-crowded national park',
          'One of Assam\'s best-kept wildlife secrets',
          'Rich biodiversity across grasslands, wetlands, and forest',
          'Scenic Brahmaputra riverine landscape backdrops',
        ],
        best_time: 'November – April',
        image: '/images/assam/Orang 1.jpg',
      },
      {
        name: 'Wetland Ecosystems',
        slug: 'orang-wetland-ecosystems',
        category: 'nature',
        description: 'The park\'s extensive wetland habitats support migratory waterfowl, resident wading birds, river dolphins, and aquatic wildlife — creating one of the finest freshwater biodiversity zones in Northeast India.',
        why_visit: [
          'Over 200 bird species including rare migratory waterfowl',
          'Ganges river dolphin sightings in Brahmaputra channels',
          'Excellent nature photography in pristine wetland settings',
          'Peaceful eco-tourism with minimal tourist footfall',
        ],
        best_time: 'November – February (peak bird migration)',
        image: '/images/assam/Orang 2.jpg',
      },
      {
        name: 'Brahmaputra Safari Circuit',
        slug: 'orang-brahmaputra-safari',
        category: 'adventure',
        description: 'Jeep safaris along the Brahmaputra\'s northern bank offer a rare perspective — grasslands meeting the great river, with rhinos grazing at the water\'s edge and elephants crossing between sand bars during the dry season.',
        why_visit: [
          'Unique riverside wildlife safari experience',
          'Rhinos, elephants and buffalo at the Brahmaputra banks',
          'Stunning golden-hour light for wildlife photography',
          'Uncrowded routes through open riverine grasslands',
        ],
        best_time: 'December – March (low water, grassland access)',
        image: '/images/assam/Orang 3.jpg',
      },
      {
        name: 'Birdwatching at Orang',
        slug: 'orang-birdwatching',
        category: 'nature',
        description: 'Orang is one of Assam\'s finest birdwatching destinations, with resident species including the Bengal florican, lesser adjutant stork, and Pallas\'s fish eagle — alongside winter migrants from Central and East Asia.',
        why_visit: [
          'Spot the endangered Bengal florican in its natural habitat',
          'Lesser adjutant stork breeding colony within the park',
          'Winter migrants add spectacular seasonal variety',
          'Quiet, undisturbed birding far from crowded sanctuaries',
        ],
        best_time: 'November – February',
        image: '/images/assam/Orang 1.jpg',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ARUNACHAL PRADESH
  // ════════════════════════════════════════════════════════════════════════════

  // ─── TAWANG ──────────────────────────────────────────────────────────────────

  {
    name: 'Tawang',
    slug: 'tawang',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'Where the Himalayas Touch the Sky',
    description: `Tawang is one of the most extraordinary destinations in all of India — a high-altitude Himalayan town perched at 10,000 feet, cradled between snow-covered peaks and deep river valleys on the border with Bhutan and Tibet. Home to the largest Buddhist monastery in India and the second largest in the world, Tawang carries a weight of spiritual and cultural significance that sets it apart from every other destination in the Northeast.\n\nThe journey to Tawang is itself an adventure — the dramatic Sela Pass at 13,700 ft, frozen in winter and draped in alpine flowers in spring, is one of the most scenic mountain crossings in India. Once there, the sight of the ancient Tawang Monastery rising against snow peaks, prayer flags snapping in the Himalayan wind, and monks in crimson robes going about their timeless routines is genuinely awe-inspiring.\n\nBeyond the monastery, Tawang offers Madhuri Lake's ethereal mountain scenery, the moving 1962 War Memorial, ancient gompas tucked into hillside villages, and a cultural landscape shaped entirely by Tibetan Buddhist traditions. For those who reach it, Tawang is unforgettable.`,
    best_time: 'March – October (Sela Pass may close Nov – Feb)',
    how_to_reach: 'Nearest airport: Tezpur (TEZ, ~320 km) or Guwahati (~450 km). Drive via Bhalukpong → Bomdila → Sela Pass → Tawang (12–15 hrs). Inner Line Permit (ILP) required for non-Arunachal residents.',
    featured_image: '/images/arunachal-pradesh/tawang.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/tawang.jpg', label: 'Tawang Monastery', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/tawang 2.jpg', label: 'Himalayan Panorama', location: 'Tawang' },
      { src: '/images/arunachal-pradesh/tawang3.jpg', label: 'Tawang Valley', location: 'Tawang' },
      { src: '/images/arunachal-pradesh/tawang4.jpg', label: 'Buddhist Heritage', location: 'Tawang' },
      { src: '/images/arunachal-pradesh/tawang5.jpg', label: 'Snow Mountains', location: 'Tawang' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Mar – Oct' },
      { label: 'Altitude', value: '~10,000 ft (3,048 m)' },
      { label: 'Known For', value: 'Largest monastery in India, Sela Pass' },
      { label: 'Permit Required', value: 'Inner Line Permit (ILP)' },
    ],
    places: [
      {
        name: 'Tawang Monastery',
        slug: 'tawang-monastery',
        category: 'heritage',
        description: 'Tawang Monastery is the largest monastery in India and one of the most important Buddhist monasteries in the world. Established in the 17th century by Merak Lama Lodre Gyatso, it remains a major center of Tibetan Buddhist learning and culture in the Eastern Himalayas.',
        why_visit: [
          'Largest monastery in India — a truly awe-inspiring complex',
          'Important Buddhist spiritual center with ancient prayer halls',
          'Sweeping Himalayan mountain views from the monastery grounds',
          'Rich Tibetan Buddhist culture, thangkas, and centuries-old traditions',
        ],
        best_time: 'March – October',
        image: '/images/arunachal-pradesh/tawang.jpg',
      },
      {
        name: 'Tawang War Memorial',
        slug: 'tawang-war-memorial',
        category: 'heritage',
        description: 'The Tawang War Memorial honors Indian soldiers who lost their lives during the 1962 Indo-China War. Set on a scenic hilltop, it offers light and sound presentations and a moving tribute to the bravery of the Indian Army in defending this remote Himalayan frontier.',
        why_visit: [
          'Powerful historical and patriotic significance',
          'Scenic hilltop location with valley views',
          'Evening light and sound show about the 1962 war',
          'Deep insight into Arunachal\'s strategic military history',
        ],
        best_time: 'March – October',
        image: '/images/arunachal-pradesh/tawang 2.jpg',
      },
      {
        name: 'Madhuri Lake',
        slug: 'madhuri-lake',
        category: 'lake',
        description: 'Also known as Sangestar Lake, this high-altitude alpine lake is surrounded by barren snow-dusted mountains and ghost forests of submerged tree trunks — formed after an earthquake reshaped the terrain. Its surreal, otherworldly beauty immortalized it in Bollywood.',
        why_visit: [
          'Stunning high-altitude alpine scenery unlike anywhere in India',
          'Snow-covered landscapes and frozen lake in winter months',
          'One of the finest high-altitude photography destinations in Northeast India',
          'Peaceful mountain environment with minimal crowds',
        ],
        best_time: 'April – October',
        image: '/images/arunachal-pradesh/tawang3.jpg',
      },
      {
        name: 'Sela Pass',
        slug: 'sela-pass-tawang',
        category: 'viewpoint',
        description: 'The gateway to Tawang, Sela Pass sits at 13,700 ft and is one of the highest motorable passes in India. A glacial lake nestles beside the road, flanked by prayer flags and a small temple — and views in every direction that can stop you cold.',
        why_visit: [
          'Dramatic high-altitude Himalayan mountain crossing',
          'Sacred alpine lake at 13,700 ft elevation',
          'Snow-covered landscapes and prayer flag-lined roadways',
          'Essential stop on one of India\'s most scenic mountain drives',
        ],
        best_time: 'March – October (may close in heavy snowfall)',
        image: '/images/arunachal-pradesh/tawang4.jpg',
      },
    ],
  },

  // ─── ZIRO VALLEY ─────────────────────────────────────────────────────────────

  {
    name: 'Ziro Valley',
    slug: 'ziro-valley',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'Paddy Fields, Pine Forests & the Soul of the Apatani',
    description: `Ziro Valley is one of the most beautiful and culturally rich destinations in the entire Northeast — a broad, flat plateau rimmed by pine-covered hills, laced with rice fields, and home to the Apatani tribal community whose sustainable agricultural traditions and cultural practices have earned a UNESCO World Heritage nomination.\n\nThe Apatani people have cultivated these valley floors for centuries using techniques so sophisticated they continue to astound agricultural scientists. Their villages, with traditionally carved wooden homes and distinctive cultural markers, offer some of the most authentic tribal experiences available to travelers in India today.\n\nZiro is also famous for the Ziro Music Festival, held annually in September — one of India's most beloved outdoor music events, drawing independent artists and fans to camp under pine trees and stars. Whether you come for culture, nature, music, or simply to slow down in one of India's most serene landscapes, Ziro Valley never disappoints.`,
    best_time: 'September – November, March – May',
    how_to_reach: 'Nearest airport: Lilabari (IXI, ~100 km) or Guwahati (~400 km). Drive via North Lakhimpur. Inner Line Permit (ILP) required. Itanagar (~115 km) is the nearest major town.',
    featured_image: '/images/arunachal-pradesh/ziro1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/ziro1.jpg', label: 'Ziro Valley', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/ziro2.jpg', label: 'Apatani Rice Fields', location: 'Ziro Valley' },
      { src: '/images/arunachal-pradesh/ziro3.jpg', label: 'Pine Forested Hills', location: 'Ziro Valley' },
      { src: '/images/arunachal-pradesh/ziro4.jpg', label: 'Apatani Village', location: 'Ziro Valley' },
      { src: '/images/arunachal-pradesh/ziro5.jpg', label: 'Ziro Music Festival', location: 'Ziro Valley' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Sep – Nov, Mar – May' },
      { label: 'Altitude', value: '~5,800 ft (1,770 m)' },
      { label: 'Known For', value: 'Apatani tribe, Ziro Music Festival' },
      { label: 'Permit Required', value: 'Inner Line Permit (ILP)' },
    ],
    places: [
      {
        name: 'Apatani Villages',
        slug: 'apatani-villages',
        category: 'heritage',
        description: 'The villages of the Apatani tribe are living museums of indigenous culture — with traditional wooden homes, intricate community rituals, distinctive cultural markers, and a sustainable wet rice cultivation system developed over generations that is nominated for UNESCO World Heritage status.',
        why_visit: [
          'Experience one of Northeast India\'s most distinctive indigenous cultures',
          'Traditional village architecture and community lifestyle',
          'Rare anthropological and cultural tourism experience',
          'Scenic agricultural landscapes of paddy and pine',
        ],
        best_time: 'September – November',
        image: '/images/arunachal-pradesh/ziro1.jpg',
      },
      {
        name: 'Ziro Paddy Fields',
        slug: 'ziro-paddy-fields',
        category: 'nature',
        description: 'The valley\'s rice fields are among the most scenic agricultural landscapes in Northeast India — flat terraces of green and gold stretching from village edges to pine-forested hillsides, reflecting the Apatani\'s internationally recognized sustainable farming system.',
        why_visit: [
          'Breathtaking green valley landscapes in a flat highland setting',
          'Outstanding nature and travel photography destination',
          'Peaceful countryside atmosphere far from tourist crowds',
          'Eco-cultural travel in a UNESCO-nominated heritage landscape',
        ],
        best_time: 'July – October (harvest season)',
        image: '/images/arunachal-pradesh/ziro2.jpg',
      },
      {
        name: 'Ziro Music Festival',
        slug: 'ziro-music-festival',
        category: 'festival',
        description: 'Held annually in September, the Ziro Music Festival is one of India\'s most beloved and atmospheric outdoor music events — set in a natural amphitheatre of rice fields and pine hills, drawing independent musicians and a passionate community of music lovers.',
        why_visit: [
          'One of India\'s finest outdoor music and arts festivals',
          'Unique mountain festival atmosphere with camping under stars',
          'Celebrates independent Indian music and cultural exchange',
          'Combines music tourism with extraordinary natural scenery',
        ],
        best_time: 'September (festival week)',
        image: '/images/arunachal-pradesh/ziro3.jpg',
      },
      {
        name: 'Talley Valley Wildlife Sanctuary',
        slug: 'talley-valley-sanctuary',
        category: 'wildlife',
        description: 'Adjacent to Ziro, Talley Valley Wildlife Sanctuary is a pristine subtropical forest sanctuary home to clouded leopards, red pandas, and a rich diversity of birds — offering trekking and eco-tourism in near-complete wilderness.',
        why_visit: [
          'Pristine subtropical forest with rare wildlife',
          'Red panda and clouded leopard habitat',
          'Excellent birdwatching and forest trekking',
          'Unspoilt eco-tourism in an undiscovered sanctuary',
        ],
        best_time: 'October – April',
        image: '/images/arunachal-pradesh/ziro4.jpg',
      },
    ],
  },

  // ─── BOMDILA & DIRANG ────────────────────────────────────────────────────────

  {
    name: 'Bomdila & Dirang',
    slug: 'bomdila',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'Monasteries, Hot Springs & the Road to Tawang',
    description: `Bomdila and Dirang are twin Himalayan destinations on the classic Tawang circuit — and while most travelers pass through en route to Tawang, those who pause discover destinations rich in their own right. Bomdila, the district headquarters of West Kameng, sits at 8,500 ft and offers panoramic views of the snow-capped Eastern Himalayas, Buddhist monasteries, and a small-town Monpa culture that feels genuinely unhurried.\n\nDirang, nestled in a river valley just below Bomdila, is even more charming — a village of stone-walled homes, apple and kiwi orchards, yak farms, and natural hot springs where you can soak away the chill of the mountain air. The Dirang Dzong, a compact ancient fortification, adds a layer of medieval character to the riverside scene.\n\nTogether, Bomdila and Dirang form one of the most complete mountain travel experiences in Northeast India — combining Buddhist culture, scenic driving, natural wellness, local food, and a pace of life that feels truly far from the world.`,
    best_time: 'March – June, September – November',
    how_to_reach: 'Accessible by road from Tezpur (~180 km to Bomdila via NH13). On the main Tezpur–Tawang highway. Inner Line Permit (ILP) required.',
    featured_image: '/images/arunachal-pradesh/bomdila&dirang.1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/bomdila&dirang.1.jpg', label: 'Bomdila Monastery', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/bomdila&dirang.2.jpg', label: 'Dirang Valley', location: 'Bomdila & Dirang' },
      { src: '/images/arunachal-pradesh/bomdila&dirang.3.jpg', label: 'Mountain Landscapes', location: 'Bomdila' },
      { src: '/images/arunachal-pradesh/bomdila&dirang.4.jpg', label: 'Traditional Monpa Village', location: 'Dirang' },
      { src: '/images/arunachal-pradesh/bomdila&dirang.5.jpg', label: 'Eastern Himalayan Views', location: 'Bomdila' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Mar – Jun, Sep – Nov' },
      { label: 'Altitude', value: 'Bomdila ~8,500 ft | Dirang ~5,500 ft' },
      { label: 'Known For', value: 'Monasteries, hot springs, Tawang route' },
      { label: 'Permit Required', value: 'Inner Line Permit (ILP)' },
    ],
    places: [
      {
        name: 'Bomdila Monastery',
        slug: 'bomdila-monastery',
        category: 'heritage',
        description: 'Bomdila Monastery reflects the rich Tibetan Buddhist culture of the Monpa people and offers sweeping panoramic views of the Eastern Himalayan ranges. The monastery complex includes prayer halls, thangka paintings, and a peaceful atmosphere of mountain spirituality.',
        why_visit: [
          'Peaceful Buddhist monastery atmosphere at 8,500 ft',
          'Panoramic Himalayan mountain views from the monastery grounds',
          'Rich Monpa Buddhist cultural experience',
          'Scenic hill station environment with cool mountain climate',
        ],
        best_time: 'March – June, September – November',
        image: '/images/arunachal-pradesh/bomdila&dirang.1.jpg',
      },
      {
        name: 'Dirang Valley',
        slug: 'dirang-valley',
        category: 'nature',
        description: 'Dirang is one of Arunachal\'s most charming valley destinations — a lush river valley known for apple orchards, yak farms, traditional stone-walled homes, and a gentle pace of life that contrasts beautifully with the dramatic passes above.',
        why_visit: [
          'Scenic mountain river valley with apple and kiwi orchards',
          'Yak farms and traditional Monpa cultural landscape',
          'Riverside relaxation, photography, and nature walks',
          'Pleasant climate and authentic mountain village atmosphere',
        ],
        best_time: 'March – November',
        image: '/images/arunachal-pradesh/bomdila&dirang.2.jpg',
      },
      {
        name: 'Dirang Hot Water Springs',
        slug: 'dirang-hot-springs',
        category: 'nature',
        description: 'Natural geothermal hot springs near Dirang offer a uniquely relaxing mountain wellness experience. Long used by local communities for therapeutic benefits, the springs are a perfect way to unwind after a long mountain drive.',
        why_visit: [
          'Natural geothermal hot springs in a mountain setting',
          'Therapeutic soak after long Himalayan road journeys',
          'Scenic surroundings of river valley and hills',
          'Unique natural wellness attraction in Arunachal Pradesh',
        ],
        best_time: 'October – March (cooler months enhance the experience)',
        image: '/images/arunachal-pradesh/bomdila&dirang.3.jpg',
      },
      {
        name: 'Sangti Valley',
        slug: 'sangti-valley',
        category: 'nature',
        description: 'Just beyond Dirang, Sangti Valley is a hidden gem known for its black-necked crane sightings in winter, apple orchards, and serene mountain meadows — one of the most picturesque and uncrowded corners of West Kameng district.',
        why_visit: [
          'Rare black-necked crane sightings during winter migration',
          'Pristine mountain valley with minimal tourist footfall',
          'Apple orchard walks and scenic meadow landscapes',
          'Ideal extension for nature lovers visiting Bomdila-Dirang',
        ],
        best_time: 'November – February (cranes), March – May (orchards)',
        image: '/images/arunachal-pradesh/bomdila&dirang.4.jpg',
      },
    ],
  },

  // ─── MECHUKA ─────────────────────────────────────────────────────────────────

  {
    name: 'Mechuka',
    slug: 'mechuka',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'The Last Valley Before Tibet',
    description: `Mechuka is one of the most remote and hauntingly beautiful valleys in all of India — a hidden world deep in the West Siang district of Arunachal Pradesh, just 29 km from the Line of Actual Control with China. At 6,000 ft, surrounded by peaks reaching above 20,000 ft, Mechuka remains one of the last truly wild, untouched destinations in the entire subcontinent.\n\nThe valley follows the Siyom River through dense forests and open meadows, past ancient Buddhist monasteries perched on hillsides and traditional Adi and Memba tribal villages where life continues much as it has for centuries. The road journey here is extraordinary in itself — days of mountain driving through passes, river crossings, and landscapes that feel entirely removed from the modern world.\n\nFor adventure travelers, photographers, and those who seek genuine discovery, Mechuka offers something increasingly rare: a place that still feels found rather than visited.`,
    best_time: 'October – May (road may close June – September)',
    how_to_reach: 'Drive from Along (Aalo) ~180 km via rough mountain roads (~8–10 hrs). Aalo is connected to Pasighat and Dibrugarh. Inner Line Permit (ILP) required. A small airstrip exists at Mechuka for occasional flights.',
    featured_image: '/images/arunachal-pradesh/mechuka1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/mechuka1.jpg', label: 'Mechuka Valley', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/mechuka2.jpg', label: 'Siyom River', location: 'Mechuka' },
      { src: '/images/arunachal-pradesh/mechuka4.jpg', label: 'Himalayan Peaks', location: 'Mechuka' },
      { src: '/images/arunachal-pradesh/mechuka5.jpg', label: 'Memba Village', location: 'Mechuka' },
      { src: '/images/arunachal-pradesh/mechuka7.jpg', label: 'Monastery Hilltop', location: 'Mechuka' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Oct – May' },
      { label: 'Altitude', value: '~6,000 ft (1,830 m)' },
      { label: 'Known For', value: 'Remote Himalayan valley, Tibet border' },
      { label: 'Permit Required', value: 'Inner Line Permit (ILP) + Protected Area Permit' },
    ],
    places: [
      {
        name: 'Mechuka Valley',
        slug: 'mechuka-valley',
        category: 'nature',
        description: 'Mechuka Valley is one of Arunachal Pradesh\'s most remote and scenic destinations — a broad glacial valley at 6,000 ft near the Tibet border, surrounded by snow peaks, dense forests, and traditional tribal communities that have had little contact with the outside world.',
        why_visit: [
          'One of India\'s most remote and unspoilt Himalayan valleys',
          'Snow-covered mountain peaks in a genuinely wild setting',
          'Peaceful offbeat tourism with authentic community interactions',
          'Adventure and road trip destination for serious explorers',
        ],
        best_time: 'October – May',
        image: '/images/arunachal-pradesh/mechuka1.jpg',
      },
      {
        name: 'Samten Yongcha Monastery',
        slug: 'samten-yongcha-monastery',
        category: 'heritage',
        description: 'This ancient hilltop monastery overlooks the entire Mechuka Valley and reflects centuries of Buddhist spiritual traditions among the Memba community. Its position against snow peaks creates one of the most dramatic monastery views in Arunachal Pradesh.',
        why_visit: [
          'Dramatic hilltop monastery with panoramic valley views',
          'Ancient Buddhist spiritual and cultural center',
          'Traditional Memba Buddhist architecture and prayer halls',
          'Excellent photography from monastery vantage points',
        ],
        best_time: 'October – May',
        image: '/images/arunachal-pradesh/mechuka4.jpg',
      },
      {
        name: 'Siyom River',
        slug: 'siyom-river',
        category: 'adventure',
        description: 'The Siyom River flows through Mechuka in a series of clear, fast-moving channels through forests and meadows. It supports river camping, nature photography, and future adventure tourism potential in one of the most pristine river corridors in the Eastern Himalayas.',
        why_visit: [
          'Pristine glacial river in a near-untouched mountain setting',
          'Riverside camping with mountain peak backdrops',
          'Excellent nature photography and landscape exploration',
          'Adventure tourism potential in a rarely visited valley',
        ],
        best_time: 'October – April',
        image: '/images/arunachal-pradesh/mechuka2.jpg',
      },
      {
        name: 'Mechuka Local Villages',
        slug: 'mechuka-villages',
        category: 'heritage',
        description: 'The Adi and Memba tribal villages of the Mechuka area offer extraordinarily authentic cultural encounters — traditional wooden homes, local festivals, handwoven textiles, and community life largely unchanged by modern tourism.',
        why_visit: [
          'Genuine tribal cultural immersion in a remote valley',
          'Traditional Adi and Memba architecture and community life',
          'Handwoven fabrics and local crafts directly from artisans',
          'Photography that captures a world rarely seen by outsiders',
        ],
        best_time: 'October – May',
        image: '/images/arunachal-pradesh/mechuka5.jpg',
      },
    ],
  },

  // ─── NAMDAPHA ────────────────────────────────────────────────────────────────

  {
    name: 'Namdapha',
    slug: 'namdapha',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'India\'s Richest Biodiversity Zone in the Eastern Himalayas',
    description: `Namdapha National Park is one of the largest and most biodiverse protected areas in India — a vast, largely unmapped wilderness spanning 1,985 sq km in the Changlang district of eastern Arunachal Pradesh, bordering Myanmar. It is the only park in the world to shelter four species of big cats: tigers, leopards, clouded leopards, and snow leopards all within a single protected zone.\n\nThe park encompasses an extraordinary range of ecosystems — from tropical lowland rainforest to alpine meadows above 4,500 m — supporting over 1,000 plant species, 425 bird species, hoolock gibbons, red pandas, Asian elephants, and the critically endangered Namdapha flying squirrel, found nowhere else on Earth.\n\nFor serious naturalists, wildlife researchers, and wilderness trekkers, Namdapha is one of the most compelling destinations in all of Asia. It is remote, demanding, and almost entirely free of tourist infrastructure — which is precisely why those who reach it rarely forget it.`,
    best_time: 'October – April',
    how_to_reach: 'Fly to Dibrugarh (DIB, Assam) then drive ~180 km to Miao (park entrance). Miao is the base town. Inner Line Permit (ILP) required.',
    featured_image: '/images/arunachal-pradesh/namdapha1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/namdapha1.jpg', label: 'Namdapha National Park', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/namdapha2.jpg', label: 'Eastern Himalayan Forests', location: 'Namdapha' },
      { src: '/images/arunachal-pradesh/namdapha3.jpg', label: 'Noa-Dihing River', location: 'Namdapha' },
      { src: '/images/arunachal-pradesh/namdapha4.jpg', label: 'Wilderness Trekking', location: 'Namdapha' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Oct – Apr' },
      { label: 'Area', value: '1,985 sq km' },
      { label: 'Known For', value: 'Four big cat species, hoolock gibbons' },
      { label: 'Permit Required', value: 'ILP + Forest Department permit' },
    ],
    places: [
      {
        name: 'Namdapha National Park',
        slug: 'namdapha-national-park',
        category: 'wildlife',
        description: 'One of India\'s largest and most biodiverse national parks — the only protected area in the world harboring four big cat species. Namdapha\'s extraordinary range from tropical forest to alpine zone supports exceptional wildlife density and rare endemics.',
        why_visit: [
          'Only place in the world with four big cat species in one park',
          'Dense tropical and Himalayan forest spanning 2,000 sq km',
          'Rare wildlife including hoolock gibbons and red pandas',
          'One of India\'s richest and least-explored biodiversity zones',
        ],
        best_time: 'November – April',
        image: '/images/arunachal-pradesh/namdapha1.jpg',
      },
      {
        name: 'Forest Trekking Routes',
        slug: 'namdapha-trekking',
        category: 'adventure',
        description: 'Namdapha\'s remote trekking trails pass through ancient rainforest, across river crossings, and into valleys where wildlife tracks are the only signs of life. These trails connect tribal settlements and offer multi-day wilderness experiences of extraordinary intensity.',
        why_visit: [
          'Wilderness trekking through virtually untouched Eastern Himalayan forest',
          'Multi-day routes with genuine remote camping experiences',
          'Birdwatching — 425 species including rare Himalayan endemics',
          'Remote Himalayan exploration far from any tourist circuit',
        ],
        best_time: 'November – March',
        image: '/images/arunachal-pradesh/namdapha2.jpg',
      },
      {
        name: 'Noa-Dihing River',
        slug: 'noa-dihing-river',
        category: 'nature',
        description: 'The Noa-Dihing River runs through the heart of Namdapha, forming the lifeline of the park\'s ecosystem. Its clear mountain waters support river dolphins, fish eagles, and riverside wildlife that comes to drink at dawn and dusk.',
        why_visit: [
          'River ecosystem teeming with wildlife along forest banks',
          'Crocodile, river dolphin and fish eagle sightings',
          'Stunning forest river photography opportunities',
          'Natural corridor for wildlife movement through the park',
        ],
        best_time: 'November – March',
        image: '/images/arunachal-pradesh/namdapha3.jpg',
      },
      {
        name: 'Miao Village & Tribal Culture',
        slug: 'miao-tribal-culture',
        category: 'heritage',
        description: 'Miao, the gateway town to Namdapha, is home to the Chakma and Lisu tribal communities. Their traditional houses, handlooms, cultural festivals, and close relationship with the forest offer a meaningful cultural dimension to a Namdapha visit.',
        why_visit: [
          'Meet the Chakma and Lisu communities at the forest edge',
          'Traditional handloom weaving and forest craft traditions',
          'Cultural immersion before entering the wilderness',
          'Insight into indigenous forest communities of eastern Arunachal',
        ],
        best_time: 'October – April',
        image: '/images/arunachal-pradesh/namdapha4.jpg',
      },
    ],
  },

  // ─── PAKKE & EAGLENEST ───────────────────────────────────────────────────────

  {
    name: 'Pakke & Eaglenest',
    slug: 'pakke-eaglenest',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'A Birdwatcher\'s Paradise in the Eastern Himalayan Foothills',
    description: `Pakke Tiger Reserve and Eaglenest Wildlife Sanctuary are two of India's premier wildlife and birdwatching destinations, tucked into the Himalayan foothills of western Arunachal Pradesh. Together they protect an extraordinary expanse of subtropical and temperate forest that harbors over 500 bird species — including the globally endangered rufous-necked hornbill and numerous Himalayan specialties found nowhere else in India.\n\nPakke is particularly celebrated for its hornbill conservation program — a pioneering community initiative that has helped restore wild nesting sites through nest boxes and local guardian programs. Birdwatchers travel from across the world to witness the extraordinary variety of forest birds along Pakke's trails.\n\nEaglenest, rising sharply from the foothills to alpine zones, gained global birding fame after a scientific expedition in the early 2000s discovered multiple bird species new to science. Today it remains one of Asia's top birdwatching destinations — a place where dedicated birders plan visits years in advance.`,
    best_time: 'November – April',
    how_to_reach: 'Pakke: Drive from Tezpur (~90 km) via Balipara. Eaglenest: Drive from Bhalukpong (~60 km) to West Kameng forest area. Inner Line Permit (ILP) required for Eaglenest.',
    featured_image: '/images/arunachal-pradesh/Pakke & Eaglenest 1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/Pakke & Eaglenest 1.jpg', label: 'Pakke Tiger Reserve', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/Pakke & Eaglenest 2.jpg', label: 'Eaglenest Wildlife Sanctuary', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/Pakke & Eaglenest 3.jpg', label: 'Hornbill Forest', location: 'Pakke' },
      { src: '/images/arunachal-pradesh/Pakke & Eaglenest 4.jpg', label: 'Eastern Himalayan Birds', location: 'Eaglenest' },
      { src: '/images/arunachal-pradesh/Pakke & Eaglenest 5.jpg', label: 'Forest Wildlife', location: 'Pakke' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Nov – Apr' },
      { label: 'Known For', value: '500+ bird species, hornbill conservation' },
      { label: 'Access', value: 'Tezpur (Pakke), Bhalukpong (Eaglenest)' },
      { label: 'Permit Required', value: 'ILP required for Eaglenest' },
    ],
    places: [
      {
        name: 'Pakke Tiger Reserve',
        slug: 'pakke-tiger-reserve',
        category: 'wildlife',
        description: 'Pakke is known for dense subtropical forests, hornbill conservation, and rich biodiversity. Its pioneering community-based hornbill nest box program has become a global model for wildlife conservation involving tribal communities.',
        why_visit: [
          'Wildlife safaris through dense subtropical forest',
          'World-class hornbill conservation and sighting opportunities',
          'Over 300 bird species in the reserve\'s forest zones',
          'Community-based eco-tourism with tribal Nyishi guides',
        ],
        best_time: 'November – April',
        image: '/images/arunachal-pradesh/Pakke & Eaglenest 1.jpg',
      },
      {
        name: 'Eaglenest Wildlife Sanctuary',
        slug: 'eaglenest-wildlife-sanctuary',
        category: 'wildlife',
        description: 'Eaglenest is internationally famous among birdwatchers and wildlife researchers. Multiple bird species new to science were discovered here in the early 2000s. Today it hosts over 500 species including rare Himalayan specialties.',
        why_visit: [
          'One of Asia\'s top birdwatching destinations — 500+ species',
          'Site of landmark new bird species discoveries',
          'Rare Himalayan species including bugun liocichla',
          'Scenic forest and mountain environments at multiple altitudes',
        ],
        best_time: 'November – March',
        image: '/images/arunachal-pradesh/Pakke & Eaglenest 2.jpg',
      },
      {
        name: 'Hornbill Nest Trail',
        slug: 'hornbill-nest-trail',
        category: 'adventure',
        description: 'Guided trail walks through Pakke\'s forest to watch hornbills — the great hornbill, wreathed hornbill, and Oriental pied hornbill — nesting and flying through the canopy. One of the most extraordinary bird experiences in the subcontinent.',
        why_visit: [
          'Watch multiple hornbill species nesting in natural tree cavities',
          'Learn about pioneering community hornbill conservation',
          'Guided forest walks with expert tribal naturalists',
          'Exceptional wildlife photography in natural forest light',
        ],
        best_time: 'February – May (nesting season)',
        image: '/images/arunachal-pradesh/Pakke & Eaglenest 3.jpg',
      },
      {
        name: 'Forest Birding Trails',
        slug: 'eaglenest-birding-trails',
        category: 'adventure',
        description: 'Eaglenest\'s network of forest trails through dense subtropical and montane forest offers exceptional birding at multiple altitude zones — from lowland species at the foothills to high-altitude Himalayan specialties at the sanctuary\'s upper reaches.',
        why_visit: [
          'Multi-altitude forest trails accessing different bird communities',
          'Chance of spotting endemic and newly discovered species',
          'Pristine forest atmosphere with superb natural acoustics for birding',
          'Ideal for serious birders and wildlife photographers',
        ],
        best_time: 'November – April',
        image: '/images/arunachal-pradesh/Pakke & Eaglenest 4.jpg',
      },
    ],
  },

  // ─── SELA PASS & BUMLA PASS ──────────────────────────────────────────────────

  {
    name: 'Sela Pass & Bumla',
    slug: 'sela-pass',
    state: 'Arunachal Pradesh',
    state_slug: 'arunachal-pradesh',
    tagline: 'High Himalayan Road Journeys on the Roof of Arunachal',
    description: `Sela Pass and Bumla Pass represent two of the most dramatic high-altitude road experiences in India — both accessible from Tawang, both carrying immense strategic and historical weight, and both offering landscape experiences that leave travelers speechless.\n\nSela Pass, at 13,700 ft, is one of the highest motorable passes in the world and the principal gateway between Assam's foothills and the Tawang valley. A small sacred lake sits beside the road, surrounded by prayer flags and mountain silence. In winter, the pass turns white and treacherous; in spring, the ice melts to reveal alpine grasslands and wildflowers. Regardless of season, the views are extraordinary.\n\nBumla Pass, at 15,200 ft on the India-China border, is open to Indian tourists with special permits on select days. The LAC here is a place of rare quiet — Indian and Chinese soldiers sometimes exchange pleasantries at a designated meeting point — and the frozen Tibetan plateau stretching away to the north is unlike anything else in India.`,
    best_time: 'April – October (Sela), May – October (Bumla, weather permitting)',
    how_to_reach: 'Both passes are accessed from Tawang town. Sela Pass is on the main Tawang highway (~78 km from Tezpur side). Bumla is ~37 km from Tawang — requires special permits and is usually visited via guided day trips from Tawang. ILP required.',
    featured_image: '/images/arunachal-pradesh/Sela Pass & Bumla 1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/Sela Pass & Bumla 1.jpg', label: 'Sela Pass', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/Sela Pass & Bumla 2.jpg', label: 'Alpine Lake at Sela', location: 'Sela Pass' },
      { src: '/images/arunachal-pradesh/Sela Pass & Bumla 3.jpg', label: 'Bumla Pass Border', location: 'Bumla' },
      { src: '/images/arunachal-pradesh/Sela Pass & Bumla 4.jpg', label: 'Snow Mountains', location: 'Sela Pass' },
      { src: '/images/arunachal-pradesh/Sela Pass & Bumla 5.jpg', label: 'Himalayan Road Journey', location: 'Arunachal Pradesh' },
    ],
    quick_facts: [
      { label: 'State', value: 'Arunachal Pradesh' },
      { label: 'Best Time', value: 'Apr – Oct (Sela), May – Oct (Bumla)' },
      { label: 'Altitude', value: 'Sela: 13,700 ft | Bumla: 15,200 ft' },
      { label: 'Known For', value: 'High-altitude passes, 1962 war history' },
      { label: 'Permit Required', value: 'ILP + special permit for Bumla (Indians only)' },
    ],
    places: [
      {
        name: 'Sela Pass',
        slug: 'sela-pass-main',
        category: 'viewpoint',
        description: 'One of the highest motorable passes in India at 13,700 ft, Sela Pass is the dramatic Himalayan gateway between Assam and Tawang. A sacred lake sits beside the road, prayer flags snap in the wind, and snow peaks rise in every direction.',
        why_visit: [
          'Snow-covered Himalayan landscapes at 13,700 ft elevation',
          'Sacred glacial lake and prayer flag-lined mountain pass',
          'Essential stop on India\'s most scenic mountain road journey',
          'Winter tourism destination with dramatic ice and snowscapes',
        ],
        best_time: 'April – October (open year-round but snowy Nov–Mar)',
        image: '/images/arunachal-pradesh/Sela Pass & Bumla 1.jpg',
      },
      {
        name: 'Sela Lake',
        slug: 'sela-lake',
        category: 'lake',
        description: 'The glacial Sela Lake sits beside the pass at extreme altitude, its still waters reflecting snow peaks when weather allows. Flanked by prayer flags and a small temple, it is one of the most serene and spiritual natural sites on the entire Tawang route.',
        why_visit: [
          'Pristine glacial alpine lake at 13,700 ft',
          'Sacred site with small temple and prayer flags',
          'Extraordinary high-altitude landscape photography',
          'One of the most peaceful and spiritual spots in Arunachal',
        ],
        best_time: 'May – September (lake accessible and unfrozen)',
        image: '/images/arunachal-pradesh/Sela Pass & Bumla 2.jpg',
      },
      {
        name: 'Bumla Pass',
        slug: 'bumla-pass',
        category: 'heritage',
        description: 'Bumla Pass at 15,200 ft on the India-China border is one of India\'s most extraordinary border tourism destinations. Played a key role in the 1962 war, Bumla is open to Indian tourists with special permits and offers rare views into the Tibetan plateau.',
        why_visit: [
          'Stand on the India-China border at 15,200 ft elevation',
          'Dramatic high-altitude Tibetan plateau views',
          'Deep historical significance from the 1962 Indo-China war',
          'One of India\'s most exclusive and memorable border experiences',
        ],
        best_time: 'May – October (weather and permit permitting)',
        image: '/images/arunachal-pradesh/Sela Pass & Bumla 3.jpg',
      },
      {
        name: 'Nuranang Falls',
        slug: 'nuranang-falls',
        category: 'waterfall',
        description: 'Nuranang Falls (also called Bong Bong Falls or Jung Falls) is a stunning multi-tiered waterfall on the Tawang highway between Bomdila and Tawang. Visible from the road and accessible on foot, it is one of the most photogenic waterfalls in the Eastern Himalayas.',
        why_visit: [
          'Spectacular multi-tiered waterfall on the Tawang highway',
          'Easily accessible stop on the classic Assam–Tawang mountain drive',
          'One of the most photographed cascades in Northeast India',
          'Refreshing natural stop surrounded by mountain forest',
        ],
        best_time: 'April – October',
        image: '/images/arunachal-pradesh/Sela Pass & Bumla 4.jpg',
      },
    ],
  },

];

export function getCityData(slug: string): CityStaticData | undefined {
  return CITY_DATA.find(c => c.slug === slug);
}

export function getCitiesByState(stateSlug: string): CityStaticData[] {
  return CITY_DATA.filter(c => c.state_slug === stateSlug);
}

export default CITY_DATA;
