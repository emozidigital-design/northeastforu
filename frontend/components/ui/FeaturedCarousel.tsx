'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, User } from 'lucide-react';
import SmartImage from './SmartImage';

export default function FeaturedCarousel({ itineraries }: { itineraries: any[] }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragged, setIsDragged] = useState(false);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!itineraries || itineraries.length === 0) return null;

    return (
        <section className="py-24 bg-[#f8faf9] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="h-[2px] w-12 bg-green-600 block"></span>
                            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Editor's Pick</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-display">
                            Featured Journeys
                        </h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Link href="/itineraries" className="text-gray-500 font-bold hover:text-green-700 transition-colors hidden md:block mr-4">
                            View All Packages →
                        </Link>
                        <button 
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all text-gray-600"
                        >
                            <ChevronLeft />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all text-gray-600"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-12 pt-4 hide-scrollbar max-w-[100vw]"
                style={{ scrollPaddingLeft: 'max(1rem, calc((100vw - 80rem) / 2))' }}
            >
                {/* Spacer block to align first item with container edge on large screens */}
                <div className="hidden lg:block shrink-0" style={{ width: 'calc((100vw - 80rem) / 2 - 1.5rem)' }}></div>

                {itineraries.map((pkg: any) => (
                    <Link 
                        key={pkg.id} 
                        href={`/itineraries/${pkg.slug}`}
                        className="snap-start shrink-0 w-[85vw] sm:w-[400px] group relative bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 block"
                        onClick={(e) => isDragged && e.preventDefault()}
                    >
                        <div className="relative aspect-[4/3] w-full rounded-tl-[1.5rem] rounded-tr-[1.5rem] overflow-hidden mb-5">
                            <SmartImage 
                                src={pkg.featured_image || ''} 
                                alt={pkg.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                fallbackType="nature"
                            />
                            {/* Floating Tags */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-sm">
                                <Clock size={12} className="text-green-600" />
                                {pkg.duration_days} Days
                            </div>
                            {pkg.price_estimate && (
                                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                                    <span className="text-gray-400">From</span> ₹{Number(pkg.price_estimate).toLocaleString('en-IN')}
                                </div>
                            )}
                        </div>

                        <div className="px-3 pb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 leading-tight mb-3 font-display">
                                {pkg.title}
                            </h3>
                            
                            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 text-sm text-gray-500 font-medium">
                                <span className="flex items-center gap-1">
                                    <User size={14} className="text-gray-400" /> Private Tour
                                </span>
                                <span className="text-green-600 font-bold ml-auto group-hover:underline">Explore Plan →</span>
                            </div>
                        </div>
                    </Link>
                ))}
                
                {/* Spacer block to add padding at the end of the scroll */}
                <div className="shrink-0 w-4 lg:w-[calc((100vw-80rem)/2)]"></div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
