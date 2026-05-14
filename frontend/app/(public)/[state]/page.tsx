export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { fetchStateBySlug, fetchAllItineraries } from '@/lib/api';
import { getStateData } from '@/lib/stateData';
import SmartImage from '@/components/ui/SmartImage';
import { MapPin, Clock, ArrowRight, Camera, Info, Zap, Lightbulb, Wallet, MoveRight, ChevronRight, Calendar } from 'lucide-react';
import AttractionTable from '@/components/state/AttractionTable';
import StateStickyBar from '@/components/state/StateStickyBar';
import DetailedFAQ from '@/components/ui/ImprovedFAQ';
import InsiderTipCard from '@/components/ui/InsiderTipCard';
import { getCuratedImage } from '@/lib/curatedImages';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

async function getCities(stateId: number) {
    try {
        const res = await fetch(`${API_URL}/cities?state_id=${stateId}&limit=50`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

async function getAttractionsForState(cities: any[]) {
    if (!cities.length) return [];
    try {
        // Just take attractions from the first 3 cities to get some hero images
        const cityIds = cities.slice(0, 3).map(c => c.id);
        const results = await Promise.all(
            cityIds.map(id => fetch(`${API_URL}/attractions?city_id=${id}&limit=5`).then(res => res.json()))
        );
        return results.flatMap(r => r.data || []);
    } catch { return []; }
}

async function getTips(slug: string) {
    try {
        const res = await fetch(`${API_URL}/content/tips/state/${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

async function getTours(stateId: number) {
    try {
        const res = await fetch(`${API_URL}/activities?state_id=${stateId}&limit=10`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        const items = data.data || [];
        return items.filter((a: any) => a.category?.toLowerCase().includes('tour') || a.category?.toLowerCase().includes('package') || !a.category).slice(0, 4);
    } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
    const { state: stateSlug } = await params;
    const data = await fetchStateBySlug(stateSlug);
    const staticData = getStateData(stateSlug);
    if (!data && !staticData) return { title: 'Not Found' };

    const stateName = data?.name || staticData?.name || 'State';
    const title = data?.seo_title || `${stateName} Travel Guide | NorthEastForU`;
    const description = data?.seo_description || staticData?.tagline || `Discover ${stateName}, explore cities, attractions and plan your perfect trip.`;
    const image = data?.featured_image || getCuratedImage(stateSlug, 'state') || staticData?.featured_image || `https://northeastforu.com/images/states/${stateSlug}.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: `/${data?.slug || stateSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://northeastforu.com/${stateSlug}`,
            siteName: 'NorthEastForU',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: stateName,
                },
            ],
            locale: 'en_IN',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
    const { state: stateSlug } = await params;
    const state = await fetchStateBySlug(stateSlug);
    const staticData = getStateData(stateSlug);

    if (!state && !staticData) notFound();

    const cities = state ? await getCities(state.id) : [];
    const attractions = cities.length > 0 ? await getAttractionsForState(cities) : [];
    const tours = state ? await getTours(state.id) : [];
    const tips = state ? await getTips(state.slug) : [];

    // Merge API + static data, static is the safety net
    const stateName = state?.name || staticData?.name || stateSlug;
    const stateTagline = state?.tagline || staticData?.tagline || `Discover the soul of ${stateName}.`;
    const stateDescription = state?.description || staticData?.description || '';
    const stateCapital = state?.capital || staticData?.capital || '—';
    const stateSeason = state?.best_season || staticData?.best_season || 'Oct – Apr';
    const stateLanguage = state?.language || staticData?.language || '—';
    const stateSlugFinal = state?.slug || stateSlug;

    // Cities: prefer API, fall back to static
    const displayCities = cities.length > 0
        ? cities
        : (staticData?.cities || []).map((c) => ({
            id: c.slug,
            name: c.name,
            slug: c.slug,
            description: c.description,
            featured_image: c.image,
            best_time_to_visit: c.best_time,
        }));

    // Attractions: prefer API, fall back to static
    const displayAttractions = attractions.length > 0
        ? attractions
        : (staticData?.attractions || []).map((a) => ({
            name: a.name,
            location: a.location,
            description: a.why_visit,
            best_time: a.best_time,
            city: { name: a.location },
        }));

    // Prepare multi-image array for hero
    const dbGallery = Array.isArray(state?.gallery_images)
        ? state.gallery_images
        : (typeof state?.gallery_images === 'string' ? JSON.parse(state.gallery_images) : []);

    const heroImages = dbGallery.length > 0
        ? dbGallery.map((img: string) => ({
            src: img.startsWith('http') ? img : `http://localhost:5006${img}`,
            label: stateName,
            location: 'Northeast India'
        }))
        : staticData?.hero_images && staticData.hero_images.length > 0
        ? staticData.hero_images
        : [
            {
                src: state?.featured_image || getCuratedImage(stateSlug, 'state') || staticData?.featured_image || `/images/states/${stateSlug}.jpg`,
                label: stateName,
                location: 'Northeast India'
            },
            ...displayAttractions.slice(0, 4).map((a: any) => ({
                src: a.featured_image || getCuratedImage(a.slug, 'attraction') || `/images/attractions/${a.slug || ''}.jpg`,
                label: a.name,
                location: a.city?.name || stateName
            }))
        ];

    return (
        <div className="bg-[#fcfdfc] min-h-screen font-sans">
            {/* Sticky Navigation Bar */}
            <StateStickyBar title={stateName} />

            {/* Premium Hero Section - Multi-Image Slider */}
            <HeroSection
                title={stateName}
                subtitle={stateTagline}
                images={heroImages}
                slug={stateSlugFinal}
                contentType="state"
                customClass="h-[45vh] min-h-[350px] max-h-[500px]"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <Breadcrumbs items={[{ label: stateName, href: `/${stateSlugFinal}` }]} />
                
                {/* ID-linked section for sticky nav: Discover */}
                <div id="tab-overview" className="scroll-mt-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                        {/* Left: Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            <ScrollReveal>
                                <section>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-1 w-12 bg-green-500 rounded-full"></div>
                                        <span className="text-green-600 font-bold uppercase tracking-wider text-sm">Discover</span>
                                    </div>
                                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                                        Welcome to {stateName}
                                    </h2>
                                    <div className="prose prose-lg text-gray-600 max-w-none prose-p:leading-relaxed prose-headings:text-gray-900 prose-li:text-gray-600">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {stateDescription}
                                        </ReactMarkdown>
                                    </div>
                                </section>
                            </ScrollReveal>

                            {/* State Specific Highlights/Gems */}
                            <ScrollReveal delay={100}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Must Experience</h4>
                                            <p className="text-sm text-gray-500 mt-1">Unique festivals and cultural traditions of {stateName}.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                                        <div className="bg-green-50 p-3 rounded-xl text-green-600">
                                            <Camera size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Photographer&apos;s Paradise</h4>
                                            <p className="text-sm text-gray-500 mt-1">Breathtaking landscapes and architectural marvels.</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Right: Quick Facts Card */}
                        <div className="lg:col-span-1">
                            <ScrollReveal delay={200}>
                                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-green-900/5 sticky top-28">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-green-600 p-2 rounded-lg text-white">
                                            <Info size={20} />
                                        </div>
                                        <h3 className="text-xl font-extrabold text-gray-900">Quick Facts</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
                                            <MapPin className="text-green-600 mt-1" size={20} />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Capital</p>
                                                <p className="text-gray-900 font-bold">{stateCapital}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
                                            <Calendar className="text-blue-600 mt-1" size={20} />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Best Season</p>
                                                <p className="text-gray-900 font-bold">{stateSeason}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50">
                                            <MoveRight className="text-orange-600 mt-1" size={20} />
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Language</p>
                                                <p className="text-gray-900 font-bold">{stateLanguage}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-50">
                                        <Link href="/plan-my-trip" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                                            Plan Your Trip <MoveRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>

                {/* Section Cities */}
                <div id="tab-cities" className="scroll-mt-32 mb-20">
                    <ScrollReveal>
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Iconic Cities & Towns</h2>
                                <p className="text-gray-500 mt-2">The most beloved destinations in {stateName}.</p>
                            </div>
                            <Link href="/explore" className="text-green-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                All Destiantions <ChevronRight size={18} />
                            </Link>
                        </div>

                        {displayCities.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayCities.map((city: any) => (
                                    <Link
                                        key={city.id || city.slug}
                                        href={`/${stateSlugFinal}/${city.slug}`}
                                        className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="h-64 relative overflow-hidden">
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                            <SmartImage
                                                src={city.featured_image || getCuratedImage(city.slug, 'city') || `/images/cities/${city.slug}.jpg`}
                                                alt={city.name}
                                                className="w-full h-full group-hover:scale-110 transition-transform duration-700 object-cover"
                                            />
                                            <div className="absolute bottom-5 left-6 z-20">
                                                <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
                                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                                    <Clock size={14} /> <span>{city.best_time_to_visit || city.best_time || 'Most times'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                                                {city.description || `Discover the unique charm and culture of ${city.name}.`}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Guide Available</span>
                                                <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                    <ArrowRight size={18} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
                                <MapPin size={48} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">Discoveries Coming Soon</h3>
                            </div>
                        )}
                    </ScrollReveal>
                </div>

                {/* Section Attractions */}
                <div id="tab-attractions" className="scroll-mt-32 mb-20">
                    <ScrollReveal delay={100}>
                        <div className="mb-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Prime Attractions</h2>
                            <p className="text-gray-500 mt-2">The must-visit sites that define {stateName}&apos;s identity.</p>
                        </div>
                        <AttractionTable
                            stateName={stateName}
                            attractions={displayAttractions.slice(0, 10).map((a: any) => ({
                                name: a.name,
                                location: a.city?.name || a.location || stateName,
                                why_visit: a.description?.slice(0, 140) + (a.description?.length > 140 ? '...' : '') || a.why_visit || 'Breathtaking beauty and cultural significance.',
                                best_time: a.best_time || 'Oct – Apr',
                                rating: 5
                            }))}
                        />
                    </ScrollReveal>
                </div>

                {/* Section Tours */}
                <div id="tab-tours" className="scroll-mt-32 mb-20">
                    <ScrollReveal>
                        <section className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Wallet className="text-green-600" size={18} />
                                        <span className="text-sm font-bold text-green-600 uppercase tracking-widest">Handcrafted</span>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{stateName} Exclusives</h3>
                                    <p className="text-gray-500 mt-2 italic">Curated itineraries designed for authentic experiences.</p>
                                </div>
                                <Link href="/itineraries" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all">
                                    Browse All Packages <ArrowRight size={18} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                {tours.length > 0 ? (
                                    tours.map((tour: any) => (
                                        <Link key={tour.id} href={`/activities/${tour.slug}`} className="group bg-gray-50/50 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:bg-green-50/80 transition-all border border-transparent hover:border-green-100">
                                            <div className="w-full sm:w-44 h-44 rounded-2xl overflow-hidden flex-shrink-0">
                                                <SmartImage src={tour.featured_image} alt={tour.name} className="w-full h-full group-hover:scale-110 transition-transform duration-500" fallbackType="adventure" searchKeyword={tour.name} />
                                            </div>
                                            <div className="flex flex-col py-1">
                                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">{tour.name}</h4>
                                                <p className="text-sm text-gray-500 mt-3 line-clamp-2 flex-grow">{tour.description || "An immersive travel experience through nature and heritage."}</p>
                                                <div className="mt-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                        <Clock size={12} /> <span>{tour.duration || 'Flexible'}</span>
                                                    </div>
                                                    <span className="text-green-700 font-bold text-sm group-hover:translate-x-1 transition-transform">View Details</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <>
                                        <div className="group bg-gray-50/50 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:bg-green-50 transition-colors">
                                            <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0">
                                                <SmartImage src="" alt="Package" className="w-full h-full" fallbackType="nature" searchKeyword={`${stateName} tour`} />
                                            </div>
                                            <div className="flex-grow py-2">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Essential {stateName}</h3>
                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">A comprehensive journey covering major highlights.</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-gray-400">5 Days · 4 Nights</span>
                                                    <span className="text-green-700 font-bold">Details →</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group bg-gray-50/50 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 hover:bg-green-50 transition-colors">
                                            <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0">
                                                <SmartImage src="" alt="Package" className="w-full h-full" fallbackType="adventure" searchKeyword={`${stateName} trekking`} />
                                            </div>
                                            <div className="flex-grow py-2">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">Heritage trail</h3>
                                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">Exploring the rugged terrains and deep history.</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-xs font-bold text-gray-400">7 Days · 6 Nights</span>
                                                    <span className="text-green-700 font-bold">Details →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    </ScrollReveal>
                </div>

                {/* FAQ & Tips Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 bg-white rounded-[3rem] p-8 md:p-16 border border-gray-50 shadow-sm">
                    {/* Insider Tips */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <Lightbulb className="text-orange-500" size={28} />
                            <h2 className="text-3xl font-extrabold text-gray-900">Local Insights</h2>
                        </div>
                        {tips.length > 0 ? (
                            <div className="space-y-6">
                                {tips.slice(0, 3).map((tip: any) => (
                                    <InsiderTipCard 
                                        key={tip.id} 
                                        tip_title={tip.tip_title} 
                                        tip_content={tip.tip_content} 
                                        tip_category={tip.tip_category || 'Timing'} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100 flex gap-4">
                                    <Zap className="text-orange-500 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Carry Cash</h4>
                                        <p className="text-gray-600 text-sm mt-1">Network can be spotty in remote hills, so keeping physical currency is advisable.</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex gap-4">
                                    <Info className="text-blue-500 flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-gray-900">Permits Required</h4>
                                        <p className="text-gray-600 text-sm mt-1">Some regions in {stateName} require an Inner Line Permit (ILP) for visitors.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* FAQ */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <ArrowRight className="text-green-600" size={28} />
                            <h2 className="text-3xl font-extrabold text-gray-900">FAQ</h2>
                        </div>
                        <DetailedFAQ pageSlug={stateSlugFinal} pageType="state" />
                    </div>
                </div>

                {/* Final Call to Action */}
                <div id="tab-plantrip" className="scroll-mt-32 mt-20">
                    <ScrollReveal>
                        <section className="bg-gradient-to-br from-gray-900 to-green-950 rounded-[3rem] overflow-hidden relative p-10 md:p-20 text-center">
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-10 left-10 w-40 h-40 bg-green-400 rounded-full blur-[100px]"></div>
                                <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-400 rounded-full blur-[100px]"></div>
                            </div>
                            
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/30">Start Your Journey</span>
                                <h2 className="text-4xl md:text-5xl font-black text-white mt-6 mb-8 leading-tight">
                                    Ready to explore the wonders of {stateName}?
                                </h2>
                                <p className="text-green-100 text-lg mb-12 opacity-80">
                                    Get a personalized itinerary crafted by local experts to make your North East trip unforgettable.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/plan-my-trip" className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-green-400 transition-all shadow-xl shadow-green-500/20">
                                        Personalize My Trip
                                    </Link>
                                    <a href="https://wa.me/918811909095" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                                        Chat with Expert
                                    </a>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
