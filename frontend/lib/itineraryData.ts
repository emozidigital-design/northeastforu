export interface StaticItinerary {
    id: number;
    slug: string;
    title: string;
    category: string;
    duration: string;
    price: number;
    description: string;
    featured_image: string;
    highlights: string;
}

export const STATIC_ITINERARIES: StaticItinerary[] = [
    {
        id: 1,
        slug: 'assam-meghalaya-classic-7-days',
        title: 'Classic Assam & Meghalaya',
        category: 'Nature',
        duration: '7 Days · 6 Nights',
        price: 35000,
        description: 'From one-horned rhinos at Kaziranga to living root bridges and crystal rivers — the definitive first-timer Northeast experience.',
        featured_image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
        highlights: 'Kaziranga Safari,Shillong,Cherrapunjee,Dawki River,Living Root Bridges',
    },
    {
        id: 2,
        slug: 'nagaland-manipur-cultural-trail-6-days',
        title: 'Nagaland & Manipur Cultural Trail',
        category: 'Cultural',
        duration: '6 Days · 5 Nights',
        price: 28000,
        description: 'Immerse yourself in the warrior cultures of Nagaland and the serene landscapes of Manipur — the most off-the-beaten-path Northeast itinerary.',
        featured_image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
        highlights: 'Kohima War Cemetery,Naga Village Stay,Loktak Lake,Keibul Lamjao,Ima Keithel',
    },
    {
        id: 3,
        slug: 'sikkim-himalayan-explorer-5-days',
        title: 'Sikkim Himalayan Explorer',
        category: 'Adventure',
        duration: '5 Days · 4 Nights',
        price: 32000,
        description: 'From Gangtok to the Valley of Flowers — an alpine journey through monasteries, snow peaks, and the world\'s third highest mountain.',
        featured_image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
        highlights: 'Gangtok,Tsomgo Lake,Yumthang Valley,Zero Point,Pemayangtse Monastery',
    },
    {
        id: 4,
        slug: 'northeast-grand-tour-14-days',
        title: 'Northeast Grand Tour',
        category: 'Luxury',
        duration: '14 Days · 13 Nights',
        price: 65000,
        description: 'The complete Northeast India experience — all 8 states, curated by experts, with premium stays and private transfers throughout.',
        featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        highlights: 'All 8 States,Kaziranga,Meghalaya Caves,Hornbill Culture,Sikkim,Tawang',
    },
    {
        id: 5,
        slug: 'arunachal-pradesh-adventure-8-days',
        title: 'Arunachal Pradesh: Land of the Rising Sun',
        category: 'Adventure',
        duration: '8 Days · 7 Nights',
        price: 42000,
        description: 'Drive through breathtaking mountain roads to Tawang, visit Sela Pass, and discover ancient monasteries at the roof of Northeast India.',
        featured_image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=800&q=80',
        highlights: 'Tawang Monastery,Sela Pass,Bum La Pass,Dirang,Bomdila',
    },
];

export function getItineraryBySlug(slug: string): StaticItinerary | null {
    return STATIC_ITINERARIES.find(i => i.slug === slug) || null;
}

export function getAllItineraries(): StaticItinerary[] {
    return STATIC_ITINERARIES;
}
