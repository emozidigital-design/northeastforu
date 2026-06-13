require('./lib/loadEnv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ITINERARIES = [
  {
    slug: 'assam-meghalaya-classic-7-days',
    title: 'Classic Assam & Meghalaya',
    category: 'Nature',
    duration_days: 7,
    price_estimate: 35000,
    description: 'From one-horned rhinos at Kaziranga to living root bridges and crystal rivers — the definitive first-timer Northeast experience.',
    featured_image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
    highlights: JSON.stringify(['Kaziranga Safari', 'Shillong', 'Cherrapunjee', 'Dawki River', 'Living Root Bridges']),
  },
  {
    slug: 'nagaland-manipur-cultural-trail-6-days',
    title: 'Nagaland & Manipur Cultural Trail',
    category: 'Cultural',
    duration_days: 6,
    price_estimate: 28000,
    description: 'Immerse yourself in the warrior cultures of Nagaland and the serene landscapes of Manipur — the most off-the-beaten-path Northeast itinerary.',
    featured_image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    highlights: JSON.stringify(['Kohima War Cemetery', 'Naga Village Stay', 'Loktak Lake', 'Keibul Lamjao', 'Ima Keithel']),
  },
  {
    slug: 'sikkim-himalayan-explorer-5-days',
    title: 'Sikkim Himalayan Explorer',
    category: 'Adventure',
    duration_days: 5,
    price_estimate: 32000,
    description: 'From Gangtok to the Valley of Flowers — an alpine journey through monasteries, snow peaks, and the world\'s third highest mountain.',
    featured_image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    highlights: JSON.stringify(['Gangtok', 'Tsomgo Lake', 'Yumthang Valley', 'Zero Point', 'Pemayangtse Monastery']),
  },
  {
    slug: 'northeast-grand-tour-14-days',
    title: 'Northeast Grand Tour',
    category: 'Luxury',
    duration_days: 14,
    price_estimate: 65000,
    description: 'The complete Northeast India experience — all 8 states, curated by experts, with premium stays and private transfers throughout.',
    featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    highlights: JSON.stringify(['All 8 States', 'Kaziranga', 'Meghalaya Caves', 'Hornbill Culture', 'Sikkim', 'Tawang']),
  },
  {
    slug: 'arunachal-pradesh-adventure-8-days',
    title: 'Arunachal Pradesh: Land of the Rising Sun',
    category: 'Adventure',
    duration_days: 8,
    price_estimate: 42000,
    description: 'Drive through breathtaking mountain roads to Tawang, visit Sela Pass, and discover ancient monasteries at the roof of Northeast India.',
    featured_image: 'https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=800&q=80',
    highlights: JSON.stringify(['Tawang Monastery', 'Sela Pass', 'Bum La Pass', 'Dirang', 'Bomdila']),
  },
];

async function main() {
  for (const itinerary of ITINERARIES) {
    await prisma.itineraries.upsert({
      where: { slug: itinerary.slug },
      update: itinerary,
      create: itinerary,
    });
  }
  console.log(`✅ ${ITINERARIES.length} itineraries seeded`);
}

main().catch(e => { console.error('Seed failed:', e); process.exit(1); }).finally(() => prisma.$disconnect());
