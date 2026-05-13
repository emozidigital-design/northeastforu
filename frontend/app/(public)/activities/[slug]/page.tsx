import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchActivityBySlug, fetchAllActivities } from '@/lib/api';
import { Users, BarChart2, MapPin, Shield, ChevronRight, AlertTriangle, Check, X, Package, Calendar, Info, Camera } from 'lucide-react';
import ActivityGallery from '@/components/activity/ActivityGallery';
import ActivityStickyBar from '@/components/activity/ActivityStickyBar';

import ActivityTabs from '@/components/activity/ActivityTabs';
import ActivityMap from '@/components/activity/ActivityMap';
import MobileBookingBar from '@/components/activity/MobileBookingBar';
import ReviewsSection from '@/components/activity/ReviewsSection';
import RelatedActivities from '@/components/activity/RelatedActivities';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const activity = await fetchActivityBySlug(slug);
    if (!activity) return { title: 'Not Found' };

    const displayPrice = activity.price_discounted || activity.price;
    const city = activity.city?.name || '';
    const state = activity.state?.name || 'North East India';

    return {
        title: `${activity.name} in ${city || state} | Book Now – NorthEastForU`,
        description: `Book ${activity.name} in ${city || state}. ${activity.duration ? `Duration: ${activity.duration}. ` : ''}${displayPrice ? `From ₹${Number(displayPrice).toLocaleString('en-IN')} per person. ` : ''}${(activity.highlights?.[0]?.title) || 'An unforgettable experience in North East India.'}`,
        openGraph: {
            type: 'website',
            title: `${activity.name} | NorthEastForU`,
            description: activity.description?.slice(0, 200) || '',
            images: [activity.gallery_images?.[0] || activity.featured_image || ''],
        },
    };
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const activity = await fetchActivityBySlug(slug);
    if (!activity) notFound();

    // Related activities
    let relatedActivities: any[] = [];
    try {
        const all = await fetchAllActivities();
        const data = all?.data || [];
        relatedActivities = data
            .filter((a: any) => a.slug !== slug && (a.city_id === activity.city_id || a.category === activity.category))
            .slice(0, 6);
        if (relatedActivities.length < 3) {
            const more = data.filter((a: any) => a.slug !== slug && !relatedActivities.find((r: any) => r.id === a.id)).slice(0, 6 - relatedActivities.length);
            relatedActivities = [...relatedActivities, ...more];
        }
    } catch { relatedActivities = []; }

    const displayPrice = activity.price_discounted || activity.price;
    const city = activity.city?.name;
    const state = activity.state?.name;
    const locationLabel = city || state || 'North East India';

    // Gallery images
    const galleryImages = [
        activity.featured_image,
        ...(activity.gallery_images || []),
    ].filter(Boolean) as string[];

    // Parse JSONB fields (may come as string or array)
    const parse = (field: any) => {
        if (!field) return [];
        if (Array.isArray(field)) return field;
        try { return JSON.parse(field); } catch { return []; }
    };

    const highlights: any[] = parse(activity.highlights);
    const inclusions: string[] = parse(activity.inclusions);
    const exclusions: string[] = parse(activity.exclusions);
    const importantInfo: string[] = parse(activity.important_info);
    const whatToBring: string[] = parse(activity.what_to_bring);
    const faqs: any[] = parse(activity.faqs);
    const languages: string[] = parse(activity.languages);

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: activity.name,
        description: activity.description || '',
        url: `https://northeastforu.com/activities/${slug}`,
        image: galleryImages[0] || '',
        priceRange: displayPrice ? `₹${Number(displayPrice).toLocaleString('en-IN')}` : undefined,
        aggregateRating: activity.rating > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: String(activity.rating),
            reviewCount: String(activity.review_count || 0),
        } : undefined,
        address: {
            '@type': 'PostalAddress',
            addressLocality: city || '',
            addressRegion: state || '',
            addressCountry: 'IN',
        },
        offers: displayPrice ? {
            '@type': 'Offer',
            price: String(displayPrice),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
        } : undefined,
    };

    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    } : null;

    return (
        <>
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

            {/* Leaflet CSS */}
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

            <div className="bg-white min-h-screen font-sans">
                {/* Sticky Top Bar (shows after scrolling) */}
                <ActivityStickyBar
                    title={activity.name}
                    rating={activity.rating || 0}
                    reviewCount={activity.review_count || 0}
                    price={displayPrice}
                />

                {/* ── SECTION 1: Header (Klook-style) ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-5">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-gray-400 mb-5">
                        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        {state && <><Link href={`/${activity.state?.slug || ''}`} className="hover:text-gray-600 transition-colors">{state}</Link><ChevronRight size={12} /></>}
                        {city && <><Link href={`/${activity.state?.slug || ''}/${activity.city?.slug || ''}`} className="hover:text-gray-600 transition-colors">{city}</Link><ChevronRight size={12} /></>}
                        <span className="text-gray-500 truncate max-w-[250px]">{activity.name}</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-2xl md:text-[28px] lg:text-[32px] font-bold text-[#0f1e14] leading-snug tracking-[-0.01em]">
                        {activity.name}
                    </h1>

                    {/* Category subtitle */}
                    {activity.category && (
                        <p className="text-sm text-gray-500 mt-1.5">
                            {activity.category}{activity.duration ? `, ${activity.duration}` : ''}
                        </p>
                    )}

                    {/* Info row: rating · reviews · booked · location   ···   save to wishlist */}
                    <div className="flex flex-wrap items-center justify-between mt-4 gap-y-3">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                            {/* Rating */}
                            <span className="font-bold text-[#1a6b3c]">{Number(activity.rating || 4.5).toFixed(1)}/5</span>

                            {/* Reviews */}
                            <a href="#tab-reviews"
                                className="text-gray-600 underline decoration-gray-300 underline-offset-2 hover:text-[#1a6b3c] transition-colors">
                                {(activity.review_count || 0).toLocaleString()} reviews
                            </a>

                            <span className="text-gray-300">·</span>

                            {/* Booked count */}
                            <span className="text-gray-500">
                                {activity.review_count && activity.review_count > 50
                                    ? `${Math.floor((activity.review_count * 5) / 1000)}K+ booked`
                                    : 'Popular activity'}
                            </span>

                            {/* Location */}
                            {(city || state) && (
                                <>
                                    <span className="text-gray-300">·</span>
                                    <Link href={city ? `/${activity.state?.slug || ''}/${activity.city?.slug || ''}` : `/${activity.state?.slug || ''}`}
                                        className="flex items-center gap-1 text-gray-500 hover:text-[#1a6b3c] transition-colors">
                                        <MapPin size={13} />
                                        <span>{[city, state].filter(Boolean).join(', ')}</span>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Save to wishlist (right side) */}
                        <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                className="group-hover:fill-red-500 group-hover:stroke-red-500 transition-colors">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            Save to wishlist
                        </button>
                    </div>
                </div>

                {/* ── SECTION 2: Photo Gallery (contained, rounded) ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                    <ActivityGallery images={galleryImages} title={activity.name} />
                </div>

                {/* ── SECTION 3: Tab Navigation ── */}
                <ActivityTabs />

                {/* ── SECTION 4: Tab Content ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Left content column */}
                        <div className="flex-1 lg:max-w-[740px] space-y-20 pt-10">

                            {/* ── Overview ── */}
                            <section id="tab-overview" className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0f1e14] border-l-4 border-[#1a6b3c] pl-4">
                                    About This Activity
                                </h2>
                                <div className="text-gray-700 text-base leading-[1.9] whitespace-pre-line">
                                    {activity.description || 'Detailed description coming soon.'}
                                </div>

                                {/* Meeting Point Map */}
                                {activity.meeting_point_lat && activity.meeting_point_lng && (
                                    <div className="space-y-4 pt-4">
                                        <h3 className="text-xl font-bold text-gray-900">Meeting Point</h3>
                                        <ActivityMap
                                            lat={Number(activity.meeting_point_lat)}
                                            lng={Number(activity.meeting_point_lng)}
                                            address={activity.meeting_point || ''}
                                            activityName={activity.name}
                                        />
                                    </div>
                                )}
                            </section>

                            {/* ── Highlights ── */}
                            <section id="tab-highlights" className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0f1e14] border-l-4 border-[#1a6b3c] pl-4">
                                    Activity Highlights
                                </h2>
                                {highlights.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {highlights.map((h: any, i: number) => (
                                            <div key={i}
                                                className="bg-[#f0f7f2] hover:bg-[#e5f2e9] rounded-xl p-5 space-y-2 transition-colors border border-transparent hover:border-green-200">
                                                {h.emoji && <div className="text-3xl">{h.emoji}</div>}
                                                <h3 className="font-bold text-[#0f1e14] text-sm">{h.title || h}</h3>
                                                {h.description && <p className="text-gray-600 text-xs leading-relaxed">{h.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {['🏔️ Stunning Scenery', '📸 Photo Opportunities', '🌿 Into the Wild', '🏕️ Adventure Awaits', '👨‍🦯 Expert Guide', '✨ Unforgettable Experience'].map(h => (
                                            <div key={h} className="bg-[#f0f7f2] rounded-xl p-5">
                                                <h3 className="font-bold text-[#0f1e14] text-sm">{h}</h3>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* ── Includes ── */}
                            <section id="tab-includes" className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0f1e14] border-l-4 border-[#1a6b3c] pl-4">
                                    What&apos;s Included
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Inclusions */}
                                    <div className="bg-green-50 rounded-2xl p-6 space-y-3 border border-green-100">
                                        <h3 className="font-bold text-green-800 flex items-center gap-2">
                                            <Check size={16} /> Included
                                        </h3>
                                        {(inclusions.length > 0 ? inclusions : [
                                            'Professional certified guide', 'Safety equipment and gear',
                                            'Bottled water throughout', 'Permits and entry fees'
                                        ]).map((item: string, i: number) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <Check size={15} className="text-green-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Exclusions */}
                                    <div className="bg-red-50 rounded-2xl p-6 space-y-3 border border-red-100">
                                        <h3 className="font-bold text-red-800 flex items-center gap-2">
                                            <X size={16} /> Not Included
                                        </h3>
                                        {(exclusions.length > 0 ? exclusions : [
                                            'Personal travel insurance', 'Meals and snacks',
                                            'Personal expenses', 'Tips for guide'
                                        ]).map((item: string, i: number) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <X size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* What to Bring */}
                                {whatToBring.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            <Package size={16} className="text-green-600" /> What to Bring
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {whatToBring.map((item: string, i: number) => (
                                                <span key={i} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                                    🎒 {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* ── Know Before You Go ── */}
                            <section id="tab-knowbefore" className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0f1e14] border-l-4 border-[#1a6b3c] pl-4">
                                    Know Before You Go
                                </h2>

                                {/* Important Information */}
                                {importantInfo.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-amber-500" /> Important Information
                                        </h3>
                                        {importantInfo.map((note: string, i: number) => (
                                            <div key={i} className="bg-[#fffbf0] border-l-4 border-[#f5a623] rounded-r-xl px-5 py-4 flex items-start gap-3">
                                                <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700">{note}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Cancellation Policy */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Shield size={16} className="text-green-600" /> Cancellation Policy
                                    </h3>
                                    <div className={`rounded-xl p-5 text-sm text-gray-700 flex items-start gap-3 ${activity.free_cancellation ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                                        <Shield size={16} className={`flex-shrink-0 mt-0.5 ${activity.free_cancellation ? 'text-green-600' : 'text-gray-500'}`} />
                                        <span>{activity.cancellation_policy || 'Free cancellation up to 24 hours before the activity starts.'}</span>
                                    </div>
                                </div>

                                {/* Age & Fitness */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activity.age_requirement && (
                                        <div className="bg-gray-50 rounded-xl p-5 space-y-2 border border-gray-100">
                                            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                                <Users size={14} className="text-green-600" /> Who Can Join
                                            </h3>
                                            <p className="text-sm text-gray-600">{activity.age_requirement}</p>
                                        </div>
                                    )}
                                    {(activity.physical_rating || activity.difficulty) && (
                                        <div className="bg-gray-50 rounded-xl p-5 space-y-2 border border-gray-100">
                                            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                                <BarChart2 size={14} className="text-green-600" /> Fitness Level
                                            </h3>
                                            <p className="text-sm text-gray-600">{activity.physical_rating || activity.difficulty}</p>
                                        </div>
                                    )}
                                </div>

                                {/* FAQs */}
                                {faqs.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="font-bold text-gray-900">Frequently Asked Questions</h3>
                                        <div className="space-y-3">
                                            {faqs.map((faq: any, i: number) => (
                                                <details key={i} className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                                                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm text-gray-900 hover:text-green-600 transition-colors list-none">
                                                        {faq.question}
                                                        <Info size={16} className="flex-shrink-0 text-gray-400 group-open:text-green-600 transition-colors" />
                                                    </summary>
                                                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                                                        {faq.answer}
                                                    </div>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* ── Reviews ── */}
                            <section id="tab-reviews" className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#0f1e14] border-l-4 border-[#1a6b3c] pl-4">
                                    Reviews
                                </h2>
                                <ReviewsSection rating={activity.rating || 0} reviewCount={activity.review_count || 0} />
                            </section>
                        </div>

                        {/* Empty right spacer on desktop for the sticky sidebar */}

                    </div>
                </div>

                {/* ── Related Activities ── */}
                {relatedActivities.length > 0 && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                            <RelatedActivities activities={relatedActivities} locationLabel={locationLabel} />
                        </div>
                    </div>
                )}

                {/* Mobile Booking Bar */}
                <MobileBookingBar
                    activityName={activity.name}
                    price={activity.price ? Number(activity.price) : null}
                    priceOriginal={activity.price_original ? Number(activity.price_original) : null}
                    priceDiscounted={activity.price_discounted ? Number(activity.price_discounted) : null}
                    groupSizeMax={activity.group_size_max || 15}
                />
            </div>
        </>
    );
}
