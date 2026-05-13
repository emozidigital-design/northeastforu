'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search as SearchIcon, MapPin, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { searchAPI } from '@/lib/api';

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length >= 2) {
            setLoading(true);
            searchAPI(query)
                .then(res => setResults(res.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [query]);

    if (!query) {
        return (
            <div className="text-center py-20">
                <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600">Enter a search term to explore</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    const hasResults = results && (
        (results.states?.length || 0) > 0 ||
        (results.cities?.length || 0) > 0 ||
        (results.attractions?.length || 0) > 0 ||
        (results.activities?.length || 0) > 0 ||
        (results.blogs?.length || 0) > 0
    );

    if (!hasResults) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-600">No results found for "{query}"</h2>
                <p className="text-gray-500 mt-2">Try searching for a different state, city, or attraction.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {(results.states?.length || 0) > 0 && (
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin className="text-green-600" /> States
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.states.map((s: any) => (
                            <Link key={s.slug} href={`/${s.slug}`} className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-green-200 transition-all shadow-sm hover:shadow-md">
                                <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors uppercase tracking-wider">{s.name}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {(results.cities?.length || 0) > 0 && (
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <MapPin className="text-blue-600" /> Cities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.cities.map((c: any) => (
                            <Link key={c.slug} href={`/explore/${c.slug}`} className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-blue-200 transition-all shadow-sm hover:shadow-md">
                                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{c.name}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {(results.attractions?.length || 0) > 0 && (
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Compass className="text-orange-600" /> Attractions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.attractions.map((a: any) => (
                            <Link key={a.slug} href={`/explore/attraction/${a.slug}`} className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-200 transition-all shadow-sm hover:shadow-md">
                                <h4 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{a.name}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{a.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {(results.activities?.length || 0) > 0 && (
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Compass className="text-red-600" /> Activities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.activities.map((a: any) => (
                            <Link key={a.slug} href={`/activities/${a.slug}`} className="group bg-white rounded-2xl p-4 border border-gray-100 hover:border-red-200 transition-all shadow-sm hover:shadow-md">
                                <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{a.name}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{a.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {(results.blogs?.length || 0) > 0 && (
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BookOpen className="text-purple-600" /> Blog Posts
                    </h3>
                    <div className="space-y-4">
                        {results.blogs.map((b: any) => (
                            <Link key={b.slug} href={`/blog/${b.slug}`} className="block group bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 transition-all shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{b.name}</h4>
                                    <ArrowRight className="text-gray-300 group-hover:text-purple-600 transition-all" size={20} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Search Results</h1>
                    <p className="text-gray-600 mt-2">Discover the beauty of North East India</p>
                </header>

                <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>}>
                    <SearchResults />
                </Suspense>
            </div>
        </main>
    );
}
