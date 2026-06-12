'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
    "All",
    "Travel Tips",
    "Destinations",
    "Itineraries",
    "Food and Culture",
    "Adventure",
    "Planning Guide",
    "Seasonal",
    "Hidden Places",
    "Photography"
];

export default function CategoryPills() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('resize', checkScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleCategoryClick = (category: string) => {
        if (category === 'All') {
            router.push('/blog');
        } else {
            router.push(`/blog/category/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`);
        }
    };

    return (
        <div className={`sticky z-40 bg-white border-b border-gray-100 shadow-sm overflow-hidden transition-all duration-300 ${isScrolled ? 'top-[49px]' : 'top-[57px]'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-3 flex items-center">

                {showLeftArrow && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 z-10 p-1 bg-white/90 rounded-full border border-gray-100 shadow-sm text-gray-500 hover:text-green-600 hidden md:block"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-2 overflow-x-auto scrollbar-hide no-scrollbar items-center py-1 px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`
                                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                ${activeCategory.toLowerCase() === cat.toLowerCase()
                                    ? 'bg-[#1a6b3c] text-white border-[#1a6b3c]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-600'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {showRightArrow && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 z-10 p-1 bg-white/90 rounded-full border border-gray-100 shadow-sm text-gray-500 hover:text-green-600 hidden md:block"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
