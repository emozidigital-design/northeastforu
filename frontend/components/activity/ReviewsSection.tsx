'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react';

interface ReviewsSectionProps {
    rating: number;
    reviewCount: number;
}

// Mock reviews for display (real reviews would come from a reviews API)
const MOCK_REVIEWS = [
    { id: 1, name: 'Priya S.', country: '🇮🇳', rating: 5, date: '2026-01-15', text: 'Absolutely breathtaking experience! The guide was knowledgeable and very friendly. The views were stunning and the entire experience was well-organized. Highly recommend!', helpful: 12 },
    { id: 2, name: 'James M.', country: '🇬🇧', rating: 5, date: '2025-12-22', text: 'One of the best activities I have ever done. The Northeast India landscape is unlike anything I have seen before. Will definitely come back!', helpful: 8 },
    { id: 3, name: 'Anjali R.', country: '🇮🇳', rating: 4, date: '2025-12-10', text: 'Great experience overall. The guide was very professional and safety was well taken care of. The only thing I would suggest is slightly better timing.', helpful: 5 },
    { id: 4, name: 'Thomas K.', country: '🇩🇪', rating: 5, date: '2025-11-30', text: 'Extraordinary! This is authentic travel at its finest. The local culture and landscapes made this unforgettable. Worth every rupee!', helpful: 14 },
    { id: 5, name: 'Nisha V.', country: '🇮🇳', rating: 4, date: '2025-11-15', text: 'Really enjoyed this! Great guide who explained the history and culture of the region beautifully. The scenery was spectacular.', helpful: 3 },
];

const RATING_BREAKDOWN = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 },
];

const CATEGORY_RATINGS = [
    { label: 'Guide Quality', value: 4.9 },
    { label: 'Value for Money', value: 4.7 },
    { label: 'Safety', value: 4.9 },
    { label: 'Scenery', value: 4.8 },
];

function StarDisplay({ rating, size = 16 }: { rating: number, size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={size}
                    className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
            ))}
        </div>
    );
}

export default function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
    const [showAll, setShowAll] = useState(false);
    const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>({});
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const displayRating = rating > 0 ? rating : 4.8;
    const displayCount = reviewCount > 0 ? reviewCount : MOCK_REVIEWS.length;
    const displayReviews = showAll ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 4);

    return (
        <section className="scroll-mt-32" id="reviews">
            <div className="mb-12">
                <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">TRAVELLER STORIES</span>
                <h2 className="font-serif text-[32px] text-[#0f1e14] font-bold">What People Are Saying</h2>
                <div className="w-[40px] h-[2px] bg-[#1a6b3c] mt-4" />
            </div>

            <div className="space-y-10">
                {/* Rating Summary - Typography driven */}
                <div className="flex flex-col mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-serif text-[72px] text-[#0f1e14] leading-none">{Number(displayRating).toFixed(1)}</span>
                        <span className="text-[16px] text-[#888] font-sans">out of 5</span>
                    </div>
                    <StarDisplay rating={displayRating} size={18} />
                    <div className="text-[13px] text-[#888] font-sans mt-2">
                        Based on {displayCount.toLocaleString()} reviews
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#eeeeee]" />

                {/* Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayReviews.map(review => {
                        const isExpanded = expanded[review.id];
                        const longText = review.text.length > 150;

                        return (
                            <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <StarDisplay rating={review.rating} size={14} />
                                    <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                                </div>

                                <div className="flex-1 mb-4">
                                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                                        {longText && !isExpanded ? `${review.text.slice(0, 150)}...` : review.text}
                                    </p>
                                    {longText && (
                                        <button onClick={() => setExpanded(e => ({ ...e, [review.id]: !e[review.id] }))}
                                            className="text-sm font-bold text-[#1a6b3c] hover:underline mt-2">
                                            {isExpanded ? 'Show less' : 'Read more'}
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                    <div className="font-bold text-gray-900 text-sm">
                                        {review.name} <span className="text-lg leading-none ml-1">{review.country}</span>
                                    </div>
                                    <button onClick={() => setHelpfulCounts(h => ({ ...h, [review.id]: (h[review.id] || review.helpful) + 1 }))}
                                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1a6b3c] transition-colors p-1.5 hover:bg-green-50 rounded-lg">
                                        <ThumbsUp size={14} />
                                        Helpful ({helpfulCounts[review.id] || review.helpful})
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {!showAll && MOCK_REVIEWS.length > 4 && (
                    <div className="pt-6">
                        <button onClick={() => setShowAll(true)}
                            className="text-[15px] text-[#1a6b3c] font-bold hover:underline">
                            Read all {displayCount} reviews →
                        </button>
                    </div>
                )}

                <div className="pt-8 mt-8 border-t border-[#eeeeee]">
                    <button className="text-[15px] font-bold text-[#1a6b3c] hover:underline transition-all group inline-flex items-center gap-2">
                        Share your experience 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
