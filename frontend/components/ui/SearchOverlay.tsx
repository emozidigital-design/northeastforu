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
        // Actual paths would depend on structure
        router.push(`/${slug}`);
    };

    return (
        <div className="fixed inset-0 z-[10001] bg-slate-900/30 backdrop-blur-[64px] saturate-[1.8] animate-in zoom-in-95 fade-in duration-300 flex flex-col items-center pt-24 px-4 sm:px-8">
            {/* iOS Glass Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>
            
            <button
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-lg"
                onClick={() => setIsOpen(false)}
            >
                <X size={32} />
            </button>

            <div className="w-full max-w-lg ml-auto mr-4 sm:mr-12 relative z-10">
                <div className="relative mb-10 group">
                    <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={22} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search North East India..."
                        className="w-full bg-white text-gray-900 text-xl px-16 py-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 border border-gray-200 shadow-2xl transition-all placeholder:text-gray-400 font-sans"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                <div className="overflow-y-auto max-h-[60vh] space-y-8 pb-12 custom-scrollbar pr-2">
                    {results ? (
                        Object.entries(results).map(([type, items]) => (
                            (items as SearchItem[]).length > 0 && (
                                <div key={type} className="animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-white/60 uppercase text-xs font-bold tracking-[0.2em] mb-4 flex items-center gap-2 ml-2">
                                        {type === 'states' && <MapPin size={14} />}
                                        {type === 'activities' && <Zap size={14} />}
                                        {type === 'blogs' && <FileText size={14} />}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {(items as SearchItem[]).map((item) => (
                                            <button
                                                key={item.slug}
                                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left group"
                                                onClick={() => navigateTo(type, item.slug)}
                                            >
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                                                    {item.hero_image ? (
                                                        <Image src={item.hero_image} alt={item.name || item.title || 'Search result'} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-green-900/20 flex items-center justify-center text-green-500">
                                                            <SearchIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="text-white font-medium group-hover:text-green-500 transition-colors">{item.name || item.title}</h4>
                                                    <p className="text-gray-400 text-sm line-clamp-1">{item.description || item.seo_description}</p>
                                                </div>
                                                <ArrowRight className="text-gray-600 group-hover:text-white transition-colors" size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))
                    ) : query.length >= 2 ? (
                        <div className="text-center py-16 text-white/50 text-lg">
                            No results found for <span className="text-white font-medium">&quot;{query}&quot;</span>
                        </div>
                    ) : (
                        <div className="text-center py-16 text-white/40 text-lg">
                            Try searching for <span className="text-white/70">&quot;Kaziranga&quot;</span>, <span className="text-white/70">&quot;Meghalaya&quot;</span>, or <span className="text-white/70">&quot;River Rafting&quot;</span>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
};

export default SearchOverlay;
