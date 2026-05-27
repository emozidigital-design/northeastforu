/**
 * Curated Image Map for NorthEastForU
 *
 * All images are sourced from Unsplash (free, high-quality).
 * Each image is hand-picked for relevance to the destination.
 * Format: https://images.unsplash.com/photo-{ID}?auto=format&fit=crop&w=800&q=80
 */

export const STATE_IMAGES: Record<string, string> = {
    assam: '/images/assam/assam-1.jpg',
    'arunachal-pradesh': '/images/arunachal-pradesh/arunachal-pradesh-1.jpg',
    meghalaya: '/images/meghalaya/meghalaya-1.jpg',
    manipur: '/images/manipur/manipur-1.jpg',
    mizoram: '/images/mizoram/mizoram-1.jpg',
    nagaland: '/images/nagaland/nagaland-1.jpg',
    tripura: '/images/tripura/tripura-1.jpg',
    sikkim: '/images/sikkim/sikkim-1.jpg',
    'west-bengal':
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85',
};

// City-level curated images
export const CITY_IMAGES: Record<string, string> = {
    guwahati:
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=85',
    // Kamakhya Temple view over Brahmaputra
    shillong:
        'https://images.unsplash.com/photo-1611116524846-3c89e8b75594?auto=format&fit=crop&w=800&q=85',
    // Shillong: Ward's Lake
    gangtok:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=85',
    // Gangtok: cloudy mountain monastery
    kohima:
        'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=800&q=85',
    aizawl:
        'https://images.unsplash.com/photo-1596422846543-75c6fc18a5cf?auto=format&fit=crop&w=800&q=85',
    imphal:
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85',
    agartala:
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=85',
    tawang:
        'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=85',
    // Tawang: famous monastery
    cherrapunji:
        'https://images.unsplash.com/photo-1627915509748-0ca979147551?auto=format&fit=crop&w=800&q=85',
    'ziro-valley': '/images/ziro-valley.png',
    bomdila: '/images/bomdila.png',
    dirang: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=85',
    itanagar: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=85',
    pasighat: 'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=85',
    dawki: 'https://images.unsplash.com/photo-1588614461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=85',
    majuli: 'https://images.unsplash.com/photo-1544735716-392fe2486ffe?auto=format&fit=crop&w=800&q=85',
};

// Attraction-level curated images
export const ATTRACTION_IMAGES: Record<string, string> = {
    'kaziranga-national-park': '/images/kaziranga.png',
    // One-horned rhino in the wild
    'living-root-bridges':
        'https://images.unsplash.com/photo-1553789966-7fdc34a9ada0?auto=format&fit=crop&w=800&q=85',
    // Living root bridge
    'double-decker-root-bridge': '/images/double-decker-root-bridge.png',
    'mawlynnong-village':
        'https://images.unsplash.com/photo-1627915509748-0ca979147551?auto=format&fit=crop&w=800&q=85',
    'tawang-monastery':
        'https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=85',
    'loktak-lake':
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=85',
    'kamakhya-temple':
        'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=85',
    'hornbill-festival': '/images/hornbill-festival.png',
    'dawki-river': 'https://images.unsplash.com/photo-1588614461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=85',
};

// Hero slideshow: One stunning showcase for every state
export const HERO_SLIDES = [
    {
        src: '/images/assam/assam-3.jpg',
        label: 'Majestic Brahmaputra River Valley',
        location: 'Assam',
    },
    {
        src: '/images/meghalaya/meghalaya-1.jpg',
        label: 'Ancient Living Root Bridges',
        location: 'Meghalaya',
    },
    {
        src: '/images/arunachal-pradesh/arunachal-pradesh-1.jpg',
        label: 'Spectacular Sela Pass',
        location: 'Arunachal Pradesh',
    },
    {
        src: '/images/nagaland/nagaland-1.jpg',
        label: 'Vibrant Hornbill & Naga Heritage',
        location: 'Nagaland',
    },
    {
        src: '/images/sikkim/sikkim-1.jpg',
        label: 'Sacred Glacial Lakes & Peaks',
        location: 'Sikkim',
    },
    {
        src: '/images/manipur/manipur-1.jpg',
        label: 'Unique Floating Loktak Lake',
        location: 'Manipur',
    },
    {
        src: '/images/mizoram/mizoram-1.jpg',
        label: 'Misty Blue Mountains & Vistas',
        location: 'Mizoram',
    },
    {
        src: '/images/tripura/tripura-1.jpg',
        label: 'The Royal Ujjayanta Palace',
        location: 'Tripura',
    },
];

/**
 * Get best image for a given slug + type, falling back gracefully.
 */
export function getCuratedImage(
    slug: string,
    type: 'state' | 'city' | 'attraction' = 'state'
): string | undefined {
    const normalised = slug?.toLowerCase().replace(/\s+/g, '-') || '';
    if (type === 'state') return STATE_IMAGES[normalised];
    if (type === 'city') return CITY_IMAGES[normalised];
    if (type === 'attraction') return ATTRACTION_IMAGES[normalised];
}
