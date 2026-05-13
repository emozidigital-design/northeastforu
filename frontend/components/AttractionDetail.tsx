import Link from 'next/link';

export default function AttractionDetail({ attraction, related }: { attraction: any, related: any }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">{attraction.name}</h1>
            <p className="text-gray-600 mb-8">{attraction.location}</p>

            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Other Attractions Near Here</h2>
                    <ul className="space-y-2">
                        {related.nearbyAttractions.map((attr: any) => (
                            <li key={attr.slug}>
                                <Link href={`/attractions/${attr.slug}`} className="text-blue-600 hover:underline">
                                    {attr.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Activities Nearby</h2>
                    <ul className="space-y-2">
                        {related.nearbyActivities.map((act: any) => (
                            <li key={act.slug}>
                                <Link href={`/activities/${act.slug}`} className="text-blue-600 hover:underline">
                                    {act.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
