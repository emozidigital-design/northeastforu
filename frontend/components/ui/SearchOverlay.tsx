'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, MapPin, Zap, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SearchItem {
    slug: string;
    name?: string;
    title?: string;
    hero_image?: string;
    description?: string;
    seo_description?: string;
}

interface SearchResults {
    states: SearchItem[];
    activities: SearchItem[];
    blogs: SearchItem[];
}


const SearchOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        };
        window.addEventListener('open-search', handleOpen);
        return () => window.removeEventListener('open-search', handleOpen);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setResults(null);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api'}/search?q=${query}`);
                const data = await res.json();
                setResults(data.data);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    if (!isOpen) return null;

    const navigateTo = (type: string, slug: string) => {
        setIsOpen(false);
        setQuery('');
        router.push(`/${slug}`);
    };

    const hasResults = results && Object.values(results).some((arr) => (arr as SearchItem[]).length > 0);

    return (
        <>
            {/* Invisible backdrop to close on outside click */}
            <div
                className="fixed inset-0 z-[10000]"
                onClick={() => setIsOpen(false)}
            />

            {/* Compact search panel below navbar */}
            <div className="fixed top-[60px] left-0 right-0 z-[10001] bg-white shadow-xl border-b border-gray-200 animate-in slide-in-from-top-1 duration-150">
                <div className="max-w-3xl mx-auto px-4 py-3">
                    {/* Search input row */}
                    <div className="relative flex items-center">
                        <SearchIcon
                            className="absolute left-4 text-gray-400 pointer-events-none"
                            size={18}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search North East India..."
                            className="w-full bg-gray-50 text-gray-900 text-base pl-11 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/30 border border-gray-200 transition-all placeholder:text-gray-400"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {loading && (
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin" />
                            </div>
                        )}
                        <button
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close search"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Results */}
                    {(hasResults || query.length >= 2) && (
                        <div className="overflow-y-auto max-h-[60vh] mt-3 pb-2 space-y-4 custom-scrollbar">
                            {results && hasResults ? (
                                Object.entries(results).map(([type, items]) => (
                                    (items as SearchItem[]).length > 0 && (
                                        <div key={type}>
                                            <h3 className="text-gray-400 uppercase text-[10px] font-bold tracking-[0.2em] mb-2 flex items-center gap-1.5 ml-1">
                                                {type === 'states' && <MapPin size={12} />}
                                                {type === 'activities' && <Zap size={12} />}
                                                {type === 'blogs' && <FileText size={12} />}
                                                {type}
                                            </h3>
                                            <div className="grid grid-cols-1 gap-1">
                                                {(items as SearchItem[]).map((item) => (
                                                    <button
                                                        key={item.slug}
                                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all text-left group"
                                                        onClick={() => navigateTo(type, item.slug)}
                                                    >
                                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                            {item.hero_image ? (
                                                                <Image
                                                                    src={item.hero_image}
                                                                    alt={item.name || item.title || 'Search result'}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-600">
                                                                    <SearchIcon size={16} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-grow min-w-0">
                                                            <h4 className="text-gray-900 font-medium text-sm group-hover:text-green-700 transition-colors truncate">
                                                                {item.name || item.title}
                                                            </h4>
                                                            <p className="text-gray-500 text-xs line-clamp-1">
                                                                {item.description || item.seo_description}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className="text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" size={16} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p className="text-center py-6 text-gray-400 text-sm">
                                    No results found for <span className="text-gray-700 font-medium">&quot;{query}&quot;</span>
                                </p>
                            )}
                        </div>
                    )}

                    {!query && (
                        <p className="text-xs text-gray-400 mt-2 ml-1">
                            Try <span className="text-gray-600 font-medium">&quot;Kaziranga&quot;</span>, <span className="text-gray-600 font-medium">&quot;Meghalaya&quot;</span>, or <span className="text-gray-600 font-medium">&quot;River Rafting&quot;</span>
                        </p>
                    )}
                </div>
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
                `}</style>
            </div>
        </>
    );
};

export default SearchOverlay;
