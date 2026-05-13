import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmartImage from '@/components/ui/SmartImage';
import { fetchStates } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Explore North East India | NorthEastForU',
    description: 'Explore all 8 states of North East India — Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim and Tripura.',
};

export default async function ExplorePage() {
    let states: any[] = [];
    try {
        const data = await fetchStates();
        states = data?.data || [];
    } catch { states = []; }

    // Fallback if data is empty
    if (states.length === 0) {
        states = [
            { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', description: 'The land of the rising sun, with soaring Himalayas, pristine valleys and ancient monasteries.' },
            { name: 'Assam', slug: 'assam', description: 'Home of the one-horned rhino, golden tea gardens and the mighty Brahmaputra river.' },
            { name: 'Manipur', slug: 'manipur', description: 'The jewel of India — floating gardens, classical dance and the serene Loktak Lake.' },
            { name: 'Meghalaya', slug: 'meghalaya', description: 'The abode of clouds, with living root bridges, turquoise caves and silver waterfalls.' },
            { name: 'Mizoram', slug: 'mizoram', description: 'The land of blue mountains, vibrant Mizo culture and lush bamboo forests.' },
            { name: 'Nagaland', slug: 'nagaland', description: 'Home of the Naga tribes, the spectacular Hornbill Festival and rolling green hills.' },
            { name: 'Sikkim', slug: 'sikkim', description: 'A tiny Himalayan kingdom with snow peaks, Buddhist monasteries and magical landscapes.' },
            { name: 'Tripura', slug: 'tripura', description: 'Ancient palaces, tribal heritage and lush wildlife sanctuaries in the heart of the region.' },
        ];
    }

    return (
        <div>
            <HeroSection
                title="Explore North East India"
                subtitle="Eight extraordinary states — each a world of its own. Where will your journey begin?"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
                <ScrollReveal>
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">The Eight Sisters</h2>
                        <p className="text-gray-500 mt-2">Click on a state to explore its cities, attractions and experiences.</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {states.map((state: any, i: number) => (
                        <ScrollReveal key={state.id || state.slug} delay={i * 60}>
                            <Link href={`/${state.slug}`}
                                className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                                <div className="h-44 relative overflow-hidden">
                                    <SmartImage
                                        src={state.featured_image || `/images/states/${state.slug}.jpg`}
                                        alt={state.name}
                                        className="w-full h-full"
                                        fallbackType="nature"
                                        searchKeyword={state.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-green-600 transition-colors">{state.name}</h3>
                                    <p className="text-gray-500 text-sm mt-2 leading-relaxed flex-1 line-clamp-3">
                                        {state.description || `Discover the wonder of ${state.name}.`}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-green-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Explore <ArrowRight size={14} />
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
