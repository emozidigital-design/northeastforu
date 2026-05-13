import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { MapPin, Clock, DollarSign, ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
    title: 'Itineraries for North East India | NorthEastForU',
    description: 'Explore curated itineraries for North East India — from 3-day getaways to 14-day grand tours across Meghalaya, Assam, Sikkim and more.',
};

async function fetchItineraries() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/itineraries`, {
            next: { revalidate: 60 }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data?.data || [];
    } catch { return []; }
}

const FALLBACK_ITINERARIES = [
    {
        id: 1, slug: 'meghalaya-3-days', title: 'Meghalaya Weekend Escape',
        description: 'Living root bridges, Cherrapunji waterfalls and the vibrant Shillong city.',
        duration_days: 3, price_estimate: 12000,
    },
    {
        id: 2, slug: 'assam-kaziranga-5-days', title: 'Assam Wildlife & Tea',
        description: 'Kaziranga rhinos, Brahmaputra cruise and iconic tea garden stays.',
        duration_days: 5, price_estimate: 20000,
    },
    {
        id: 3, slug: 'sikkim-7-days', title: 'Sikkim Himalayan Journey',
        description: 'Gangtok monasteries, Tsomgo Lake, Yumthang Valley and Pelling views.',
        duration_days: 7, price_estimate: 30000,
    },
    {
        id: 4, slug: 'northeast-grand-14-days', title: 'North East Grand Tour',
        description: 'The ultimate 14-day journey across Assam, Meghalaya, Nagaland and Arunachal.',
        duration_days: 14, price_estimate: 65000,
    },
];

export default async function ItinerariesPage() {
    let itineraries = await fetchItineraries();
    if (itineraries.length === 0) itineraries = FALLBACK_ITINERARIES;

    return (
        <div>
            <HeroSection
                title="Travel Itineraries"
                subtitle="Expertly crafted day-by-day plans for every kind of North East India traveller."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">All Itineraries</h2>
                        <p className="text-gray-500 mt-2">{itineraries.length} curated trips</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {itineraries.map((itin: any, i: number) => (
                        <ScrollReveal key={itin.id} delay={i * 60}>
                            <Link href={`/itineraries/${itin.slug}`}
                                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="flex items-center gap-1.5 text-sm font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                                            <Clock size={13} /> {itin.duration_days} Days
                                        </span>
                                        {itin.price_estimate && (
                                            <span className="flex items-center gap-1.5 text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                                                <DollarSign size={13} /> From ₹{Number(itin.price_estimate).toLocaleString('en-IN')}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors flex-1">
                                        {itin.title}
                                    </h3>
                                    <p className="text-gray-500 mt-3 leading-relaxed text-sm line-clamp-3">
                                        {itin.description}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-green-600 font-semibold text-sm group-hover:gap-3 transition-all">
                                        View itinerary <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
