export interface StaticBlog {
    id: number;
    slug: string;
    title: string;
    content: string;
    author: string;
    category: string;
    featured_image: string;
    published_at: string;
    updated_at: string;
    status: 'published';
    seo_title?: string;
    seo_description?: string;
    excerpt?: string;
}

export const STATIC_BLOGS: StaticBlog[] = [
    {
        id: 1,
        slug: 'kaziranga-national-park-complete-guide',
        title: 'Kaziranga National Park: The Complete Visitor\'s Guide',
        category: 'Wildlife',
        author: 'NorthEastForU Team',
        published_at: '2026-01-15T00:00:00Z',
        updated_at: '2026-01-15T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1200&q=80',
        seo_title: 'Kaziranga National Park Guide 2026 | NorthEastForU',
        seo_description: 'Everything you need to know about visiting Kaziranga National Park — best time, safari tips, rhino spotting, and where to stay.',
        excerpt: 'Home to two-thirds of the world\'s one-horned rhinoceroses, Kaziranga is one of India\'s greatest wildlife success stories.',
        content: `Home to two-thirds of the world's one-horned rhinoceroses, Kaziranga is one of India's greatest wildlife success stories. Spread across 430 sq km of grasslands and forests along the Brahmaputra river in Assam, this UNESCO World Heritage Site is unmissable for any nature lover.

## Best Time to Visit

The park is open from November to April. The ideal window is **February to April** when animals cluster near water and visibility through the tall elephant grass is at its best. The park closes during monsoon (May–October) due to annual flooding from the Brahmaputra.

## Safaris

Kaziranga offers two types of safaris: **jeep safaris** and **elephant safaris**. Jeep safaris cover the Central, Western, and Eastern ranges and are best done early morning (6:00–9:30 AM) or late afternoon (2:00–5:00 PM). Elephant safaris are limited to the Central range and are the closest you can get to a one-horned rhino on foot.

Booking safari slots in advance is strongly recommended during peak season (December–March). You can book through the official Assam Forest Department portal or your hotel.

## Wildlife to Spot

- **Indian One-Horned Rhinoceros** — over 2,600 individuals call Kaziranga home
- **Royal Bengal Tiger** — Kaziranga has one of the highest tiger densities in the world
- **Asian Elephant** — large herds roam the park year-round
- **Wild Water Buffalo** and **Swamp Deer**
- **Over 500 bird species** including the Grey Pelican and Bar-Headed Goose

## Where to Stay

The main entry points are **Kohora** (Central range) and **Bagori** (Western range). Options range from government-run forest lodges inside the buffer zone to premium eco-resorts like Diphlu River Lodge and Iora — The Retreat. Book well in advance during peak season.

## Getting There

- **Nearest airport**: Jorhat (97 km) or Guwahati (217 km)
- **Nearest railway station**: Furkating (75 km) or Jakhalabandha (25 km)
- Most visitors combine Kaziranga with a trip to Majuli island or Sivasagar.`,
    },
    {
        id: 2,
        slug: 'meghalaya-living-root-bridges-trekking-guide',
        title: 'Meghalaya\'s Living Root Bridges: The Complete Trekking Guide',
        category: 'Adventure',
        author: 'NorthEastForU Team',
        published_at: '2026-02-01T00:00:00Z',
        updated_at: '2026-02-01T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
        seo_title: 'Meghalaya Living Root Bridges Trek 2026 | NorthEastForU',
        seo_description: 'Complete guide to trekking to the living root bridges of Meghalaya — routes, difficulty, what to carry, and local stay options.',
        excerpt: 'The living root bridges of Meghalaya are biological marvels — living bridges trained over centuries from the aerial roots of rubber fig trees by the Khasi and Jaintia tribes.',
        content: `The living root bridges of Meghalaya are biological marvels — living bridges trained over centuries from the aerial roots of rubber fig trees by the Khasi and Jaintia tribes. Unlike man-made bridges, these actually grow stronger with age.

## The Double Decker Root Bridge

The most famous is the **Double Decker Root Bridge** near Nongriat village, about 12 km from Cherrapunjee (Sohra). This UNESCO-nominated structure consists of two bridges stacked on top of each other — a sight unlike anything else in the world.

### Trek Details
- **Trailhead**: Tyrna village (30 km from Cherrapunjee)
- **Distance**: ~3 km one way
- **Time**: 2–3 hours each way
- **Difficulty**: Moderate to Challenging (nearly 3,500 stone steps descent and return)
- **Best time**: October to May (avoid monsoon for safety)

## What to Carry

Pack light but smart:
- Sturdy trekking shoes with good grip (steps can be slippery)
- At least 2 litres of water (refill available in Nongriat)
- Energy snacks and a light lunch
- Rain poncho (weather can change quickly in the Meghalaya hills)
- Trekking pole if available

## Accommodation at Nongriat

Several basic guesthouses operate in Nongriat village, run by local Khasi families. The experience of spending a night in the jungle village, surrounded by waterfalls and fireflies, is worth every step of the descent. Book ahead in peak season (November–March).

## Other Root Bridges Worth Visiting

- **Umshiang Single Root Bridge** — easier trek, 45 minutes from Cherrapunjee
- **Mawlynnong Root Bridge** — next to Asia's Cleanest Village, very accessible
- **Riwai Root Bridge** — flat, paved path, great for families with children

## Getting There

Cherrapunjee (Sohra) is 55 km from Shillong (about 2 hours by road). Most visitors base themselves in Shillong and do a day trip or overnight stay in Cherrapunjee.`,
    },
    {
        id: 3,
        slug: 'hornbill-festival-nagaland-guide',
        title: 'Hornbill Festival Nagaland: Everything You Need to Know',
        category: 'Culture',
        author: 'NorthEastForU Team',
        published_at: '2026-02-20T00:00:00Z',
        updated_at: '2026-02-20T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80',
        seo_title: 'Hornbill Festival Nagaland 2026 | Complete Guide | NorthEastForU',
        seo_description: 'Plan your trip to the Hornbill Festival — dates, what to expect, where to stay in Kohima, and cultural highlights of this iconic Naga celebration.',
        excerpt: 'The Hornbill Festival is Nagaland\'s biggest cultural event — a 10-day extravaganza held every December that brings all 17 Naga tribes together in a single electric celebration.',
        content: `The Hornbill Festival is Nagaland's biggest cultural event — a 10-day extravaganza held every December that brings all 17 Naga tribes together in a single electric celebration. Named after the hornbill, a bird of great significance in Naga culture, it showcases traditional music, dance, food, sports, and crafts in a way no other festival in India can match.

## When and Where

- **Dates**: 1–10 December every year
- **Venue**: Naga Heritage Village, Kisama (12 km from Kohima)

## What to Expect

Each day, Naga warriors in full traditional regalia — feathered headdresses, tribal jewellery, woven shawls — perform their tribe's distinctive war dances and songs. Watching 17 different tribes perform in sequence is genuinely one of the most remarkable cultural spectacles in Asia.

Aside from performances, the festival grounds host:
- **Traditional Naga food stalls** — silkworm larvae, smoked pork, fermented bamboo shoot, hornbill beer
- **Crafts market** with handwoven shawls, bamboo products, and tribal jewellery
- **Indigenous games** including Naga wrestling and archery
- **Rock and music concerts** in the evenings (local and national artists)

## Permits

Nagaland requires an **Inner Line Permit (ILP)** for all visitors from outside the state. You can obtain it online via the Nagaland government portal or at the Nagaland House in Delhi, Kolkata, or Guwahati. Processing takes 24–48 hours. Keep physical copies on you at all times.

## Getting There

- **Dimapur** is the nearest airport and railway station (74 km from Kohima, ~3 hours by road)
- Flights connect Dimapur with Kolkata, Guwahati, and Delhi
- **Kohima** is the base city — most accommodation is here

## Where to Stay

Book **at least 3 months in advance** for festival dates. Hotels in Kohima fill up entirely. Popular options include Hotel Japfü, The Heritage Hotel, and several well-reviewed homestays via Airbnb. During the festival itself, the government also operates tented accommodation near Kisama.`,
    },
    {
        id: 4,
        slug: 'best-time-to-visit-northeast-india',
        title: 'Best Time to Visit Northeast India: A Month-by-Month Guide',
        category: 'Travel Tips',
        author: 'NorthEastForU Team',
        published_at: '2026-03-05T00:00:00Z',
        updated_at: '2026-03-05T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=1200&q=80',
        seo_title: 'Best Time to Visit Northeast India 2026 | Month-by-Month Guide',
        seo_description: 'When is the best time to visit Northeast India? A complete month-by-month breakdown covering weather, festivals, and which states to visit when.',
        excerpt: 'Northeast India is a year-round destination — but knowing when to go where makes the difference between a great trip and a life-changing one.',
        content: `Northeast India is a year-round destination — but knowing when to go where makes the difference between a great trip and a life-changing one. The region spans very different climates: Sikkim's alpine valleys, Meghalaya's perpetual rain belt, Assam's plains, and Nagaland's subtropical hills all behave quite differently through the year.

## Quick Summary

| Month | Best For | Avoid |
|-------|----------|-------|
| Oct–Nov | Sikkim, Nagaland, Assam | Heavy rain lingers in Meghalaya |
| Dec–Jan | All states (peak season), Hornbill Festival | Cold at altitude in Sikkim/Arunachal |
| Feb–Mar | Meghalaya, Mizoram, Manipur | — |
| Apr–May | Wildlife (Kaziranga), Orchid season | Heat on plains |
| Jun–Sep | Offseason — green landscapes, fewer tourists | Flooding, landslides common |

## Month-by-Month Breakdown

**October**: Post-monsoon freshness. Waterfalls are at their most dramatic. Excellent for photography. Living root bridges are lush. Kaziranga reopens after monsoon closure.

**November**: Arguably the best month overall. Clear skies, comfortable temperatures, Hornbill Festival preparations begin in Nagaland. Ziro Music Festival (Arunachal Pradesh) is held here.

**December**: Peak season. Hornbill Festival (1–10 Dec). Kangpokpi Festival in Manipur. Cold in the mountains but pleasant on plains. Book everything well in advance.

**January**: Bodo festivals in Assam. Clear Himalayan views in Sikkim and Arunachal. Light snowfall on higher passes.

**February–March**: Best time for Meghalaya and Mizoram — spring blooms, clear waterfalls. Orchids start blooming in Sikkim (March). Chapchar Kut festival in Mizoram (March).

**April–May**: Last chance before monsoon. Wildlife safaris at peak (animals gather near waterfalls). Losar (New Year) celebrations in Sikkim. Heat builds on Assam plains.

**June–September**: Monsoon season. Landscape turns impossibly green. Fewer tourists and lower prices. Landslides and flooding are genuine risks — check road conditions daily. Some areas (Cherrapunjee, Mawsynram) receive the world's highest rainfall during this period.

## State-Specific Tips

- **Arunachal Pradesh**: Tawang is best October–March; avoid monsoon for road trips entirely
- **Meghalaya**: Can be visited year-round but June–September has extreme rain (still beautiful)
- **Sikkim**: Avoid January–February for high passes (Nathula, Tsomgo); November–March for clear Kanchenjunga views
- **Assam**: November–April for wildlife; avoid summer (April–May) heat on plains`,
    },
    {
        id: 5,
        slug: 'sikkim-complete-travel-guide',
        title: 'Sikkim Complete Travel Guide: The Himalayan Kingdom',
        category: 'Destinations',
        author: 'NorthEastForU Team',
        published_at: '2026-03-20T00:00:00Z',
        updated_at: '2026-03-20T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
        seo_title: 'Sikkim Travel Guide 2026 | Gangtok, Lachung, Pelling | NorthEastForU',
        seo_description: 'Complete Sikkim travel guide — Gangtok, North Sikkim, Pelling, permits, best time, and how to get there.',
        excerpt: 'Sikkim is India\'s smallest state but possibly its most spectacular — a tiny Himalayan kingdom where Buddhist monasteries cling to cliffsides, snow peaks dominate every horizon, and the air is cleaner than anywhere else in the country.',
        content: `Sikkim is India's smallest state but possibly its most spectacular — a tiny Himalayan kingdom where Buddhist monasteries cling to cliffsides, snow peaks dominate every horizon, and the air is cleaner than anywhere else in the country. At its heart is Kangchenjunga, the world's third highest peak.

## Key Destinations

### Gangtok
The capital and entry point. A pleasant hill town with a good mix of restaurants, markets, and a well-maintained MG Road. Must-sees include Rumtek Monastery (the largest in Sikkim), Tsomgo Lake (12,400 ft), and the Nathula Pass if permits allow.

### North Sikkim (Lachung & Yumthang)
The star attraction of Sikkim. Lachung is the base town for the legendary **Yumthang Valley** (Valley of Flowers at 11,800 ft) and the further **Zero Point** at 15,100 ft. The road passes through some of the most dramatic Himalayan terrain you'll ever see.

### Pelling & West Sikkim
Home to **Rabdentse ruins** (the ancient capital), **Pemayangtse Monastery**, and the iconic **glass skywalk** with unobstructed Kangchenjunga views. Less crowded than Gangtok, quieter, and deeply atmospheric.

## Permits

All visitors need a **Protected Area Permit (PAP)** for North and East Sikkim. Indian nationals can get these on arrival at Rangpo (entry point from West Bengal) or in Gangtok. For Nathula Pass and international tourists, additional permits are needed — apply through a registered tour operator in Gangtok.

## Getting There

- **By air**: Pakyong Airport (30 km from Gangtok) has limited flights from Kolkata, Delhi, and Guwahati. Check availability — weather delays are common
- **By road**: Most visitors come via **New Jalpaiguri (NJP)** railway station or Bagdogra Airport in West Bengal, then take a shared taxi or private cab to Gangtok (4–5 hours)
- **By helicopter**: Pawan Hans operates a helicopter service between Bagdogra and Gangtok (weather permitting) — spectacular views

## Best Time to Visit

- **March–May**: Rhododendrons in bloom, clear mountain views, mild temperatures
- **October–December**: Crystal-clear skies, best Kangchenjunga views, comfortable weather
- **Avoid**: July–August (heavy monsoon, landslides common on all roads)

## How Long to Spend

Minimum 5 days: 2 in Gangtok, 2 in North Sikkim, 1 in Pelling. For a complete experience, allow 8–10 days.`,
    },
    {
        id: 6,
        slug: 'dawki-river-meghalaya-travel-guide',
        title: 'Dawki River: India\'s Most Transparent Water Experience',
        category: 'Destinations',
        author: 'NorthEastForU Team',
        published_at: '2026-04-01T00:00:00Z',
        updated_at: '2026-04-01T00:00:00Z',
        status: 'published',
        featured_image: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=1200&q=80',
        seo_title: 'Dawki River Meghalaya Guide 2026 | Crystal Clear Water | NorthEastForU',
        seo_description: 'Everything about visiting Dawki river in Meghalaya — boating, best time, how to get there, and what else to do nearby.',
        excerpt: 'Dawki\'s Umngot river is so transparent that boats appear to float in mid-air — a phenomenon that makes it one of the most photographed spots in all of Northeast India.',
        content: `Dawki's Umngot river is so transparent that boats appear to float in mid-air — a phenomenon that makes it one of the most photographed spots in all of Northeast India. Located in the Jaintia Hills district of Meghalaya, right on the Bangladesh border, Dawki is a short but spectacular detour from the typical Cherrapunjee circuit.

## The Umngot River

The Umngot flows from the Khasi Hills into Bangladesh at Dawki. During winter (November to March), the river runs crystal clear — visibility can reach 5–10 metres. Wooden boats with flat bottoms glide across the surface, appearing to hover in the air due to the optical illusion created by the transparent water.

**Photography tip**: Come early morning (before 9 AM) for calm water and the best light. Afternoons can get windy, rippling the surface.

## Boating

Boat rides are available from the main ghat. Prices are typically ₹300–500 per boat for 30–45 minutes (negotiate before boarding). The boats comfortably seat 3–4 people. Life jackets are provided.

## Best Time to Visit

- **November to March**: Peak clarity — this is when the iconic photographs are taken
- **April–May**: Still good but water levels begin to rise
- **June–October**: Monsoon raises the river significantly, turning it opaque brown — avoid for photography

## Getting There

- Dawki is 82 km from Shillong (~3 hours by road)
- The road passes through beautiful Khasi Hills scenery and the Syndai plateau
- Shared taxis from Shillong to Dawki take about 3.5 hours
- Most visitors combine it with a visit to Shnongpdeng (4 km away), Mawlynnong (Asia's Cleanest Village, 40 km), and Cherrapunjee on a 2–3 day Meghalaya road trip

## Nearby Attractions

- **Shnongpdeng**: 4 km from Dawki — similar clear water, with river camping, cliff jumping, and kayaking
- **Mawlynnong**: 40 km — Asia's Cleanest Village, living root bridge, and a treehouse with views into Bangladesh
- **Bophill Falls**: Seasonal waterfall just off the Dawki road

## Where to Stay

Accommodation in Dawki itself is limited (basic guesthouses). Most visitors stay in Shillong or Cherrapunjee and do Dawki as a day trip. For a more immersive experience, riverside camping at Shnongpdeng is exceptional.`,
    },
];

export function getBlogBySlug(slug: string): StaticBlog | null {
    return STATIC_BLOGS.find(b => b.slug === slug) || null;
}

export function getAllBlogs(): StaticBlog[] {
    return STATIC_BLOGS;
}
