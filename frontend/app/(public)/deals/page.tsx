import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Tag, Clock, MapPin, ArrowRight, Star } from 'lucide-react';

export const metadata = {
    title: 'Travel Deals & Packages | NorthEastForU',
    description: 'Exclusive travel deals and curated packages for North East India — Meghalaya, Assam, Sikkim, Arunachal and more.',
};

const DEALS = [
    {
        id: 1, badge: 'Best Seller', badgeColor: 'bg-yellow-400 text-yellow-900',
        title: 'Meghalaya 4N/5D',
        description: 'Shillong, Cherrapunji, living root bridges & Dawki river.',
        price: 18500, originalPrice: 24000, duration: '5 Days', location: 'Meghalaya',
        inclusions: ['Hotel (3★)', 'Daily breakfast', 'All transfers', 'Guide'],
    },
    {
        id: 2, badge: 'Wildlife', badgeColor: 'bg-green-500 text-white',
        title: 'Assam Wildlife Safari 3N/4D',
        description: 'One-horned rhino safaris in Kaziranga & Brahmaputra cruise.',
        price: 22000, originalPrice: 28000, duration: '4 Days', location: 'Assam',
        inclusions: ['Heritage resort stay', 'Jeep safari x2', 'Boat ride', 'All meals'],
    },
    {
        id: 3, badge: 'Himalayan', badgeColor: 'bg-blue-500 text-white',
        title: 'Sikkim Himalayan Retreat 5N/6D',
        description: 'Gangtok, Tsomgo Lake, Yumthang Valley & Namchi.',
        price: 28000, originalPrice: 36000, duration: '6 Days', location: 'Sikkim',
        inclusions: ['3★ hotels', 'Cab for sightseeing', 'Permits', 'Breakfast'],
    },
    {
        id: 4, badge: '14 Days', badgeColor: 'bg-purple-500 text-white',
        title: 'North East Grand Tour',
        description: 'Assam, Meghalaya, Nagaland & Arunachal in one epic journey.',
        price: 65000, originalPrice: 85000, duration: '14 Days', location: 'Multi-State',
        inclusions: ['All hotels', 'All transfers', 'Permits', 'Expert guide'],
    },
];

export default function DealsPage() {


    return (
        <div>
            <HeroSection
                title="Deals & Packages"
                subtitle="Curated travel packages for North East India."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <div className="mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900">Handpicked Packages</h2>
                        <p className="text-gray-500 mt-2">All packages include accommodation, transport, and local expertise.</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {DEALS.map((deal, i) => (
                        <ScrollReveal key={deal.id} delay={i * 60}>
                            <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                                <div className="p-8 flex flex-col flex-1">
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${deal.badgeColor}`}>{deal.badge}</span>
                                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-green-600 transition-colors">{deal.title}</h3>
                                    <p className="text-gray-500 mt-2 text-sm leading-relaxed flex-1">{deal.description}</p>

                                    <div className="flex gap-4 mt-4 text-sm text-gray-400">
                                        <span className="flex items-center gap-1"><Clock size={13} /> {deal.duration}</span>
                                        <span className="flex items-center gap-1"><MapPin size={13} /> {deal.location}</span>
                                    </div>

                                    <ul className="mt-4 space-y-1">
                                        {deal.inclusions.map((inc) => (
                                            <li key={inc} className="flex items-center gap-2 text-sm text-gray-600">
                                                <Star size={11} className="text-yellow-400 flex-shrink-0" /> {inc}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-6">
                                        <div />
                                        <Link href="/contact"
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all group-hover:gap-3">
                                            Enquire <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal>
                    <div className="mt-16 bg-green-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl font-extrabold mb-4">Want a Custom Package?</h2>
                        <p className="text-green-100 mb-8 max-w-xl mx-auto">Tell us your dream trip and our travel specialists will craft a personalised itinerary just for you.</p>
                        <Link href="/contact" className="bg-white text-green-700 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all inline-flex items-center gap-2">
                            Get Custom Quote <ArrowRight size={16} />
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
