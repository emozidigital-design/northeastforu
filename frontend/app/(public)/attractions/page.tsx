import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CardGrid from '@/components/ui/CardGrid';
import { fetchAllAttractions } from '@/lib/api';

export const metadata = {
    title: 'Top Attractions in North East India | NorthEastForU',
    description: 'Discover the most beautiful landmarks, monasteries, waterfalls, and natural wonders in North East India.',
};

export default async function AttractionsIndexPage() {
    let attractions: any[] = [];
    try {
        const data = await fetchAllAttractions();
        attractions = data?.data || [];
    } catch {
        attractions = [];
    }

    const attractionItems = attractions.map(attr => ({
        title: attr.name,
        slug: attr.slug,
        image: attr.featured_image,
        description: attr.description,
        stateSlug: attr.city?.state?.slug,
        citySlug: attr.city?.slug
    }));

    return (
        <div>
            <HeroSection
                title="Must-Visit Attractions"
                subtitle="Explore the iconic landmarks and hidden wonders that make North East India unique."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">All Attractions</h2>
                        <p className="text-gray-500 mt-2">{attractions.length} places to explore</p>
                    </div>
                </ScrollReveal>

                {attractions.length > 0 ? (
                    <CardGrid items={attractionItems} type="attraction" />
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No attractions found</h3>
                        <p className="text-gray-500">Check back soon as we add more incredible locations to our guide!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
