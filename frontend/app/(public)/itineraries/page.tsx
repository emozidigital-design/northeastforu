import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/ui/HeroSection';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Itineraries for North East India | NorthEastForU',
    description: 'Explore curated itineraries for North East India — from 3-day getaways to 14-day grand tours across Meghalaya, Assam, Sikkim and more.',
};

async function fetchItineraries() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/itineraries`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return [];
        const data = await res.json();
        return data?.data || [];
    } catch { return []; }
}

const FALLBACK_ITINERARIES = [
    {
        id: 1,
        slug: 'classic-assam-meghalaya',
        title: 'Classic Assam & Meghalaya',
        description: 'Kaziranga rhinos, living root bridges, Cherrapunji waterfalls and the vibrant Shillong city. The perfect introduction to North East India.',
        duration_days: 8,
        price_estimate: 28000,
        category: 'NATURE',
        images: [
            '/images/assam/assam-2.jpg',
            '/images/assam/assam-3.jpg',
            '/images/assam/assam-4.jpg',
            '/images/meghalaya/meghalaya-1.jpg',
            '/images/meghalaya/meghalaya-2.jpg',
        ],
    },
    {
        id: 2,
        slug: 'nagaland-cultural-trail',
        title: 'Nagaland Cultural Trail',
        description: 'Immerse yourself in the world of the Naga tribes — Hornbill Festival, Dzükou Valley treks, ancient warrior villages and living traditions.',
        duration_days: 6,
        price_estimate: 22000,
        category: 'CULTURE',
        images: [
            '/images/nagaland/nagaland-1.jpg',
            '/images/nagaland/nagaland-2.jpg',
            '/images/nagaland/nagaland-3.jpg',
        ],
    },
    {
        id: 3,
        slug: 'sikkim-himalayan-explorer',
        title: 'Sikkim Himalayan Explorer',
        description: 'High-altitude monasteries, Tsomgo Lake, Yumthang Valley wildflowers and the snow-capped Kanchenjunga panoramas from Pelling.',
        duration_days: 7,
        price_estimate: 30000,
        category: 'ADVENTURE',
        images: [
            '/images/sikkim/sikkim-1.jpg',
            '/images/sikkim/sikkim-2.jpg',
            '/images/sikkim/sikkim-3.jpg',
        ],
    },
    {
        id: 4,
        slug: 'northeast-grand-tour',
        title: 'Northeast Grand Tour',
        description: 'The ultimate 14-day odyssey across Assam, Meghalaya, Nagaland and Arunachal Pradesh — wildlife, culture, mountains and mysticism.',
        duration_days: 14,
        price_estimate: 65000,
        category: 'LUXURY',
        images: [
            '/images/arunachal-pradesh/arunachal-pradesh-1.jpg',
            '/images/arunachal-pradesh/arunachal-pradesh-2.jpg',
            '/images/meghalaya/meghalaya-2.jpg',
        ],
    },
];

const CATEGORY_STYLES: Record<string, string> = {
    NATURE:    'bg-emerald-100 text-emerald-700',
    CULTURE:   'bg-amber-100 text-amber-700',
    ADVENTURE: 'bg-sky-100 text-sky-700',
    LUXURY:    'bg-violet-100 text-violet-700',
};

// Map API slugs/titles to local images
function resolveImages(itin: any): string[] {
    if (itin.images?.length) return itin.images;
    const slug: string = itin.slug ?? '';
    if (slug.includes('assam') || slug.includes('meghalaya') || slug.includes('classic'))
        return ['/images/assam/assam-2.jpg', '/images/meghalaya/meghalaya-1.jpg'];
    if (slug.includes('nagaland'))
        return ['/images/nagaland/nagaland-1.jpg', '/images/nagaland/nagaland-2.jpg'];
    if (slug.includes('sikkim'))
        return ['/images/sikkim/sikkim-1.jpg', '/images/sikkim/sikkim-2.jpg'];
    if (slug.includes('arunachal') || slug.includes('grand'))
        return ['/images/arunachal-pradesh/arunachal-pradesh-1.jpg', '/images/arunachal-pradesh/arunachal-pradesh-2.jpg'];
    if (slug.includes('mizoram'))
        return ['/images/mizoram/mizoram-1.jpg'];
    if (slug.includes('manipur'))
        return ['/images/manipur/manipur-1.jpg'];
    if (slug.includes('tripura'))
        return ['/images/tripura/tripura-1.jpg'];
    return ['/images/assam/assam-2.jpg'];
}

export default async function ItinerariesPage() {
    let itineraries = await fetchItineraries();
    if (itineraries.length === 0) itineraries = FALLBACK_ITINERARIES;

    return (
        <div className="bg-white">
            <HeroSection
                title="Travel Itineraries"
                subtitle="Expertly crafted day-by-day plans for every kind of North East India traveller."
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="h-[2px] w-10 bg-[#7fff27] block" />
                        <span className="text-green-600 font-bold uppercase tracking-widest text-sm">
                            Curated Journeys
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        All Itineraries
                    </h2>
                    <p className="text-gray-400 mt-2 text-base">
                        {itineraries.length} curated trips
                    </p>
                </div>

                {/* Alternating rows */}
                <div className="flex flex-col divide-y divide-gray-100">
                    {itineraries.map((itin: any, i: number) => {
                        const imgs = resolveImages(itin);
                        const isEven = i % 2 === 0;
                        const catStyle = CATEGORY_STYLES[itin.category ?? ''] ?? 'bg-gray-100 text-gray-600';

                        return (
                            <Link
                                key={itin.id}
                                href={`/itineraries/${itin.slug}`}
                                className="group grid grid-cols-1 md:grid-cols-2 gap-0 py-12 md:py-16 items-center hover:bg-gray-50/60 transition-colors duration-300 rounded-2xl px-2"
                            >
                                {/* Image — switches side based on even/odd */}
                                <div
                                    className={`relative h-[260px] md:h-[340px] rounded-2xl overflow-hidden ${
                                        isEven ? 'md:order-2' : 'md:order-1'
                                    }`}
                                >
                                    <Image
                                        src={imgs[0]}
                                        alt={itin.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        unoptimized
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />

                                    {/* Duration badge on image */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                            <Clock size={11} />
                                            {itin.duration_days} Days
                                        </span>
                                        {itin.category && (
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full ${catStyle}`}>
                                                {itin.category}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Text content */}
                                <div
                                    className={`flex flex-col justify-center ${
                                        isEven
                                            ? 'md:order-1 md:pr-14 lg:pr-20 mt-8 md:mt-0'
                                            : 'md:order-2 md:pl-14 lg:pl-20 mt-8 md:mt-0'
                                    }`}
                                >
                                    {/* Index number */}
                                    <span className="text-[11px] font-black tracking-[0.2em] text-gray-300 uppercase mb-4">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-green-700 transition-colors leading-tight mb-4">
                                        {itin.title}
                                    </h3>

                                    <p className="text-gray-500 leading-relaxed text-base mb-6 line-clamp-3">
                                        {itin.description}
                                    </p>

                                    {/* Price + CTA row */}
                                    <div className="flex items-center justify-between">
                                        {itin.price_estimate && (
                                            <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                                                <IndianRupee size={14} className="text-green-600" />
                                                From ₹{Number(itin.price_estimate).toLocaleString('en-IN')}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-green-600 group-hover:gap-3 transition-all duration-200">
                                            View itinerary
                                            <ArrowRight size={15} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
