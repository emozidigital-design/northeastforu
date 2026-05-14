export const dynamic = 'force-dynamic';

import HeroSection from '@/components/ui/HeroSection';
import CardGrid from '@/components/ui/CardGrid';
import StateCard from '@/components/ui/StateCard';
import { fetchStates, fetchAllBlogs, fetchAllItineraries } from '@/lib/api';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getCuratedImage } from '@/lib/curatedImages';
import { getAllStatesData } from '@/lib/stateData';
import USPSection from '@/components/ui/USPSection';
import BentoDestinations from '@/components/ui/BentoDestinations';
import FeaturedCarousel from '@/components/ui/FeaturedCarousel';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default async function Home() {
    const statesRes = await fetchStates();
    const states: any[] = statesRes?.data || [];
    const itinerariesRes = await fetchAllItineraries();
    const itineraries = itinerariesRes?.data || [];

    const staticStates = getAllStatesData();

    // Merge API states with static data: API data wins on image/description when available
    const statesData = staticStates.map((staticState) => {
        const apiState = states.find((s: any) => s.slug === staticState.slug);
        const curatedFallback = getCuratedImage(staticState.slug, 'state');
        return {
            slug: staticState.slug,
            name: apiState?.name || staticState.name,
            image: apiState?.featured_image || staticState.featured_image || curatedFallback || '',
            theme: staticState.theme,
            best_season: apiState?.best_season || staticState.best_season,
            city_count: staticState.cities.length,
        };
    });

    const bentoItems = itineraries.slice(0, 4).map((pkg: any, idx: number) => ({
        id: pkg.id,
        title: pkg.title,
        subtitle: pkg.category || "Tour Package",
        image: pkg.featured_image || '',
        size: idx === 0 ? "large" : idx === 3 ? "horizontal" : "small",
        link: `/itineraries/${pkg.slug}`
    }));

    const blogsRes = await fetchAllBlogs();
    const blogs = blogsRes?.data || [];

    return (
        <div className="bg-slate-50 min-h-screen">
            <HeroSection
                title="Discover the Unseen"
                subtitle="Exclusive, curated journeys into the heart of North East India. Where nature meets culture."
                showSearch={true}
            />

            {/* NEW: Asymmetric Bento Grid for Top Experiences */}
            <BentoDestinations destinations={bentoItems} />

            {/* NEW: Premium Dark Theme Trust Section */}
            <USPSection />

            {/* NEW: Horizontal Scrolling Packages Carousel */}
            {itineraries.length > 0 && (
                <FeaturedCarousel itineraries={itineraries} />
            )}

            <ScrollReveal>
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-display">
                                    Browse by State
                                </h2>
                                <p className="text-gray-500 mt-3 text-lg">
                                    Discover the diverse landscapes and unique cultures of the Seven Sisters and Sikkim.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statesData.map((state) => (
                                <StateCard
                                    key={state.slug}
                                    name={state.name}
                                    slug={state.slug}
                                    image={state.image}
                                    theme={state.theme}
                                    best_season={state.best_season}
                                    city_count={state.city_count}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <ScrollReveal delay={200}>
                <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <BookOpen className="text-emerald-600" size={20} />
                                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Travel Guides</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-display">
                                    Stories from the Hills
                                </h2>
                            </div>
                            <Link href="/blog" className="text-emerald-700 font-bold hover:underline mb-2 flex items-center gap-2">
                                Read all stories <span>→</span>
                            </Link>
                        </div>
                        <CardGrid items={blogs.slice(0, 4).map((b: any) => ({
                            title: b.title,
                            slug: b.slug,
                            image: b.featured_image,
                            description: b.excerpt || b.title
                        }))} type="blog" />
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
}
