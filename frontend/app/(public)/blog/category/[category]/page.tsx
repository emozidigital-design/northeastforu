'use client';

import React, { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { fetchAllBlogs } from '@/lib/api';
import { Calendar, User, Clock, Search, Loader2, ChevronRight } from 'lucide-react';
import CategoryPills from '@/components/blog/CategoryPills';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CategoryBlogPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = use(params);
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(12);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Format slug back to display name (e.g., 'travel-tips' -> 'Travel Tips')
    const categoryName = categorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const data = await fetchAllBlogs();
                const published = (data?.data || []).filter((b: any) =>
                    b.status === 'published' &&
                    b.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase()
                );
                setBlogs(published);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, [categorySlug]);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayBlogs = filteredBlogs.slice(0, displayCount);
    const hasMore = filteredBlogs.length > displayCount;

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setDisplayCount(prev => prev + 9);
            setIsLoadingMore(false);
        }, 800);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-green-600" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <CategoryPills />

            {/* Page Hero */}
            <section className="bg-[#f0f7f2] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <div className="space-y-4">
                        <nav className="flex items-center justify-center gap-2 text-sm text-green-600/70 mb-4 font-bold uppercase tracking-widest">
                            <Link href="/blog" className="hover:underline">All Articles</Link>
                            <ChevronRight size={14} />
                            <span>{categoryName}</span>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#0f1e14]">
                            {categoryName} Articles
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            All our expert guides and travel stories about {categoryName.toLowerCase()}.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder={`Search in ${categoryName}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none shadow-sm transition-all"
                        />
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {filteredBlogs.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {displayBlogs.map((blog, i) => {
                                const wordCount = (blog.content || '').split(/\s+/).length;
                                const readTime = Math.max(1, Math.round(wordCount / 200));

                                return (
                                    <ScrollReveal key={blog.id} delay={i % 3 * 100}>
                                        <Link href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-green-50">
                                            <div className="aspect-[16/10] relative overflow-hidden">
                                                <SmartImage
                                                    src={blog.featured_image || '/images/blog-placeholder.jpg'}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                                <span className="absolute bottom-4 left-4 bg-[#1a6b3c] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                                    {blog.category}
                                                </span>
                                            </div>
                                            <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                                                <h3 className="text-xl font-display font-bold text-[#0f1e14] group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                                                    {blog.content?.split('\n\n')[0] || ""}
                                                </p>
                                                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-[11px] text-[#6b7c6e]">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-[10px] font-bold text-green-700">
                                                            {blog.author?.charAt(0) || 'N'}
                                                        </div>
                                                        <span className="font-semibold text-gray-900">{blog.author || 'Team NE'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                                                        <span className="flex items-center gap-1"><Clock size={12} /> {readTime} min</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                );
                            })}
                        </div>

                        {hasMore && (
                            <div className="pt-10 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="flex items-center gap-3 px-10 py-4 bg-white border-2 border-green-600 text-green-600 rounded-2xl font-bold hover:bg-green-600 hover:text-white transition-all shadow-lg shadow-green-100 disabled:opacity-50"
                                >
                                    {isLoadingMore ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Loading Articles...
                                        </>
                                    ) : (
                                        'Load More Articles'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-4 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                        <h3 className="text-2xl font-display font-bold text-gray-400">No articles in this category</h3>
                        <p className="text-gray-500">We are currently working on more content for {categoryName}. Check back soon!</p>
                        <Link href="/blog" className="inline-block text-green-600 font-bold hover:underline">
                            Explore All Articles →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
