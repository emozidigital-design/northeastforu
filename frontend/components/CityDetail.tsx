import Link from 'next/link';

// Component to automate internal linking on City page
export default function CityDetail({ city, related }: { city: any, related: any }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">{city.name}</h1>

            {/* Automated Internal Linking Sections */}
            <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Attractions in {city.name}</h2>
                    <ul className="space-y-2">
                        {related.attractions.map((attr: any) => (
                            <li key={attr.slug}>
                                <Link href={`/attractions/${attr.slug}`} className="text-blue-600 hover:underline">
                                    {attr.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Activities in {city.name}</h2>
                    <ul className="space-y-2">
                        {related.activities.map((act: any) => (
                            <li key={act.slug}>
                                <Link href={`/activities/${act.slug}`} className="text-blue-600 hover:underline">
                                    {act.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Blog Mentions */}
            <section className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">From our Blog</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.blogs.map((blog: any) => (
                        <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block p-4 border rounded hover:shadow-lg transition">
                            <h3 className="font-medium">{blog.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
