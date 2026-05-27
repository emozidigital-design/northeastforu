export interface CityData {
  name: string;
  slug: string;
  description: string;
  image: string;
  best_time: string;
}

export interface AttractionData {
  name: string;
  location: string;
  why_visit: string;
  best_time: string;
}

export interface HeroImage {
  src: string;
  label: string;
  location: string;
}

export interface StateStaticData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  capital: string;
  language: string;
  best_season: string;
  theme: string;
  featured_image: string;
  hero_images?: HeroImage[];
  cities: CityData[];
  attractions: AttractionData[];
}

const STATE_DATA: StateStaticData[] = [
  {
    name: 'Assam',
    slug: 'assam',
    tagline: 'Gateway to North East India',
    theme: 'Wildlife & Tea Culture',
    capital: 'Dispur',
    language: 'Assamese',
    best_season: 'Oct – Apr',
    featured_image: '/images/assam/assam-1.jpg',
    hero_images: [
      { src: '/images/assam/assam-1.jpg', label: 'Assam', location: 'Northeast India' },
      { src: '/images/assam/assam-2.jpg', label: 'Brahmaputra Valley', location: 'Assam' },
      { src: '/images/assam/assam-3.jpg', label: 'Assam', location: 'Northeast India' },
      { src: '/images/assam/assam-4.jpg', label: 'Assam Hills & Valleys', location: 'Assam' },
      { src: '/images/assam/Kaziranga 1.jpg', label: 'Kaziranga National Park', location: 'Kaziranga' },
      { src: '/images/assam/Guwahati 1.jpg', label: 'Guwahati', location: 'Guwahati' },
    ],
    description: `Assam is the gateway to North East India and one of the region's most culturally rich and naturally diverse destinations. Known for its vast tea estates, wildlife reserves, river islands, spiritual heritage, and vibrant traditions, Assam offers experiences that combine nature, history, adventure, and local culture.

The state is home to the mighty Brahmaputra River, which shapes its landscapes, festivals, agriculture, and daily life. From the bustling city life of Guwahati to the wilderness of Kaziranga and Manas National Parks, Assam provides a balanced mix of urban exploration and offbeat travel.

Assam is internationally recognized for its one-horned rhinoceros population, UNESCO World Heritage Sites, ancient temples, tribal communities, and centuries-old Ahom history. Travelers can experience river cruises, jungle safaris, tea tourism, village life, cultural festivals, and spiritual circuits across the state.

Whether you are looking for wildlife adventures, peaceful countryside escapes, photography opportunities, or cultural immersion, Assam stands as one of the most accessible and rewarding destinations in North East India.`,
    cities: [
      {
        name: 'Guwahati',
        slug: 'guwahati',
        description:
          'The largest city in North East India — blending the iconic Kamakhya Temple, Brahmaputra riverfront, cultural landmarks, and a starting point for the entire region.',
        image: '/images/assam/Guwahati 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Kaziranga',
        slug: 'kaziranga',
        description:
          'A UNESCO World Heritage Site home to the world\'s largest population of one-horned rhinoceroses. Jeep and elephant safaris through wetlands and elephant grasslands.',
        image: '/images/assam/Kaziranga 1.jpg',
        best_time: 'Nov – Apr',
      },
      {
        name: 'Majuli',
        slug: 'majuli',
        description:
          'The world\'s largest inhabited river island on the Brahmaputra, famous for neo-Vaishnavite satras, mask-making traditions, rural cycling, and migratory birds.',
        image: '/images/assam/assam-2.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Sibsagar',
        slug: 'sibsagar',
        description:
          'Former capital of the Ahom Kingdom featuring Rang Ghar (Asia\'s oldest amphitheater), Talatal Ghar, and centuries of royal heritage.',
        image: '/images/assam/Sibsagar 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Manas',
        slug: 'manas',
        description:
          'A UNESCO World Heritage Site along the Bhutan foothills, home to tigers, golden langurs, pygmy hogs, and elephants in pristine forest landscapes.',
        image: '/images/assam/Manas 1.jpg',
        best_time: 'Nov – Apr',
      },
      {
        name: 'Mayong',
        slug: 'mayong',
        description:
          'Mystical village known as the "Land of Black Magic," with ancient manuscripts, folklore, traditional healing practices, and scenic riverine landscapes.',
        image: '/images/assam/Mayong 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Pobitora',
        slug: 'pobitora',
        description:
          'Wildlife sanctuary near Guwahati with the highest density of one-horned rhinos in the world — perfect for weekend safaris and birdwatching.',
        image: '/images/assam/Pobitora 1.jpg',
        best_time: 'Nov – Mar',
      },
      {
        name: 'Orang National Park',
        slug: 'orang-national-park',
        description:
          'Called "Mini Kaziranga," this park on the Brahmaputra\'s northern bank shelters rhinos, tigers, and abundant migratory birdlife in undisturbed wetland ecosystems.',
        image: '/images/assam/Orang 1.jpg',
        best_time: 'Nov – Apr',
      },
    ],
    attractions: [
      { name: 'Kaziranga National Park', location: 'Kaziranga', why_visit: 'World\'s largest one-horned rhino population and a UNESCO World Heritage Site.', best_time: 'Nov – Apr' },
      { name: 'Kamakhya Temple', location: 'Guwahati', why_visit: 'One of India\'s most important Shakti Peethas — ancient, powerful, and perched above the Brahmaputra.', best_time: 'Year round' },
      { name: 'Majuli Island', location: 'Majuli', why_visit: 'World\'s largest river island with living neo-Vaishnavite monastery culture.', best_time: 'Oct – Mar' },
      { name: 'Manas National Park', location: 'Manas', why_visit: 'Pristine UNESCO-listed wilderness with golden langurs and wild buffaloes.', best_time: 'Nov – Apr' },
      { name: 'Rang Ghar', location: 'Sibsagar', why_visit: 'Asia\'s oldest royal sports pavilion from the Ahom dynasty.', best_time: 'Oct – Mar' },
      { name: 'Umananda Island', location: 'Guwahati', why_visit: 'Tiny river island in the Brahmaputra with a Shiva temple and golden langur sightings.', best_time: 'Oct – Mar' },
    ],
  },
  {
    name: 'Arunachal Pradesh',
    slug: 'arunachal-pradesh',
    tagline: 'Land of the Dawn-Lit Mountains',
    theme: 'Mountains & Monasteries',
    capital: 'Itanagar',
    language: 'Nyishi, Bengali, Hindi',
    best_season: 'Oct – Apr',
    featured_image: '/images/arunachal-pradesh/arunachal-pradesh-1.jpg',
    hero_images: [
      { src: '/images/arunachal-pradesh/arunachal-pradesh-1.jpg', label: 'Arunachal Pradesh', location: 'Northeast India' },
      { src: '/images/arunachal-pradesh/arunachal-pradesh-2.jpg', label: 'Land of Dawn-Lit Mountains', location: 'Arunachal Pradesh' },
      { src: '/images/arunachal-pradesh/arunachal-pradesh-3.jpg', label: 'Arunachal Pradesh', location: 'Northeast India' },
      { src: '/images/arunachal-pradesh/tawang.jpg', label: 'Tawang Monastery', location: 'Tawang' },
      { src: '/images/arunachal-pradesh/ziro1.jpg', label: 'Ziro Valley', location: 'Ziro Valley' },
    ],
    description: `Arunachal Pradesh is the largest state in North East India and one of the country's most spectacular mountain destinations. Known for its snow-covered passes, monasteries, valleys, tribal culture, forests, and remote Himalayan landscapes, the state offers some of the most scenic travel experiences in India.

Bordering Bhutan, China, and Myanmar, Arunachal Pradesh is home to diverse tribal communities, ancient Buddhist traditions, dense biodiversity zones, and untouched natural environments. The state is widely known for destinations such as Tawang, Ziro Valley, Mechuka, and Namdapha National Park.

Travelers visit Arunachal Pradesh for road trips, trekking, monastery tours, wildlife exploration, photography, and cultural tourism. The region features alpine lakes, high-altitude passes, river valleys, traditional villages, and mountain landscapes rarely found elsewhere in India.

Its remote beauty, cultural richness, and adventure opportunities make Arunachal Pradesh one of the most rewarding destinations for experiential travel in North East India.`,
    cities: [
      {
        name: 'Tawang',
        slug: 'tawang',
        description:
          'High-altitude Himalayan town home to India\'s largest monastery, snow-covered Madhuri Lake, ancient Buddhist heritage, and breathtaking mountain passes.',
        image: '/images/arunachal-pradesh/tawang.jpg',
        best_time: 'Mar – Oct',
      },
      {
        name: 'Ziro Valley',
        slug: 'ziro-valley',
        description:
          'Scenic plateau with green rice fields, pine forests, Apatani tribal villages, and the world-famous Ziro Music Festival set against stunning mountain backdrops.',
        image: '/images/arunachal-pradesh/ziro1.jpg',
        best_time: 'Sep – Nov',
      },
      {
        name: 'Bomdila & Dirang',
        slug: 'bomdila',
        description:
          'Twin hill destinations on the route to Tawang — Bomdila offers Buddhist monasteries and Himalayan panoramas, while Dirang charms with hot springs, yak farms, and apple orchards.',
        image: '/images/arunachal-pradesh/bomdila-1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Mechuka',
        slug: 'mechuka',
        description:
          'Remote valley near the Indo-China border surrounded by snow peaks, rivers, and ancient Buddhist monasteries — a haven for adventure seekers.',
        image: '/images/arunachal-pradesh/mechuka1.jpg',
        best_time: 'Oct – May',
      },
      {
        name: 'Namdapha',
        slug: 'namdapha',
        description:
          'One of India\'s largest protected forests with clouded leopards, red pandas, hoolock gibbons, and extraordinary biodiversity in the Eastern Himalayas.',
        image: '/images/arunachal-pradesh/namdapha1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Pakke & Eaglenest',
        slug: 'pakke-eaglenest',
        description:
          'Two of India\'s premier birdwatching sanctuaries — Pakke Tiger Reserve and Eaglenest Wildlife Sanctuary together host over 500 bird species in pristine subtropical forests.',
        image: '/images/arunachal-pradesh/pakke-eaglenest-1.jpg',
        best_time: 'Nov – Apr',
      },
      {
        name: 'Sela Pass & Bumla',
        slug: 'sela-pass',
        description:
          'High-altitude road journey to the roof of Arunachal Pradesh — Sela Pass at 13,700 ft offers an alpine lake and sweeping Himalayan vistas, while Bumla Pass touches the Indo-China border.',
        image: '/images/arunachal-pradesh/sela-pass-1.jpg',
        best_time: 'Mar – Oct',
      },
    ],
    attractions: [
      { name: 'Tawang Monastery', location: 'Tawang', why_visit: 'India\'s largest monastery and one of the most important Buddhist sites in Asia.', best_time: 'Mar – Oct' },
      { name: 'Madhuri Lake', location: 'Tawang', why_visit: 'Alpine lake surrounded by snow mountains, immortalized by Bollywood.', best_time: 'Apr – Oct' },
      { name: 'Ziro Music Festival', location: 'Ziro Valley', why_visit: 'India\'s most beloved indie music festival set amidst the Apatani rice fields.', best_time: 'Sep – Oct' },
      { name: 'Sela Pass', location: 'Tawang Route', why_visit: 'High-altitude pass at 13,700 ft with a sacred lake and stunning Himalayan views.', best_time: 'Mar – Oct' },
      { name: 'Namdapha National Park', location: 'Changlang', why_visit: 'Richest biodiversity zone in the Eastern Himalayas — four big cat species in one park.', best_time: 'Oct – Apr' },
      { name: 'Eaglenest Wildlife Sanctuary', location: 'West Kameng', why_visit: 'One of Asia\'s top birdwatching sites — over 500 species including rare species found nowhere else.', best_time: 'Nov – Apr' },
    ],
  },
  {
    name: 'Meghalaya',
    slug: 'meghalaya',
    tagline: 'Abode of Clouds',
    theme: 'Waterfalls & Living Root Bridges',
    capital: 'Shillong',
    language: 'Khasi, Garo, English',
    best_season: 'Oct – May',
    featured_image: '/images/meghalaya/meghalaya-1.jpg',
    hero_images: [
      { src: '/images/meghalaya/meghalaya-1.jpg', label: 'Meghalaya', location: 'Northeast India' },
      { src: '/images/meghalaya/meghalaya-2.jpg', label: 'Abode of Clouds', location: 'Meghalaya' },
      { src: '/images/meghalaya/meghalaya-3.jpg', label: 'Meghalaya', location: 'Northeast India' },
      { src: '/images/meghalaya/Cherrapunji 1.jpg', label: 'Cherrapunji', location: 'Cherrapunji' },
      { src: '/images/meghalaya/Dawki 1.jpg', label: 'Dawki River', location: 'Dawki' },
    ],
    description: `Meghalaya is one of the most scenic states in North East India, known for its rolling hills, waterfalls, caves, cloud-covered landscapes, and rich tribal culture. Often called the "Abode of Clouds," the state offers a combination of natural beauty, adventure tourism, and cultural experiences.

The state is famous for destinations such as Shillong, Cherrapunji, Dawki, Mawlynnong, and Mawsynram, each offering unique landscapes and travel experiences. Meghalaya is home to some of the wettest places on Earth, spectacular waterfalls, crystal-clear rivers, ancient living root bridges, and dense forests.

Travelers visit Meghalaya for trekking, camping, caving, road trips, photography, and eco-tourism. The state is also known for its Khasi, Jaintia, and Garo tribal communities, whose traditions, food, music, and festivals add cultural depth to the travel experience.

With pleasant weather, scenic drives, and diverse attractions, Meghalaya remains one of the most popular destinations for nature and adventure tourism in India.`,
    cities: [
      {
        name: 'Shillong',
        slug: 'shillong',
        description:
          'The capital of Meghalaya and one of the most visited hill stations in North East India — known for Ward\'s Lake, Shillong Peak, Elephant Falls, a vibrant café and music culture, and easy access to Cherrapunji and Dawki.',
        image: '/images/meghalaya/Shillong 1.jpg',
        best_time: 'Oct – Jun',
      },
      {
        name: 'Cherrapunji',
        slug: 'cherrapunji',
        description:
          'One of the wettest places on Earth — home to Nohkalikai Falls, the iconic Double Decker Living Root Bridge, Mawsmai Cave, Seven Sisters Falls, and cloud-draped valleys with views into Bangladesh.',
        image: '/images/meghalaya/Cherrapunji 1.jpg',
        best_time: 'Oct – May',
      },
      {
        name: 'Dawki',
        slug: 'dawki',
        description:
          'Famous for the crystal-clear Umngot River where boats appear to float in mid-air. Nearby Shnongpdeng adds kayaking, cliff jumping, ziplining, and riverside camping — one of North East India\'s most photographed river destinations.',
        image: '/images/meghalaya/Dawki 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Mawlynnong',
        slug: 'mawlynnong',
        description:
          'Asia\'s cleanest village — bamboo walkways, flower gardens, a living root bridge, and a sky walk viewpoint over Bangladesh plains, all maintained by an immaculate Khasi community.',
        image: '/images/meghalaya/Mawlynnong 1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Laitlum',
        slug: 'laitlum',
        description:
          '"End of Hills" — dramatic canyon viewpoints with deep gorges, misty valleys, traditional Khasi villages far below, and some of Meghalaya\'s finest sunrise photography spots.',
        image: '/images/meghalaya/Laitlum 1.jpg',
        best_time: 'Oct – May',
      },
      {
        name: 'Jowai',
        slug: 'jowai',
        description:
          'Cultural center of the Jaintia Hills — home to the turquoise Krang Suri Falls, sacred forests, monoliths, caves, and a quieter, less-commercialized side of Meghalaya tourism.',
        image: '/images/meghalaya/Jowai 1.jpg',
        best_time: 'Oct – May',
      },
      {
        name: 'Mawsynram',
        slug: 'mawsynram',
        description:
          'Earth\'s wettest place by recorded rainfall — misty caves, lush green plateaus, monsoon waterfalls, and panoramic views stretching across the Bangladesh plains below.',
        image: '/images/meghalaya/meghalaya-2.jpg',
        best_time: 'Jun – Sep',
      },
      {
        name: 'Umiam',
        slug: 'umiam',
        description:
          'Scenic reservoir between Guwahati and Shillong — boating, kayaking, water sports, lakeside camping, and golden-hour views across pine-covered hills make it the perfect stopover before Shillong.',
        image: '/images/meghalaya/meghalaya-3.jpg',
        best_time: 'Oct – May',
      },
    ],
    attractions: [
      { name: 'Double Decker Living Root Bridge', location: 'Cherrapunji', why_visit: 'Ancient bio-engineered bridge made from living tree roots — a UNESCO nomination site.', best_time: 'Oct – May' },
      { name: 'Nohkalikai Falls', location: 'Cherrapunji', why_visit: 'India\'s tallest waterfall plunging 340 m into a turquoise pool below dramatic cliffs.', best_time: 'Jul – Oct' },
      { name: 'Umngot River', location: 'Dawki', why_visit: 'Crystal-clear river so transparent that boats appear to float in the air.', best_time: 'Oct – Mar' },
      { name: 'Mawlynnong Village', location: 'Mawlynnong', why_visit: 'Asia\'s cleanest village — a model of community living and sustainable tourism.', best_time: 'Oct – Apr' },
      { name: 'Krang Suri Falls', location: 'Jowai', why_visit: 'Turquoise waterfall in lush forested Jaintia Hills — one of Meghalaya\'s most beautiful cascades.', best_time: 'Oct – May' },
      { name: 'Elephant Falls', location: 'Shillong', why_visit: 'Tiered cascade in lush forest just 12 km from Shillong city center.', best_time: 'Year round' },
    ],
  },
  {
    name: 'Manipur',
    slug: 'manipur',
    tagline: 'Jewel of India',
    theme: 'Lakes, Heritage & Classical Arts',
    capital: 'Imphal',
    language: 'Meitei, English',
    best_season: 'Oct – Mar',
    featured_image: '/images/manipur/manipur-1.jpg',
    hero_images: [
      { src: '/images/manipur/manipur-1.jpg', label: 'Manipur', location: 'Northeast India' },
      { src: '/images/manipur/manipur-2.jpg', label: 'Jewel of India', location: 'Manipur' },
      { src: '/images/manipur/manipur-3.jpg', label: 'Manipur', location: 'Northeast India' },
      { src: '/images/manipur/Loktak 1.jpg', label: 'Loktak Lake', location: 'Loktak' },
      { src: '/images/manipur/Imphal 1.jpg', label: 'Imphal', location: 'Imphal' },
    ],
    description: `Manipur is a culturally rich and naturally beautiful state in North East India, known for its lakes, floating islands, mountain landscapes, classical dance traditions, and historical significance. Surrounded by hills and valleys, the state offers a diverse mix of nature, heritage, and cultural tourism.

The state is famous for destinations such as Loktak Lake, Imphal, Ukhrul, and Moirang, each offering unique experiences ranging from scenic landscapes to historical landmarks. Manipur is also widely recognized for its traditional art forms, handloom culture, martial arts, and sports heritage.

Travelers visit Manipur for eco-tourism, cultural exploration, trekking, photography, and heritage tourism. The combination of valley landscapes, tribal villages, historical sites, and local traditions makes the state one of the most distinctive destinations in North East India.

With its unique identity and scenic environment, Manipur offers immersive travel experiences for both cultural and nature-focused travelers.`,
    cities: [
      {
        name: 'Imphal',
        slug: 'imphal',
        description:
          'Cultural heart of Manipur — home to Kangla Fort, the legendary Ima Keithel women\'s market, Manipuri classical dance, and WWII war cemeteries.',
        image: '/images/manipur/Imphal 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Loktak Lake',
        slug: 'loktak-lake',
        description:
          'North East India\'s largest freshwater lake, home to the world\'s only floating national park and the endangered Sangai deer — a truly unique ecosystem.',
        image: '/images/manipur/Loktak 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Moirang',
        slug: 'moirang',
        description:
          'Historically significant town where the INA flag was first hoisted on Indian soil during WWII — with a museum, memorial, and proximity to Loktak Lake.',
        image: '/images/manipur/Moirang 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Ukhrul',
        slug: 'ukhrul',
        description:
          'Scenic hill district in the Tangkhul Naga highlands, famed for the rare Shirui Lily found only on Shirui Hill and spectacular mountain trekking trails.',
        image: '/images/manipur/ukhrul 1.jpg',
        best_time: 'Apr – May (lily season), Oct – Mar',
      },
      {
        name: 'Tamenglong',
        slug: 'tamenglong',
        description:
          'Called the "Land of Hornbills" — a forested district of waterfalls, river canyons, orange orchards, and pristine tribal landscapes.',
        image: '/images/manipur/tamenlong 1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Bishnupur',
        slug: 'bishnupur',
        description:
          'Ancient temple town of the Meitei kingdom — Bishnupur and nearby Andro village showcase terracotta temples, traditional pottery, handloom weaving, and centuries-old cultural heritage.',
        image: '/images/manipur/bishnupur 1.jpg',
        best_time: 'Oct – Mar',
      },
    ],
    attractions: [
      { name: 'Keibul Lamjao National Park', location: 'Loktak Lake', why_visit: 'World\'s only floating national park — habitat of the endangered Sangai dancing deer.', best_time: 'Nov – Mar' },
      { name: 'Kangla Fort', location: 'Imphal', why_visit: 'Ancient seat of Manipuri royalty with sacred temples and powerful historical significance.', best_time: 'Oct – Mar' },
      { name: 'Ima Keithel', location: 'Imphal', why_visit: 'World\'s largest market run entirely by women — a living cultural institution.', best_time: 'Year round' },
      { name: 'Shirui Lily Sanctuary', location: 'Ukhrul', why_visit: 'Only place on Earth where the rare Shirui Lily grows in the wild.', best_time: 'Apr – May' },
      { name: 'INA Memorial', location: 'Moirang', why_visit: 'Site where the Indian National Army first hoisted the tricolour on Indian soil in 1944.', best_time: 'Oct – Mar' },
      { name: 'Bishnupur Temples', location: 'Bishnupur', why_visit: 'Ancient terracotta temples of the Meitei kingdom — a living museum of art, craft, and devotion.', best_time: 'Oct – Mar' },
    ],
  },
  {
    name: 'Mizoram',
    slug: 'mizoram',
    tagline: 'Land of Blue Mountains',
    theme: 'Peaceful Hills & Scenic Drives',
    capital: 'Aizawl',
    language: 'Mizo, English',
    best_season: 'Oct – Mar',
    featured_image: '/images/mizoram/mizoram-1.jpg',
    hero_images: [
      { src: '/images/mizoram/mizoram-1.jpg', label: 'Mizoram', location: 'Northeast India' },
      { src: '/images/mizoram/mizoram-2.jpg', label: 'Land of Blue Mountains', location: 'Mizoram' },
      { src: '/images/mizoram/mizoram-3.jpg', label: 'Mizoram', location: 'Northeast India' },
      { src: '/images/mizoram/Champhai 1.jpg', label: 'Champhai Valley', location: 'Champhai' },
      { src: '/images/mizoram/Vantawng 1.jpg', label: 'Vantawng Falls', location: 'Thenzawl' },
    ],
    description: `Mizoram is one of the most peaceful and scenic states in North East India, known for its rolling hills, dense forests, waterfalls, tribal culture, and panoramic mountain landscapes. Surrounded by Myanmar and Bangladesh, the state offers a unique blend of natural beauty, cultural richness, and offbeat travel experiences.

The state is characterized by winding hill roads, green valleys, bamboo forests, and picturesque villages spread across mountain ridges. Mizoram is also known for its strong community culture, clean towns, and warm hospitality.

Travelers visit Mizoram for nature tourism, trekking, photography, cultural exploration, and peaceful hill station experiences away from crowded tourist destinations. The state offers lakes, waterfalls, wildlife reserves, and scenic viewpoints that remain relatively unexplored compared to other northeastern states.

With its calm atmosphere, beautiful landscapes, and authentic cultural identity, Mizoram is becoming an increasingly popular destination for travelers seeking slow and immersive travel experiences.`,
    cities: [
      {
        name: 'Aizawl',
        slug: 'aizawl',
        description:
          'Mizoram\'s dramatically hill-perched capital with panoramic valley views, vibrant local markets, Solomon\'s Temple, Durtlang Hills viewpoints, and an authentic Mizo urban atmosphere.',
        image: '/images/mizoram/mizoram-1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Champhai',
        slug: 'champhai',
        description:
          'The "Rice Bowl of Mizoram" — a wide valley near the Myanmar border with rolling farmland, vineyards, traditional villages, and some of the state\'s most breathtaking mountain scenery.',
        image: '/images/mizoram/Champhai 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Vantawng Falls',
        slug: 'vantawng-falls',
        description:
          'Mizoram\'s highest and most spectacular waterfall, cascading through thick forests in Thenzawl — best experienced during the monsoon when it reaches its full dramatic power.',
        image: '/images/mizoram/Vantawng 1.jpg',
        best_time: 'Jun – Oct',
      },
      {
        name: 'Tam Dil Lake',
        slug: 'tam-dil-lake',
        description:
          'A serene natural lake nestled in forested hills near Saitual — perfect for boating, birdwatching, picnics, and peaceful half-day escapes from Aizawl.',
        image: '/images/mizoram/Tam dil 1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Palak Dil',
        slug: 'palak-dil',
        description:
          'Mizoram\'s largest natural lake near the Myanmar border — surrounded by wildlife-rich forests, wrapped in tribal folklore, and ideal for quiet offbeat eco-tourism.',
        image: '/images/mizoram/mizoram-3.jpg',
        best_time: 'Oct – Mar',
      },
    ],
    attractions: [
      { name: 'Vantawng Falls', location: 'Thenzawl', why_visit: 'Mizoram\'s tallest waterfall — dramatic cascade through forested cliffs.', best_time: 'Jul – Oct' },
      { name: 'Champhai Valley', location: 'Champhai', why_visit: 'Panoramic valley farmlands bordering Myanmar — one of Mizoram\'s most photographed landscapes.', best_time: 'Oct – Mar' },
      { name: 'Palak Dil', location: 'Lunglei', why_visit: 'State\'s largest natural lake with rich biodiversity and tribal folklore significance.', best_time: 'Oct – Mar' },
      { name: 'Solomon\'s Temple', location: 'Aizawl', why_visit: 'Iconic white church crowning a hilltop — symbolic of Mizo spiritual identity.', best_time: 'Year round' },
      { name: 'Durtlang Hills', location: 'Aizawl', why_visit: 'Panoramic viewpoint over Aizawl with sweeping valley vistas at sunrise.', best_time: 'Oct – Mar' },
    ],
  },
  {
    name: 'Nagaland',
    slug: 'nagaland',
    tagline: 'Land of Festivals',
    theme: 'Tribal Heritage & Hornbill Festival',
    capital: 'Kohima',
    language: 'Nagamese, English',
    best_season: 'Oct – Apr',
    featured_image: '/images/nagaland/nagaland-1.jpg',
    hero_images: [
      { src: '/images/nagaland/nagaland-1.jpg', label: 'Nagaland', location: 'Northeast India' },
      { src: '/images/nagaland/nagaland-2.jpg', label: 'Land of Festivals', location: 'Nagaland' },
      { src: '/images/nagaland/nagaland-3.jpg', label: 'Nagaland', location: 'Northeast India' },
      { src: '/images/nagaland/dzuko 1.jpg', label: 'Dzukou Valley', location: 'Kohima' },
      { src: '/images/nagaland/kohima.jpg', label: 'Kohima', location: 'Kohima' },
    ],
    description: `Nagaland is one of the most culturally unique states in North East India, known for its tribal heritage, mountain landscapes, festivals, and traditional village life. Surrounded by forested hills and scenic valleys, the state offers a blend of culture, history, adventure, and nature tourism.

The state is home to multiple Naga tribes, each with distinct traditions, festivals, architecture, crafts, music, and cuisine. Nagaland is internationally recognized for the Hornbill Festival, often referred to as the "Festival of Festivals," which showcases the cultural diversity of the region.

Travelers visit Nagaland for trekking, cultural exploration, mountain scenery, village tourism, and photography. Destinations such as Kohima, Dzukou Valley, Mon District, and Phek offer experiences ranging from scenic hikes to tribal heritage immersion.

With its strong cultural identity and untouched landscapes, Nagaland remains one of the most fascinating destinations in North East India for experiential travel.`,
    cities: [
      {
        name: 'Kohima',
        slug: 'kohima',
        description:
          'Nagaland\'s scenic mountain capital — home to the Kohima War Cemetery, tribal markets, traditional Naga villages, and the primary gateway to Dzukou Valley and the Hornbill Festival at Kisama.',
        image: '/images/nagaland/kohima.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Dimapur',
        slug: 'dimapur',
        description:
          'Nagaland\'s commercial gateway and the state\'s largest city — the main arrival point by air and rail with bustling markets, historical Kachari ruins, and connections to destinations across the state.',
        image: '/images/nagaland/dimapur.jpg',
        best_time: 'Year round',
      },
      {
        name: 'Dzukou Valley',
        slug: 'dzukou-valley',
        description:
          '"Valley of Flowers of the Northeast" — a rolling high-altitude paradise on the Nagaland-Manipur border, famous for seasonal wildflowers, scenic camping, and panoramic mountain vistas.',
        image: '/images/nagaland/dzuko 1.jpg',
        best_time: 'Jun – Sep (flowers), Oct – Feb (winter)',
      },
      {
        name: 'Mon',
        slug: 'mon',
        description:
          'Home of the legendary Konyak tribe — visit Longwa village where the India-Myanmar border runs through the chief\'s house, and experience wood carvings, warrior traditions, and ancient tribal heritage.',
        image: '/images/nagaland/mon 1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'Kisama',
        slug: 'kisama',
        description:
          'Heritage Village near Kohima and permanent venue for the Hornbill Festival — a living showcase of Naga tribal architecture, traditional crafts, cultural performances, and indigenous food.',
        image: '/images/nagaland/nagaland-2.jpg',
        best_time: 'Dec (festival)',
      },
      {
        name: 'Phek & Tuensang',
        slug: 'phek-tuensang',
        description:
          'Scenic eastern Nagaland districts with terraced farmlands, alpine lakes, dense forests, and authentic tribal villages — offering quiet, offbeat experiences away from mainstream tourism circuits.',
        image: '/images/nagaland/nagaland-3.jpg',
        best_time: 'Oct – Apr',
      },
    ],
    attractions: [
      { name: 'Hornbill Festival', location: 'Kisama Heritage Village', why_visit: 'The "Festival of Festivals" — all 16 Naga tribes celebrate together every December.', best_time: 'Dec 1–10' },
      { name: 'Dzukou Valley', location: 'Kohima–Manipur border', why_visit: 'One of NE India\'s most spectacular treks through wildflower-covered mountain valleys.', best_time: 'Jun – Sep' },
      { name: 'Kohima War Cemetery', location: 'Kohima', why_visit: 'Poignant WWII memorial commemorating the Battle of Kohima — "Stalingrad of the East."', best_time: 'Year round' },
      { name: 'Longwa Village', location: 'Mon', why_visit: 'Village bisected by the India-Myanmar border, home to the Konyak chief\'s house spanning two nations.', best_time: 'Oct – Apr' },
      { name: 'Mokokchung', location: 'Mokokchung', why_visit: 'Cultural center of the Ao Nagas with traditional villages, rice beer culture, and scenic hills.', best_time: 'Oct – Apr' },
    ],
  },
  {
    name: 'Sikkim',
    slug: 'sikkim',
    tagline: 'Where Heaven Meets Earth',
    theme: 'Himalayan Snow & Monasteries',
    capital: 'Gangtok',
    language: 'Sikkimese, Nepali, Lepcha',
    best_season: 'Mar – May, Oct – Dec',
    featured_image: '/images/sikkim/sikkim-1.jpg',
    hero_images: [
      { src: '/images/sikkim/sikkim-1.jpg', label: 'Sikkim', location: 'Northeast India' },
      { src: '/images/sikkim/sikkim-2.jpg', label: 'Where Heaven Meets Earth', location: 'Sikkim' },
      { src: '/images/sikkim/sikkim-3.jpg', label: 'Sikkim', location: 'Northeast India' },
      { src: '/images/sikkim/gangtok 1.jpg', label: 'Gangtok', location: 'Gangtok' },
      { src: '/images/sikkim/pelling 1.jpg', label: 'Pelling', location: 'West Sikkim' },
    ],
    description: `Sikkim is one of India's most scenic Himalayan states, known for its snow-covered mountains, monasteries, alpine lakes, valleys, adventure tourism, and rich Buddhist culture. Nestled in the Eastern Himalayas, the state offers a combination of natural beauty, peaceful hill towns, and high-altitude landscapes.

The state is home to some of the most iconic destinations in India including Gangtok, Tsomgo Lake, Nathula Pass, North Sikkim, and Zuluk. Sikkim is also famous for its clean environment, biodiversity, monasteries, waterfalls, and panoramic views of Mount Kanchenjunga.

Travelers visit Sikkim for mountain road trips, trekking, nature tourism, snow experiences, cultural exploration, and adventure activities. The state offers landscapes ranging from lush valleys and forests to glacial lakes and alpine passes.

Its organized tourism infrastructure, scenic beauty, and peaceful atmosphere make Sikkim one of the most popular destinations in North East India.`,
    cities: [
      {
        name: 'Gangtok',
        slug: 'gangtok',
        description:
          'Sikkim\'s vibrant mountain capital — MG Marg\'s café culture, Rumtek Monastery, Tashi View Point, Hanuman Tok, and the primary base for Tsomgo Lake, Nathula Pass, and North Sikkim expeditions.',
        image: '/images/sikkim/gangtok 1.jpg',
        best_time: 'Mar – May, Oct – Dec',
      },
      {
        name: 'Tsomgo & Nathula',
        slug: 'tsomgo-nathula',
        description:
          'Sikkim\'s most iconic high-altitude duo near the Indo-China border — Tsomgo Lake is a glacial alpine gem surrounded by snow mountains, while Nathula Pass at 14,140 ft was once part of the historic Silk Route.',
        image: '/images/sikkim/tsumgo 1.jpg',
        best_time: 'May – Oct',
      },
      {
        name: 'Pelling & Ravangla',
        slug: 'pelling',
        description:
          'West and South Sikkim\'s most scenic hill destinations — Pelling offers front-row Kanchenjunga views, Pemayangtse Monastery, a glass skywalk, and a giant Chenrezig statue; Ravangla charms with Buddha Park and forested serenity.',
        image: '/images/sikkim/pelling 1.jpg',
        best_time: 'Oct – Apr',
      },
      {
        name: 'North Sikkim',
        slug: 'north-sikkim',
        description:
          'Sikkim\'s most spectacular mountain region — snow-covered peaks, Yumthang Valley\'s wildflower carpets, Zero Point snowfields, Gurudongmar Lake at 17,800 ft, and remote alpine villages in the Eastern Himalayas.',
        image: '/images/sikkim/north s 1.jpg',
        best_time: 'Dec – Feb (snow), Apr – May (flowers)',
      },
      {
        name: 'Silk Route & Zuluk',
        slug: 'zuluk',
        description:
          'East Sikkim\'s legendary mountain road journey — Zuluk\'s dramatic zigzag highway, Thambi View Point sunrise, and high-altitude passes along the ancient trade route that once connected India with Tibet.',
        image: '/images/sikkim/silk 1.jpg',
        best_time: 'Oct – Dec, Mar – May',
      },
      {
        name: 'Namchi & South Sikkim',
        slug: 'namchi',
        description:
          'South Sikkim\'s spiritual and scenic heart — Namchi\'s 87-foot Guru Padmasambhava statue at Samdruptse, the Char Dham replica complex, panoramic valley views, and tranquil tea gardens.',
        image: '/images/sikkim/namchi 1.jpg',
        best_time: 'Oct – Apr',
      },
    ],
    attractions: [
      { name: 'Gurudongmar Lake', location: 'North Sikkim', why_visit: 'One of the world\'s highest lakes at 17,800 ft — sacred to Buddhists and Sikhs alike.', best_time: 'May – Jun, Sep – Nov' },
      { name: 'Tsomgo Lake', location: 'Gangtok', why_visit: 'Glacial alpine lake surrounded by snow mountains and colorful seasonal blooms — 40 km from Gangtok.', best_time: 'May – Jun, Oct – Dec' },
      { name: 'Yumthang Valley', location: 'North Sikkim', why_visit: '"Valley of Flowers" at 11,800 ft with rhododendrons, hot springs, and the Teesta River.', best_time: 'Apr – May (flowers)' },
      { name: 'Rumtek Monastery', location: 'Gangtok', why_visit: 'Kagyu Dharma Chakra Centre — one of the most important Tibetan Buddhist monasteries in the world.', best_time: 'Year round' },
      { name: 'Nathula Pass', location: 'Gangtok', why_visit: 'Historic Silk Route border pass at 14,140 ft with views into Tibet — one of few open Indo-China border crossings.', best_time: 'May – Oct' },
    ],
  },
  {
    name: 'Tripura',
    slug: 'tripura',
    tagline: 'Land of Fourteen Gods',
    theme: 'Royal Heritage & Archaeology',
    capital: 'Agartala',
    language: 'Bengali, Kokborok',
    best_season: 'Oct – Mar',
    featured_image: '/images/tripura/tripura-1.jpg',
    hero_images: [
      { src: '/images/tripura/tripura-1.jpg', label: 'Tripura', location: 'Northeast India' },
      { src: '/images/tripura/tripura-2.jpg', label: 'Land of Fourteen Gods', location: 'Tripura' },
      { src: '/images/tripura/tripura-3.jpg', label: 'Tripura', location: 'Northeast India' },
      { src: '/images/tripura/neermahal 1.jpg', label: 'Neermahal Palace', location: 'Rudrasagar Lake' },
      { src: '/images/tripura/unakoti 1.jpg', label: 'Unakoti', location: 'Kailashahar' },
    ],
    description: `Tripura is one of the most culturally and historically rich states in North East India, known for its royal palaces, archaeological sites, lakes, temples, hill landscapes, and tribal heritage. Surrounded by Bangladesh on three sides, the state offers a unique combination of history, nature, and cultural tourism.

The state is home to important attractions such as Neermahal, Unakoti, Jampui Hills, and ancient rock carvings that reflect Tripura's artistic and historical legacy. The region also features forests, wildlife sanctuaries, rural villages, and scenic hill ranges suitable for eco-tourism and leisure travel.

Travelers visit Tripura for heritage tourism, photography, cultural exploration, and peaceful hill station experiences. The state's royal history, tribal traditions, and archaeological significance make it one of the most distinctive destinations in North East India.

With improving connectivity and diverse attractions, Tripura is emerging as an important tourism destination for travelers seeking offbeat experiences.`,
    cities: [
      {
        name: 'Agartala',
        slug: 'agartala',
        description:
          'Tripura\'s graceful capital — home to the grand Ujjayanta Palace state museum, temples, local markets, and the main gateway for exploring Neermahal, Unakoti, Jampui Hills, and Sepahijala.',
        image: '/images/tripura/agartala 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Neermahal',
        slug: 'neermahal',
        description:
          'Eastern India\'s only water palace — a breathtaking blend of Hindu and Mughal architecture rising from the center of Rudrasagar Lake, most magical at golden hour and during the annual Neermahal Water Festival.',
        image: '/images/tripura/neermahal 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Unakoti',
        slug: 'unakoti',
        description:
          'Remarkable open-air rock-cut sanctuary deep in forested hills — giant Shiva faces and thousands of centuries-old sculptures carved into the hillsides, one of the most extraordinary archaeological sites in North East India.',
        image: '/images/tripura/unakoti 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Jampui Hills',
        slug: 'jampui-hills',
        description:
          'Tripura\'s beloved hill station — cool climate, fragrant orange orchards, panoramic sunrise viewpoints over Mizoram, and peaceful tribal village life at the state\'s highest elevations.',
        image: '/images/tripura/jampui 1.jpg',
        best_time: 'Oct – Feb (orange season)',
      },
      {
        name: 'Sepahijala',
        slug: 'sepahijala',
        description:
          'Tripura\'s most accessible wildlife sanctuary — clouded leopards, spectacled monkeys, boating lakes, botanical gardens, and nature trails just 25 km from Agartala.',
        image: '/images/tripura/sepahijala 1.jpg',
        best_time: 'Oct – Mar',
      },
      {
        name: 'Pilak & Boxanagar',
        slug: 'pilak-boxanagar',
        description:
          'Ancient Buddhist and Hindu archaeological sites in South Tripura — stone carvings, terracotta sculptures, and structural remains dating back centuries, revealing Tripura\'s deep historical links with early Buddhist culture.',
        image: '/images/tripura/pilak 1.jpg',
        best_time: 'Oct – Mar',
      },
    ],
    attractions: [
      { name: 'Neermahal Palace', location: 'Melaghar', why_visit: 'Only water palace in Eastern India — rising majestically from Rudrasagar Lake at sunset.', best_time: 'Oct – Mar' },
      { name: 'Unakoti Rock Carvings', location: 'Kailashahar', why_visit: 'Ancient site with one less than a crore (koti) sculptured figures — a legend carved in stone.', best_time: 'Oct – Mar' },
      { name: 'Ujjayanta Palace', location: 'Agartala', why_visit: 'Majestic former royal palace now a world-class state museum of Tripura\'s history and tribal art.', best_time: 'Year round' },
      { name: 'Jampui Hills', location: 'North Tripura', why_visit: 'Highest point in Tripura with panoramic views, orange orchards, and tribal hospitality.', best_time: 'Oct – Feb' },
      { name: 'Sepahijala Sanctuary', location: 'Agartala vicinity', why_visit: 'Home to clouded leopards and spectacled monkeys just 25 km from the capital.', best_time: 'Oct – Mar' },
    ],
  },
];

export function getStateData(slug: string): StateStaticData | undefined {
  return STATE_DATA.find((s) => s.slug === slug);
}

export function getAllStatesData(): StateStaticData[] {
  return STATE_DATA;
}

export default STATE_DATA;
