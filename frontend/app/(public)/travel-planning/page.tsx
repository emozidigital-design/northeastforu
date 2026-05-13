import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ArrowRight, Map, Shield, Wallet, Compass } from 'lucide-react';

export const metadata = {
    title: 'Travel Planning Guides | NorthEastForU',
    description: 'Complete travel planning guides for North East India — permits, packing, budgeting, best time to visit and more.',
};

const GUIDES = [
    {
        slug: 'permits-and-permissions',
        icon: Shield,
        color: 'text-red-500 bg-red-50',
        title: 'Permits & Permissions',
        description: 'Which states need ILP or PAP? A complete guide for Indian and foreign nationals.',
    },
    {
        slug: 'best-time-to-visit',
        icon: Map,
        color: 'text-blue-500 bg-blue-50',
        title: 'Best Time to Visit',
        description: 'Month-by-month weather, festivals and season guide for all 8 states.',
    },

    {
        slug: 'how-to-get-around',
        icon: Compass,
        color: 'text-purple-500 bg-purple-50',
        title: 'Getting Around',
        description: 'Flights, trains, shared taxis, local buses — how to navigate the region efficiently.',
    },
];

export default function TravelPlanningPage() {
    return (
        <div>
            <HeroSection
                title="Travel Planning Guides"
                subtitle="Everything you need to know before you go to North East India."
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Planning Resources</h2>
                    <p className="text-gray-500 mb-12">Deep-dive guides crafted from real travel experience across the region.</p>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {GUIDES.map((g, i) => (
                        <ScrollReveal key={g.slug} delay={i * 60}>
                            <Link href={`/travel-planning/${g.slug}`}
                                className="group flex items-start gap-6 bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`p-4 rounded-2xl flex-shrink-0 ${g.color}`}>
                                    <g.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{g.title}</h3>
                                    <p className="text-gray-500 mt-2 leading-relaxed text-sm">{g.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Read guide <ArrowRight size={14} />
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
