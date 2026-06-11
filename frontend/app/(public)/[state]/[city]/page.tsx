import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import SmartImage from '@/components/ui/SmartImage';
import WeatherWidget from '@/components/ui/WeatherWidget';
import TripPlanningForm from '@/components/ui/TripPlanningForm';

import CityPlacesGrid from '@/components/city/CityPlacesGrid';
import { Camera, ArrowRight, MapPin, ChevronRight, Clock, Calendar, Info, Zap, Lightbulb, Wallet, MoveRight } from 'lucide-react';
import { fetchCityBySlug } from '@/lib/api';
import { getCuratedImage } from '@/lib/curatedImages';
import { getCityData } from '@/lib/cityData';
import ImprovedFAQ from '@/components/ui/ImprovedFAQ';
import InsiderTipCard from '@/components/ui/InsiderTipCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

async function getAttractions(cityId: number) {
    try {
        const res = await fetch(`${API_URL}/attractions?city_id=${cityId}&limit=50`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

async function getTours(cityId: number) {
    try {
        const res = await fetch(`${API_URL}/activities?city_id=${cityId}&limit=6`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        const items = data.data || [];
        return items.filter((a: { category?: string }) => a.category?.toLowerCase().includes('tour') || a.category?.toLowerCase().includes('package') || !a.category).slice(0, 4);
    } catch { return []; }
}

async function getTips(slug: string) {
    try {
        const res = await fetch(`${API_URL}/content/tips/city/${slug}`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }) {
    const { state: stateSlug, city: citySlug } = await params;
    const city = await fetchCityBySlug(citySlug);
    const staticCity = getCityData(citySlug);

    if (!city && !staticCity) return { title: 'Not Found' };

    const cityName = city?.name || staticCity?.name || citySlug;
    const title = city?.seo_title || `${cityName} Travel Guide | NorthEastForU`;
    const description = city?.seo_description || staticCity?.description?.slice(0, 160) || `Explore ${cityName}, discover attractions and plan your visit.`;
    const image = city?.featured_image || staticCity?.featured_image || getCuratedImage(citySlug, 'city') || `https://northeastforu.com/images/cities/${citySlug}.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: `/${stateSlug}/${citySlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://northeastforu.com/${stateSlug}/${citySlug}`,
            siteName: 'NorthEastForU',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: cityName,
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

export default async function CityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
    const { state: stateParam, city: cityParam } = await params;
    const city = await fetchCityBySlug(cityParam);
    const staticCity = getCityData(cityParam);

    // Require at least one data source
    if (!city && !staticCity) notFound();

    const attractions = city ? await getAttractions(city.id) : [];
    const tours = city ? await getTours(city.id) : [];
    const tips = city ? await getTips(city.slug) : [];
    const stateName = city?.state?.name || staticCity?.state || stateParam.replace(/-/g, ' ');

    // Merge: API is authoritative, static is the safety net
    const cityName = city?.name || staticCity?.name || cityParam;
    const citySlug = city?.slug || cityParam;
    const cityTagline = city?.tagline || staticCity?.tagline || `Discover ${cityName}`;
    const cityDescription = city?.description || staticCity?.description || '';
    const cityBestTime = city?.best_time_to_visit || staticCity?.best_time || 'Oct – Apr';

    // Prepare multi-image array for hero
    const dbGallery = Array.isArray(city?.gallery_images)
        ? city.gallery_images
        : (typeof city?.gallery_images === 'string' ? JSON.parse(city.gallery_images) : []);

    const heroImages = staticCity?.hero_images
        ? staticCity.hero_images
        : dbGallery.length > 0
        ? dbGallery.map((img: string) => ({
            src: img.startsWith('http') ? img : `http://localhost:5006${img}`,
            label: cityName,
            location: stateName
        }))
        : [
            {
                src: city?.featured_image || staticCity?.featured_image || getCuratedImage(citySlug, 'city') || `/images/cities/${citySlug}.jpg`,
                label: cityName,
                location: stateName
            },
            ...attractions.slice(0, 4).map((a: any) => ({
                src: a.featured_image || getCuratedImage(a.slug, 'attraction') || `/images/attractions/${a.slug}.jpg`,
                label: a.name,
                location: cityName
            }))
        ];

    return (
        <div className="bg-[#fcfdfc] min-h-screen font-sans">
            {/* Premium Hero Section - Reduced Height & Multi-Image Slider */}
            <HeroSection
                title={cityName}
                subtitle={cityTagline}
                images={heroImages}
                slug={citySlug}
                contentType="city"
                customClass="h-[45vh] min-h-[350px] max-h-[500px]"
            />

            {/* Main Header Information */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-5">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: stateName, href: `/${stateParam}` },
                        { label: cityName, href: `/${stateParam}/${citySlug}` }
                    ]}
                    className="mb-6"
                />

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-green-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest">Destinations</span>
                            <span className="text-sm font-bold text-green-600 uppercase tracking-wider">{stateName}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f1e14] leading-tight tracking-tight">
                            {cityName}
                        </h1>
                        <p className="mt-3 text-lg text-gray-500 font-medium italic">
                            &ldquo;{cityTagline}&rdquo;
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
                            <Camera size={18} className="text-green-600" />
                            <span className="text-sm font-bold text-gray-900">{attractions.length || staticCity?.places?.length || 0} Places</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
                            <Zap size={18} className="text-amber-500" />
                            <span className="text-sm font-bold text-gray-900">{tours.length} Experiences</span>
                        </div>
                    </div>
                </div>
            </div>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Main Content */}
                    <div className="flex-1 lg:max-w-[740px] xl:max-w-[800px] space-y-20 pt-12">
                        
                        {/* Tab 1: Discover / Overview */}
                        <ScrollReveal>
                        <section id="tab-overview" className="space-y-8 scroll-mt-32">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                                    <Info size={24} />
                                </div>
                                <h2 className="text-3xl font-extrabold text-[#0f1e14]">Why Visit {cityName}?</h2>
                            </div>

                            {cityDescription ? (
                                <div className="space-y-10">
                                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                                        <div className="text-gray-600 text-[18px] leading-[1.8] prose max-w-none prose-p:mb-4 prose-headings:text-[#0f1e14] prose-li:text-gray-600">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {cityDescription}
                                            </ReactMarkdown>
                                        </div>
                                    </div>

                                    {/* Quick Facts Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gradient-to-br from-white to-green-50/30 p-8 rounded-3xl border border-green-100/50 shadow-sm overflow-hidden relative group">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                                                <MoveRight size={80} />
                                            </div>
                                            <h3 className="flex items-center gap-2 font-bold text-green-800 text-lg mb-6">
                                                <Zap size={18} /> Travel Quick Facts
                                            </h3>
                                            <ul className="space-y-5">
                                                <li className="flex items-start gap-4">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-green-600"><Clock size={18} /></div>
                                                    <div>
                                                        <p className="text-xs font-bold text-green-800/60 uppercase tracking-widest">Best Time</p>
                                                        <p className="text-sm font-bold text-gray-900">{cityBestTime}</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-4">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600"><Wallet size={18} /></div>
                                                    <div>
                                                        <p className="text-xs font-bold text-amber-800/60 uppercase tracking-widest">Est. Budget</p>
                                                        <p className="text-sm font-bold text-gray-900">₹{city?.budget_per_day ? `${city.budget_per_day}/day` : '2500 - 4500 / day'}</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start gap-4">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600"><MapPin size={18} /></div>
                                                    <div>
                                                        <p className="text-xs font-bold text-blue-800/60 uppercase tracking-widest">Location</p>
                                                        <p className="text-sm font-bold text-gray-900">{stateName}, North East India</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-br from-white to-amber-50/20 p-8 rounded-3xl border border-amber-100/50 shadow-sm">
                                            <h3 className="flex items-center gap-2 font-bold text-amber-800 text-lg mb-6">
                                                <Lightbulb size={20} /> How to Reach
                                            </h3>
                                            <div className="text-sm text-gray-600 leading-relaxed prose prose-sm max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {city?.how_to_reach || staticCity?.how_to_reach || `${cityName} is well connected by road and rail from major cities in ${stateName}. The nearest airport depends on the specific location but is generally within a few hours reach.`}
                                                </ReactMarkdown>
                                            </div>
                                            <button className="mt-6 flex items-center gap-2 text-sm font-bold text-amber-700 hover:gap-3 transition-all">
                                                View Route Map <MoveRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Detailed description coming soon.</p>
                            )}
                        </section>
                        </ScrollReveal>

                        {/* Tab 2: Top Attractions */}
                        <ScrollReveal>
                        <section id="tab-attractions" className="space-y-10 scroll-mt-32 pt-10 border-t border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-[#0f1e14]">Must-Visit Attractions</h2>
                                    <p className="text-gray-500 mt-2 font-medium">Curated list of the best places to explore in {cityName}</p>
                                </div>
                                <div className="text-green-700 font-bold text-sm bg-green-50 px-4 py-2 rounded-full">
                                    {attractions.length || staticCity?.places?.length || 0} Places Found
                                </div>
                            </div>

                            {/* Static places grid (rich content from markdown) */}
                            {staticCity?.places && staticCity.places.length > 0 && (
                                <CityPlacesGrid places={staticCity.places} />
                            )}

                            {/* API attractions (linked cards with detail pages) */}
                            {attractions.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {attractions.map((a: { id: number, slug: string, name: string, category: string, description?: string, featured_image?: string }) => (
                                        <Link
                                            key={a.id}
                                            href={`/${stateParam}/${citySlug}/${a.slug}`}
                                            className="group relative flex flex-col bg-white border border-gray-100/80 rounded-[32px] overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-700"
                                        >
                                            <div className="relative h-[250px] w-full overflow-hidden">
                                                <SmartImage
                                                    src={a.featured_image || `/images/attractions/${a.slug}.jpg`}
                                                    alt={a.name}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                    fallbackType="adventure"
                                                    searchKeyword={a.name}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider uppercase bg-white/30 backdrop-blur-md rounded-full border border-white/20 text-white shadow-sm">
                                                        {a.category || 'Sightseeing'}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                                    <h3 className="text-2xl font-bold leading-tight drop-shadow-lg mb-1">{a.name}</h3>
                                                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                                                        <MapPin size={12} />
                                                        <span>{cityName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-7 flex-1 flex flex-col justify-between">
                                                <p className="text-gray-500 text-[15px] line-clamp-2 leading-relaxed mb-6 font-medium">
                                                    {a.description || 'Discover the hidden beauty and cultural significance of this remarkable attraction.'}
                                                </p>
                                                <div className="flex items-center justify-between group-hover:text-green-600 transition-colors">
                                                    <span className="text-sm font-bold">Explore Details</span>
                                                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                                        <ArrowRight size={18} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-20 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                                    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 mb-6">
                                        <Camera size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No attractions yet</h3>
                                    <p className="text-gray-500 mt-2 text-center max-w-sm font-medium leading-relaxed">We are currently mapping the best spots in {cityName}. Check back soon!</p>
                                </div>
                            )}
                        </section>
                        </ScrollReveal>

                        {/* Insider Tips Section (Added) */}
                        {tips.length > 0 && (
                        <ScrollReveal>
                            <section className="space-y-8 pt-10 border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Lightbulb size={24} />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-[#0f1e14]">Insider Tips</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tips.map((tip: any) => (
                                        <div key={tip.id} className="bg-[#1a1c1a] rounded-3xl p-1 shadow-sm">
                                            <InsiderTipCard 
                                                tip_title={tip.tip_title} 
                                                tip_content={tip.tip_content} 
                                                tip_category={tip.tip_category} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </ScrollReveal>
                        )}

                        {/* Tab 3: Curated Tours */}
                        <ScrollReveal>
                        <section id="tab-tours" className="space-y-10 scroll-mt-32 pt-10 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-[#0f1e14]">Curated Experiences</h2>
                                    <p className="text-gray-500 mt-2 font-medium">Handpicked tours and packages for a hassle-free journey in {cityName}</p>
                                </div>
                                <Link href="/activities" className="hidden sm:flex items-center gap-2 p-3 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all text-green-700 font-bold text-sm">
                                    Browse All <ArrowRight size={16}/>
                                </Link>
                            </div>
                            
                            {tours.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tours.map((t: { id: number, slug: string, name: string, duration?: string, price?: number, price_discounted?: number, featured_image?: string }) => (
                                        <Link key={t.id} href={`/activities/${t.slug}`} 
                                              className="flex bg-white rounded-3xl overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
                                            <div className="w-2/5 relative overflow-hidden">
                                                <SmartImage 
                                                    src={t.featured_image || `/images/activities/${t.slug}.jpg`} 
                                                    alt={t.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                    fallbackType="nature"
                                                    searchKeyword={t.name}
                                                />
                                            </div>
                                            <div className="w-3/5 p-6 flex flex-col justify-between bg-white relative">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Clock size={12} className="text-green-600" />
                                                        <span className="text-[10px] uppercase font-extrabold text-green-600 tracking-wider">
                                                            {t.duration || 'Flexible'}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-[#0f1e14] leading-snug group-hover:text-green-700 transition-colors line-clamp-2 text-lg">
                                                        {t.name}
                                                    </h3>
                                                </div>
                                                <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-4">
                                                    <div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Starting at</div>
                                                        <div className="font-extrabold text-[#0f1e14] text-xl">
                                                            {t.price_discounted ? `₹${t.price_discounted}` : (t.price ? `₹${t.price}` : 'Book Now')}
                                                        </div>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg group-hover:shadow-green-500/30 transition-shadow">
                                                        <ArrowRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-[#0f1e14] to-[#1a6b3c] rounded-[40px] p-10 flex flex-col items-center gap-8 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex flex-col items-center gap-4 text-center relative z-10">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white mb-2 shadow-xl border border-white/10">
                                            <Calendar size={32} />
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-white">Missing the perfect tour?</h3>
                                        <p className="text-green-100/70 max-w-md font-medium">Our local specialists can design a custom-tailored journey just for you in {cityName}.</p>
                                    </div>
                                    <a href="#tab-plantrip" className="bg-white text-[#0f1e14] font-extrabold py-4 px-10 rounded-2xl hover:scale-105 transition-all shadow-2xl relative z-10">
                                        Request Custom Plan
                                    </a>
                                </div>
                            )}
                        </section>
                        </ScrollReveal>

                        {/* Tab 3: Weather & Insights */}
                        <ScrollReveal>
                        <section id="tab-weather" className="space-y-8 scroll-mt-32 pt-10 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Clock size={24} />
                                </div>
                                <h2 className="text-3xl font-extrabold text-[#0f1e14]">Weather &amp; Timing</h2>
                            </div>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                Stay ahead of the weather. Check real-time conditions and forecast for {cityName}.
                            </p>
                            <div className="mt-4 shadow-2xl shadow-gray-200 rounded-[40px] overflow-hidden border border-gray-100">
                                <WeatherWidget cityName={cityName} />
                            </div>

                            {/* FAQ Section (Integrated) */}
                            <ImprovedFAQ pageType="city" pageSlug={citySlug} title={`Essentials for ${cityName}`} />
                        </section>
                        </ScrollReveal>

                    </div>

                    {/* Right Sidebar (Sticky Lead Capture & 24/7 Support) */}
                    <div className="hidden lg:block w-[340px] xl:w-[380px]">
                        <div className="sticky top-[150px] space-y-6" id="tab-plantrip">
                            {/* 24/7 Expert Help Notification */}
                            <div className="bg-[#0f1e14] rounded-2xl p-5 flex items-center justify-between text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="relative">
                                        <span className="flex h-3 w-3 absolute -top-1 -right-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#0f1e14]"></span>
                                        </span>
                                        <img src="/images/expert-avatar.jpg" alt="Local Expert" className="w-12 h-12 rounded-full border-2 border-white/20 object-cover bg-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-green-400 font-bold uppercase tracking-wider">We are available 24/7</p>
                                        <p className="text-sm font-medium text-gray-200">Talk to a local expert</p>
                                    </div>
                                </div>
                                <a href="https://wa.me/918811909095" target="_blank" rel="noopener noreferrer" 
                                   className="relative z-10 bg-[#25D366] hover:bg-[#20bd5a] text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                                </a>
                            </div>

                            {/* Main Lead form */}
                            <div className="relative overflow-hidden bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-[#1a6b3c]" />
                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to visit {cityName}?</h3>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Get a personalized, hand-crafted itinerary from our local experts.
                                    </p>
                                    <TripPlanningForm title="Get Free Quote" variant="default" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Lead Capture (shows only on small screens) */}
                <div className="lg:hidden mt-16 pt-12 border-t border-gray-100" id="tab-plantrip-mobile">
                    <div className="bg-[#0f1e14] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Plan Your {cityName} Trip</h3>
                        <p className="text-green-50/70 mb-6 relative z-10">
                            Let our travel experts craft the perfect North East itinerary for you.
                        </p>
                        <div className="relative z-10">
                            <TripPlanningForm variant="compact" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
