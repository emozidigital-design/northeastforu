require('./lib/loadEnv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CITIES = [
  // ASSAM
  { name: 'Guwahati', slug: 'guwahati', state_slug: 'assam', tagline: 'Gateway to Northeast India', description: 'Guwahati is the largest city in Northeast India and the cultural and commercial capital of Assam. Perched on the southern banks of the mighty Brahmaputra River, the city is a vibrant blend of ancient spiritual heritage, colonial landmarks, and modern urban energy.', best_time: 'October – March', how_to_reach: 'Fly into Lokpriya Gopinath Bordoloi International Airport (GAU). Well-connected by train and road from across India.', featured_image: '/images/assam/Guwahati 1.jpg' },
  { name: 'Kaziranga', slug: 'kaziranga', state_slug: 'assam', tagline: 'Kingdom of the One-Horned Rhino', description: 'Kaziranga National Park is a UNESCO World Heritage Site that shelters the world\'s largest population of the great one-horned rhinoceros.', best_time: 'November – April', how_to_reach: 'Nearest airport: Jorhat (JRH, ~97 km). Also accessible from Guwahati (~230 km) by road.', featured_image: '/images/assam/Kaziranga 1.jpg' },
  { name: 'Majuli', slug: 'majuli', state_slug: 'assam', tagline: 'World\'s Largest River Island', description: 'Majuli is the world\'s largest inhabited river island, cradled in the Brahmaputra River and recognized as India\'s first island district.', best_time: 'October – March', how_to_reach: 'Take a ferry from Jorhat (Nimatighat ferry ghat). Majuli is ~20 km by ferry.', featured_image: '/images/assam/assam-2.jpg' },
  { name: 'Pobitora', slug: 'pobitora', state_slug: 'assam', tagline: 'The Mini Kaziranga – Rhinos at Every Turn', description: 'Pobitora Wildlife Sanctuary shelters the highest density of one-horned rhinoceroses anywhere in the world. Located just 50 km from Guwahati.', best_time: 'November – March', how_to_reach: 'Approximately 50 km from Guwahati via NH27.', featured_image: '/images/assam/Pobitora 1.jpg' },
  { name: 'Manas', slug: 'manas', state_slug: 'assam', tagline: 'UNESCO Wilderness at the Foot of the Himalayas', description: 'Manas National Park is a UNESCO World Heritage Site and Project Tiger reserve that straddles the foothills of the Bhutan Himalayas.', best_time: 'November – April', how_to_reach: 'Nearest airport: Bongaigaon (~100 km) or Guwahati (~175 km). Park headquarters at Bansbari.', featured_image: '/images/assam/Manas 1.jpg' },
  { name: 'Sibsagar', slug: 'sibsagar', state_slug: 'assam', tagline: 'Ancient Capital of the Ahom Kingdom', description: 'Sibsagar was the ceremonial capital of the mighty Ahom Kingdom, which ruled Assam for nearly 600 years.', best_time: 'October – March', how_to_reach: 'Nearest airport: Jorhat (JRH, ~60 km). Well-connected by road from Guwahati (~360 km).', featured_image: '/images/assam/Sibsagar 1.jpg' },
  { name: 'Mayong', slug: 'mayong', state_slug: 'assam', tagline: 'The Land of Black Magic & Ancient Mysteries', description: 'Mayong is one of the most enigmatic villages in Northeast India, associated with the practice of black magic for centuries.', best_time: 'October – March', how_to_reach: 'Approximately 40 km from Guwahati via NH27.', featured_image: '/images/assam/Mayong 1.jpg' },
  { name: 'Orang National Park', slug: 'orang-national-park', state_slug: 'assam', tagline: 'Mini Kaziranga on the Northern Bank of the Brahmaputra', description: 'Orang National Park protects one-horned rhinoceroses, tigers, wild elephants, and a staggering diversity of wetland birds.', best_time: 'November – April', how_to_reach: 'Nearest town: Tezpur (~100 km) or Mangaldoi (~30 km). Accessible by road from Guwahati (~140 km).', featured_image: '/images/assam/Orang 1.jpg' },

  // ARUNACHAL PRADESH
  { name: 'Tawang', slug: 'tawang', state_slug: 'arunachal-pradesh', tagline: 'Where the Himalayas Touch the Sky', description: 'Tawang is a high-altitude Himalayan town perched at 10,000 feet, home to the largest Buddhist monastery in India.', best_time: 'March – October', how_to_reach: 'Nearest airport: Tezpur (TEZ, ~320 km). Inner Line Permit (ILP) required.', featured_image: '/images/arunachal-pradesh/tawang.jpg' },
  { name: 'Ziro Valley', slug: 'ziro-valley', state_slug: 'arunachal-pradesh', tagline: 'Paddy Fields, Pine Forests & the Soul of the Apatani', description: 'Ziro Valley is a broad, flat plateau rimmed by pine-covered hills, home to the Apatani tribal community.', best_time: 'September – November, March – May', how_to_reach: 'Nearest airport: Lilabari (IXI, ~100 km). Inner Line Permit (ILP) required.', featured_image: '/images/arunachal-pradesh/ziro1.jpg' },
  { name: 'Bomdila & Dirang', slug: 'bomdila', state_slug: 'arunachal-pradesh', tagline: 'Monasteries, Hot Springs & the Road to Tawang', description: 'Bomdila and Dirang are twin Himalayan destinations on the classic Tawang circuit with monasteries, hot springs and apple orchards.', best_time: 'March – June, September – November', how_to_reach: 'Accessible by road from Tezpur (~180 km). Inner Line Permit (ILP) required.', featured_image: '/images/arunachal-pradesh/bomdila&dirang.1.jpg' },
  { name: 'Mechuka', slug: 'mechuka', state_slug: 'arunachal-pradesh', tagline: 'The Last Valley Before Tibet', description: 'Mechuka is one of the most remote and hauntingly beautiful valleys in India, just 29 km from the Line of Actual Control with China.', best_time: 'October – May', how_to_reach: 'Drive from Along (Aalo) ~180 km. Inner Line Permit (ILP) required.', featured_image: '/images/arunachal-pradesh/mechuka1.jpg' },
  { name: 'Namdapha', slug: 'namdapha', state_slug: 'arunachal-pradesh', tagline: 'India\'s Richest Biodiversity Zone in the Eastern Himalayas', description: 'Namdapha National Park is the only park in the world to shelter four species of big cats.', best_time: 'October – April', how_to_reach: 'Fly to Dibrugarh then drive ~180 km to Miao. Inner Line Permit (ILP) required.', featured_image: '/images/arunachal-pradesh/namdapha1.jpg' },

  // MEGHALAYA
  { name: 'Shillong', slug: 'shillong', state_slug: 'meghalaya', tagline: 'Scotland of the East', description: 'Shillong is the capital of Meghalaya and a vibrant hill station known for its colonial charm, music culture, and scenic waterfalls.', best_time: 'October – March', how_to_reach: 'Nearest airport: Shillong Airport (SHL). Also 100 km from Guwahati by road.', featured_image: '/images/meghalaya/shillong.jpg' },
  { name: 'Cherrapunjee', slug: 'cherrapunjee', state_slug: 'meghalaya', tagline: 'One of the Wettest Places on Earth', description: 'Cherrapunjee (Sohra) holds the record for highest rainfall and is famous for living root bridges, waterfalls and dramatic gorges.', best_time: 'October – February', how_to_reach: '54 km from Shillong by road.', featured_image: '/images/meghalaya/cherrapunji.jpg' },
  { name: 'Dawki', slug: 'dawki', state_slug: 'meghalaya', tagline: 'The Crystal Clear River at the Bangladesh Border', description: 'Dawki is famous for the Umngot River whose crystalline waters make boats appear to float on glass.', best_time: 'November – April', how_to_reach: '95 km from Shillong by road.', featured_image: '/images/meghalaya/dawki.jpg' },
  { name: 'Mawlynnong', slug: 'mawlynnong', state_slug: 'meghalaya', tagline: 'Asia\'s Cleanest Village', description: 'Mawlynnong was named Asia\'s cleanest village and is known for its immaculate streets, living root bridge, and sky walk.', best_time: 'October – March', how_to_reach: '90 km from Shillong near the Bangladesh border.', featured_image: '/images/meghalaya/mawlynnong.jpg' },

  // SIKKIM
  { name: 'Gangtok', slug: 'gangtok', state_slug: 'sikkim', tagline: 'The Himalayan Capital', description: 'Gangtok is the capital of Sikkim, a charming hill city offering views of Kanchenjunga and gateway to North Sikkim\'s high-altitude lakes.', best_time: 'March – May, October – December', how_to_reach: 'Nearest airport: Bagdogra (IXB, ~124 km). Well-connected by road from Siliguri.', featured_image: '/images/sikkim/gangtok.jpg' },
  { name: 'Yumthang Valley', slug: 'yumthang-valley', state_slug: 'sikkim', tagline: 'Valley of Flowers of the Himalayas', description: 'Yumthang Valley bursts into color with rhododendrons in spring and is home to the Shingba Rhododendron Sanctuary.', best_time: 'April – May (flowers), December – January (snow)', how_to_reach: '150 km from Gangtok via Lachung.', featured_image: '/images/sikkim/yumthang.jpg' },
  { name: 'Pelling', slug: 'pelling', state_slug: 'sikkim', tagline: 'Kanchenjunga Up Close', description: 'Pelling offers some of the closest views of Kanchenjunga and is home to Pemayangtse Monastery and the Skywalk.', best_time: 'October – December, March – May', how_to_reach: '130 km from Gangtok via Ravangla.', featured_image: '/images/sikkim/pelling.jpg' },

  // NAGALAND
  { name: 'Kohima', slug: 'kohima', state_slug: 'nagaland', tagline: 'City of Warriors and the War That Changed History', description: 'Kohima is the capital of Nagaland, site of one of WWII\'s most pivotal battles and gateway to rich Naga tribal culture.', best_time: 'October – March', how_to_reach: 'Nearest airport: Dimapur (DMU, ~74 km). Well-connected by road.', featured_image: '/images/nagaland/kohima.jpg' },
  { name: 'Dzukou Valley', slug: 'dzukou-valley', state_slug: 'nagaland', tagline: 'The Valley of Flowers of the Northeast', description: 'Dzukou Valley is a stunning high-altitude valley on the Nagaland-Manipur border, famous for seasonal flowers and trekking.', best_time: 'June – September (flowers)', how_to_reach: 'Accessible from Kohima (~35 km) or Viswema Village trailhead.', featured_image: '/images/nagaland/dzukou.jpg' },

  // MANIPUR
  { name: 'Imphal', slug: 'imphal', state_slug: 'manipur', tagline: 'Jewel of the Northeast', description: 'Imphal is the capital of Manipur, home to the famous Ima Keithel market run entirely by women and the sacred Loktak Lake.', best_time: 'October – March', how_to_reach: 'Imphal Airport (IMF) has direct flights from major Indian cities.', featured_image: '/images/manipur/imphal.jpg' },
  { name: 'Loktak Lake', slug: 'loktak-lake', state_slug: 'manipur', tagline: 'The Floating National Park', description: 'Loktak Lake is the largest freshwater lake in Northeast India, famous for its unique floating islands (phumdis) and the Keibul Lamjao National Park.', best_time: 'October – March', how_to_reach: '48 km from Imphal by road.', featured_image: '/images/manipur/loktak.jpg' },

  // MIZORAM
  { name: 'Aizawl', slug: 'aizawl', state_slug: 'mizoram', tagline: 'City on the Hills', description: 'Aizawl is the capital of Mizoram, a city of churches and hills with a strong Mizo cultural identity and stunning valley views.', best_time: 'October – March', how_to_reach: 'Lengpui Airport (AJL) has flights from major cities. 32 km from city center.', featured_image: '/images/mizoram/aizawl.jpg' },
  { name: 'Phawngpui', slug: 'phawngpui', state_slug: 'mizoram', tagline: 'Blue Mountain – Roof of Mizoram', description: 'Phawngpui is the highest peak in Mizoram at 2,157 m, offering spectacular views and rare orchids in the national park.', best_time: 'October – April', how_to_reach: '300 km from Aizawl by road. Inner Line Permit may be needed.', featured_image: '/images/mizoram/phawngpui.jpg' },

  // TRIPURA
  { name: 'Agartala', slug: 'agartala', state_slug: 'tripura', tagline: 'The Royal Capital of Tripura', description: 'Agartala is the capital of Tripura, known for its royal heritage, Ujjayanta Palace, and proximity to Bangladesh.', best_time: 'October – March', how_to_reach: 'Agartala Airport (IXA) has direct flights from major cities.', featured_image: '/images/tripura/agartala.jpg' },
  { name: 'Unakoti', slug: 'unakoti', state_slug: 'tripura', tagline: 'The Rock Carvings of the Northeast', description: 'Unakoti is an ancient Shaivite pilgrimage site with massive rock carvings and sculptures dating back to the 7th-9th century.', best_time: 'October – March', how_to_reach: '178 km from Agartala by road.', featured_image: '/images/tripura/unakoti.jpg' },
];

async function main() {
  let seeded = 0;
  let skipped = 0;

  for (const city of CITIES) {
    const state = await prisma.states.findUnique({ where: { slug: city.state_slug } });
    if (!state) {
      console.log(`⚠️  State not found for slug: ${city.state_slug} — skipping ${city.name}`);
      skipped++;
      continue;
    }

    await prisma.cities.upsert({
      where: { slug: city.slug },
      update: {
        name: city.name,
        tagline: city.tagline,
        description: city.description,
        best_time_to_visit: city.best_time,
        how_to_reach: city.how_to_reach,
        featured_image: city.featured_image,
        state_id: state.id,
      },
      create: {
        name: city.name,
        slug: city.slug,
        tagline: city.tagline,
        description: city.description,
        best_time_to_visit: city.best_time,
        how_to_reach: city.how_to_reach,
        featured_image: city.featured_image,
        state_id: state.id,
      },
    });
    seeded++;
  }

  console.log(`✅ Cities seeded: ${seeded}, skipped: ${skipped}`);
}

main().catch(e => { console.error('Seed failed:', e); process.exit(1); }).finally(() => prisma.$disconnect());
