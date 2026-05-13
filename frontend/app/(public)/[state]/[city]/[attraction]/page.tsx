import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmartImage from '@/components/ui/SmartImage';
import { Clock, DollarSign, Tag, MapPin } from 'lucide-react';
import { fetchAttractionBySlug } from '@/lib/api';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string; attraction: string }> }) {
    const { state: stateSlug, city: citySlug, attraction: attractionSlug } = await params;
    const attraction = await fetchAttractionBySlug(attractionSlug);
    if (!attraction) return { title: 'Not Found' };

    const title = attraction.seo_title || `${attraction.name || 'Attraction'} | NorthEastForU`;
    const description = attraction.seo_description || `Visit ${attraction.name} — a must-see in ${attraction.city?.name || 'North East India'}.`;
    const image = attraction.featured_image || `https://northeastforu.com/images/attractions/${attraction.slug}.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: `/${stateSlug}/${citySlug}/${attractionSlug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://northeastforu.com/${stateSlug}/${citySlug}/${attractionSlug}`,
            siteName: 'NorthEastForU',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: attraction.name,
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

export default async function AttractionPage({ params }: { params: Promise<{ state: string; city: string; attraction: string }> }) {
    const { state: stateParam, city: cityParam, attraction: attrParam } = await params;
    const attraction = await fetchAttractionBySlug(attrParam);
    if (!attraction) notFound();

    return (
        <div>
            <HeroSection
                title={attraction.name}
                subtitle={attraction.description?.slice(0, 120) || `A top attraction in ${attraction.city?.name || 'North East India'}.`}
                image={attraction.featured_image || `/images/attractions/${attraction.slug}.jpg`}
            />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                {/* Breadcrumb */}
                <Breadcrumbs 
                    items={[
                        { label: stateParam.replace(/-/g, ' '), href: `/${stateParam}` },
                        { label: cityParam.replace(/-/g, ' '), href: `/${stateParam}/${cityParam}` },
                        { label: attraction.name, href: `/${stateParam}/${cityParam}/${attraction.slug}` }
                    ]} 
                />

                {/* Info row */}
                <ScrollReveal>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: Tag, label: attraction.category || 'Attraction' },
                            { icon: Clock, label: attraction.best_time || 'Year-round' },
                            { icon: MapPin, label: attraction.city?.name || cityParam.replace(/-/g, ' ') },
                        ].map(item => (
                            <span key={item.label} className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm font-medium px-4 py-2 rounded-full">
                                <item.icon size={14} /> {item.label}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Description */}
                <ScrollReveal>
                    <section>
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">About this Attraction</h2>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                {attraction.description || 'Detailed description coming soon.'}
                            </p>
                        </div>
                    </section>
                </ScrollReveal>

                {/* Back */}
                <ScrollReveal>
                    <Link href={`/${stateParam}/${cityParam}`}
                        className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline">
                        ← Back to {cityParam.replace(/-/g, ' ')}
                    </Link>
                </ScrollReveal>
            </div>
        </div>
    );
}
