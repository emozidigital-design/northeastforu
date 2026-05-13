import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CardGrid from '@/components/ui/CardGrid';
import { fetchAllCities } from '@/lib/api';

export const metadata = {
    title: 'Discover Cities in North East India | NorthEastForU',
    description: 'Explore the vibrant cities and hidden gems across the eight states of North East India.',
};

export default async function CitiesIndexPage() {
    let cities: any[] = [];
    try {
        const data = await fetchAllCities();
        cities = data?.data || [];
    } catch {
        cities = [];
    }

    const cityItems = cities.map(city => ({
        title: city.name,
        slug: city.slug,
        image: city.featured_image,
        description: city.description,
        stateSlug: city.state?.slug
    }));

    return (
        <div>
            <HeroSection
                title="Cities of North East"
                subtitle="From bustling capitals to serene hill stations, discover the heart of the Eight Sisters."
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal>
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">All Cities</h2>
                        <p className="text-gray-500 mt-2">{cities.length} destinations found</p>
                    </div>
                </ScrollReveal>

                {cities.length > 0 ? (
                    <CardGrid items={cityItems} type="city" />
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl">
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No cities found</h3>
                        <p className="text-gray-500">We are currently updating our destination list. Please check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
