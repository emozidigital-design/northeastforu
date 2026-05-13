'use client';

import React from 'react';
import TableOfContents from './TableOfContents';
import NewsletterSignup from '../ui/NewsletterSignup';
import TripPlanningForm from '../ui/TripPlanningForm';
import Link from 'next/link';
import SmartImage from '../ui/SmartImage';

interface RelatedPost {
    id: string;
    title: string;
    slug: string;
    featured_image?: string;
    published_at?: string;
}

interface BlogSidebarProps {
    relatedPosts?: RelatedPost[];
}

export default function BlogSidebar({ relatedPosts = [] }: BlogSidebarProps) {
    return (
        <aside className="sticky top-24 space-y-10">
            {/* Table of Contents */}
            <TableOfContents />

            {/* Plan Your Trip Widget */}
            <div className="bg-[#1a6b3c] rounded-2xl p-6 text-white shadow-xl shadow-green-100">
                <h3 className="text-xl font-display font-bold mb-4">Plan Your Trip</h3>
                <p className="text-green-50/80 text-sm mb-6">Need help planning your North East journey? Get expert advice for free.</p>
                <TripPlanningForm variant="compact" />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-[#0f1e14] border-b border-gray-100 pb-2">You Might Also Like</h3>
                    <div className="space-y-4">
                        {relatedPosts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 items-center">
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                    <SmartImage
                                        src={post.featured_image || '/images/blog-placeholder.jpg'}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                                        {post.title}
                                    </h4>
                                    {post.published_at && (
                                        <p className="text-[11px] text-gray-400">
                                            {new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Newsletter Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-[#0f1e14] mb-2">Get Travel Tips Weekly</h3>
                <p className="text-gray-500 text-sm mb-4">Join our community for the best guides and stories.</p>
                <NewsletterSignup variant="inline" />
                <p className="text-[10px] text-gray-400 mt-4 text-center">We respect your privacy. Unsubscribe anytime.</p>
            </div>
        </aside>
    );
}
