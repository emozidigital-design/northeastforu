'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { Camera, ChevronLeft, ChevronRight, X, Download, ZoomIn } from 'lucide-react';

interface ActivityGalleryProps {
    images: string[];
    title: string;
}

export default function ActivityGallery({ images, title }: ActivityGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const touchStartX = useRef<number>(0);

    // Build gallery array — always show featured + gallery_images
    const allImages = images.length > 0 ? images : ['/images/activity-placeholder.jpg'];
    const hero = allImages[0];
    const grid = allImages.slice(1, 5);
    const hasMore = allImages.length > 5;

    const openLightbox = (index: number) => { setActiveIndex(index); setLightboxOpen(true); };
    const closeLightbox = () => setLightboxOpen(false);
    const prev = useCallback(() => setActiveIndex(i => (i - 1 + allImages.length) % allImages.length), [allImages.length]);
    const next = useCallback(() => setActiveIndex(i => (i + 1) % allImages.length), [allImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxOpen, prev, next]);

    // Touch handlers for mobile carousel
    const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) setCarouselIndex(i => Math.min(i + 1, allImages.length - 1));
        if (diff < -50) setCarouselIndex(i => Math.max(i - 1, 0));
    };

    return (
        <>
            {/* Desktop Gallery (Classic Grid) */}
            <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 w-full h-[520px] rounded-2xl overflow-hidden mb-8">
                {/* Hero Image */}
                <div className="col-span-2 row-span-2 relative cursor-pointer group" onClick={() => openLightbox(0)}>
                    <SmartImage src={allImages[0]} alt={`${title} 1`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                
                {/* Secondary Images (up to 4) */}
                {grid.map((img, idx) => (
                    <div key={idx} className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(idx + 1)}>
                        <SmartImage src={img} alt={`${title} ${idx + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        
                        {/* Overlay on last image if there are more */}
                        {idx === 3 && hasMore && (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white font-medium hover:bg-black/50 transition-colors">
                                <span className="text-xl">+{allImages.length - 5}</span>
                                <span>Photos</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                    {allImages.map((img, i) => (
                        <div key={i} className="min-w-full aspect-[4/3] flex-shrink-0 relative" onClick={() => openLightbox(i)}>
                            <SmartImage src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                {/* Count badge */}
                <span className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {carouselIndex + 1} / {allImages.length}
                </span>
                {/* Arrow buttons */}
                {carouselIndex > 0 && (
                    <button onClick={() => setCarouselIndex(i => i - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full flex items-center justify-center">
                        <ChevronLeft size={20} />
                    </button>
                )}
                {carouselIndex < allImages.length - 1 && (
                    <button onClick={() => setCarouselIndex(i => i + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white w-9 h-9 rounded-full flex items-center justify-center">
                        <ChevronRight size={20} />
                    </button>
                )}
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {allImages.map((_, i) => (
                        <button key={i} onClick={() => setCarouselIndex(i)}
                            className={`rounded-full transition-all ${i === carouselIndex ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-[200] bg-black flex flex-col transition-opacity duration-300" onClick={closeLightbox}>
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10" onClick={e => e.stopPropagation()}>
                        <div className="w-10"></div> {/* Spacer to center the counter */}
                        <span className="text-white text-[15px] font-medium tracking-wide">
                            {activeIndex + 1} / {allImages.length}
                        </span>
                        <div className="flex items-center">
                            <button onClick={closeLightbox} className="text-white p-2 hover:opacity-70 transition-opacity">
                                <X size={28} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* Main image */}
                    <div className="flex-1 flex items-center justify-center relative px-12 md:px-24" onClick={e => e.stopPropagation()}>
                        <button onClick={prev} className="absolute left-4 md:left-8 text-white p-4 hover:opacity-70 transition-opacity">
                            <ChevronLeft size={40} strokeWidth={1} />
                        </button>
                        
                        <div className="relative">
                            <img 
                                src={allImages[activeIndex]} 
                                alt="" 
                                className="max-h-[85vh] max-w-full object-contain mix-blend-screen transition-opacity duration-300" 
                            />
                        </div>
                        
                        <button onClick={next} className="absolute right-4 md:right-8 text-white p-4 hover:opacity-70 transition-opacity">
                            <ChevronRight size={40} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
