'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronRight } from 'lucide-react';

interface ActivityStickyBarProps {
    title: string;
    rating: number;
    reviewCount: number;
    price: number | null;
}

export default function ActivityStickyBar({ title, rating, reviewCount, price }: ActivityStickyBarProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 520);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleBookNow = () => scrollTo('booking-widget');

    return (
        <div className={`fixed top-0 left-0 right-0 z-[90] bg-white border-b border-gray-200 shadow-md transition-all duration-300
            ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6">
                {/* Title */}
                <h2 className="font-bold text-gray-900 text-sm truncate max-w-[240px] hidden md:block">
                    {title.length > 40 ? title.slice(0, 40) + '...' : title}
                </h2>

                {/* Rating */}
                {rating > 0 && (
                    <div className="hidden md:flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full flex-shrink-0">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="font-bold text-sm text-amber-700">{Number(rating).toFixed(1)}</span>
                        {reviewCount > 0 && <span className="text-amber-600/70 text-xs">({reviewCount})</span>}
                    </div>
                )}

                {/* Jump links */}
                <nav className="hidden lg:flex items-center gap-1 text-sm ml-auto">
                    {['overview', 'highlights', 'includes', 'reviews'].map(tab => (
                        <button key={tab} onClick={() => scrollTo(`tab-${tab}`)}
                            className="px-3 py-1.5 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all capitalize font-medium">
                            {tab === 'includes' ? 'Includes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>

                {/* Book Now */}
                <button onClick={handleBookNow}
                    className="ml-auto lg:ml-4 bg-[#1a6b3c] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-all flex-shrink-0 flex items-center gap-1.5">
                    Book Now <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
