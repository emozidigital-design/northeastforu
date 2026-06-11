export const dynamic = 'force-dynamic';

import HeroSection from '@/components/ui/HeroSection';
import CardGrid from '@/components/ui/CardGrid';
import { fetchStates, fetchAllBlogs, fetchAllItineraries } from '@/lib/api';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatesGrid from '@/components/ui/StatesGrid';
import { getCuratedImage } from '@/lib/curatedImages';
import { getAllStatesData } from '@/lib/stateData';
import USPSection from '@/components/ui/USPSection';
import BentoDestinations from '@/components/ui/BentoDestinations';
import FeaturedCarousel from '@/components/ui/FeaturedCarousel';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import NortheastMapWrapper from '@/components/ui/NortheastMapWrapper';

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
        // Only use API image if it's a real external URL (not a localhost/relative path)
        const apiImage = apiState?.featured_image?.startsWith('http') && !apiState.featured_image.includes('localhost')
            ? apiState.featured_image
            : null;
        return {
            slug: staticState.slug,
            name: apiState?.name || staticState.name,
            image: apiImage || staticState.featured_image || curatedFallback || '',
            theme: staticState.theme,
            best_season: apiState?.best_season || staticState.best_season,
            city_count: staticState.cities.length,
        };
    });

    const bentoItems = [
        {
            id: 1,
            title: "Classic Assam & Meghalaya",
            subtitle: "Assam · Meghalaya",
            category: "NATURE",
            images: [
                "/images/assam/assam-2.jpg",
                "/images/assam/assam-3.jpg",
                "/images/assam/assam-4.jpg",
                "/images/meghalaya/meghalaya-1.jpg",
                "/images/meghalaya/meghalaya-2.jpg",
            ],
            size: "large",
            link: "/itineraries/classic-assam-meghalaya",
            duration: "8 Days",
            tagline: "Rhinos, root bridges & rain forests",
        },
        {
            id: 2,
            title: "Nagaland Cultural Trail",
            subtitle: "Nagaland",
            category: "CULTURE",
            images: [
                "/images/nagaland/nagaland-1.jpg",
                "/images/nagaland/nagaland-2.jpg",
                "/images/nagaland/nagaland-3.jpg",
            ],
            size: "small",
            link: "/itineraries/nagaland-cultural-trail",
            duration: "6 Days",
            tagline: "Ancient tribes & hornbill festivals",
        },
        {
            id: 3,
            title: "Sikkim Himalayan Explorer",
            subtitle: "Sikkim",
            category: "ADVENTURE",
            images: [
                "/images/sikkim/sikkim-1.jpg",
                "/images/sikkim/sikkim-2.jpg",
                "/images/sikkim/sikkim-3.jpg",
            ],
            size: "small",
            link: "/itineraries/sikkim-himalayan-explorer",
            duration: "7 Days",
            tagline: "High passes & ancient monasteries",
        },
        {
            id: 4,
            title: "Northeast Grand Tour",
            subtitle: "Full Northeast",
            category: "LUXURY",
            images: [
                "/images/arunachal-pradesh/arunachal-pradesh-1.jpg",
                "/images/arunachal-pradesh/arunachal-pradesh-2.jpg",
                "/images/arunachal-pradesh/arunachal-pradesh-3.jpg",
                "/images/sikkim/sikkim-2.jpg",
                "/images/meghalaya/meghalaya-3.jpg",
            ],
            size: "horizontal",
            link: "/itineraries/northeast-grand-tour",
            duration: "14 Days",
            tagline: "The complete northeast experience",
        },
    ];

    const blogsRes = await fetchAllBlogs();
    const blogs = blogsRes?.data || [];

    return (
        <div className="bg-slate-50 min-h-screen">
            <HeroSection
                title="Discover the Unseen"
                subtitle="Exclusive, curated journeys into the heart of North East India. Where nature meets culture."
                showSearch={false}
            />

            {/* NEW: Asymmetric Bento Grid for Top Experiences */}
            <BentoDestinations destinations={bentoItems} />

            {/* NEW: Premium Dark Theme Trust Section */}
            <USPSection />

            {/* NEW: Horizontal Scrolling Packages Carousel */}
            {itineraries.length > 0 && (
                <FeaturedCarousel itineraries={itineraries} />
            )}

            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollReveal>
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
                    </ScrollReveal>
                    <StatesGrid statesData={statesData} />
                </div>
            </section>

            <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
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
                    </ScrollReveal>
                    <ScrollReveal delay={150}>
                        <CardGrid items={blogs.slice(0, 4).map((b: any) => ({
                            title: b.title,
                            slug: b.slug,
                            image: b.featured_image,
                            description: b.excerpt || b.title
                        }))} type="blog" />
                    </ScrollReveal>
                </div>
            </section>

            {/* Interactive Northeast Map */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="h-[2px] w-10 bg-[#7fff27] block" />
                                <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Interactive</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                                    Explore the Region
                                </h2>
                                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                                    Eight states, one extraordinary corner of the world. Click a pin to start exploring.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <NortheastMapWrapper />
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
