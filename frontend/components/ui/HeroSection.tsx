'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES as CURATED_SLIDES, getCuratedImage } from '@/lib/curatedImages';

const INTERVAL = 5000;

export default function HeroSection({
    customClass,
    title,
    subtitle,
    showSearch = false,
    images,
    image,
    slug,
    contentType,
}: {
    title: string;
    subtitle: string;
    image?: string;
    showSearch?: boolean;
    images?: { src: string; label?: string; location?: string }[];
    slug?: string;
    contentType?: 'state' | 'city' | 'attraction';
    customClass?: string;
}) {

    // If a single image is provided, wrap it in the expected slides format for the background engine
    let effectiveImages = images ?? (image ? [{ src: image, label: title }] : CURATED_SLIDES);

    // If it's a single image and it looks like a missing local path in dev, or if it's missing entirely, try curated
    if (!images && (contentType || slug)) {
        const lookupSlug = slug || title.toLowerCase().replace(/\s+/g, '-');
        const curated = getCuratedImage(lookupSlug, contentType || 'state');

        if (curated && (!image || (image.startsWith('/images') && process.env.NODE_ENV === 'development'))) {
            effectiveImages = [{ src: curated, label: title }];
        }
    }

    // Use the image as-is; curated images are already reliable Unsplash URLs
    const slides = effectiveImages.map((slide: { src: string; label?: string; location?: string }) => ({
        ...slide,
        src: slide.src || CURATED_SLIDES[0].src,
    }));

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (slides.length < 2) return;

        const timer = setInterval(() => {
            setCurrent((prev: number) => (prev + 1) % slides.length);
        }, INTERVAL);

        return () => clearInterval(timer);
    }, [slides.length]);

    const goTo = (idx: number) => {
        setCurrent(idx);
    };

    return (
        <section className={`relative ${customClass ? customClass : 'h-screen min-h-[560px] max-h-[900px]'} flex items-center justify-center overflow-hidden`}>
            {/* ── Background slides ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slides[current].src})` }}
                />
            </AnimatePresence>

            {/* Dark overlay */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/10 via-black/20 to-black/40" />

            {/* ── Content ── */}
            <div className="relative z-[3] text-center text-white px-4 max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Location badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            {slides[current].location ?? 'North East India'}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-5 drop-shadow-xl leading-tight">
                            {title}
                        </h1>

                        <p className="text-lg md:text-xl mb-8 drop-shadow-md text-gray-200 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {showSearch && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="max-w-2xl mx-auto flex items-center glass-panel bg-white/20 backdrop-blur-2xl rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-white/30 transform hover:scale-[1.01] transition-all duration-300"
                    >
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="flex-grow px-8 py-4 text-white placeholder:text-white/60 text-lg rounded-full focus:outline-none bg-transparent"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                            readOnly
                        />
                        <button
                            className="btn-paradise text-white px-10 py-4 rounded-full font-bold flex-shrink-0 shadow-lg"
                            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                        >
                            Search
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 text-white/40 animate-bounce">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>

            {/* ── Bottom bar: slide label + dot indicators ── */}
            <div className="absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between px-8 pb-8">
                {/* Current slide label */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={current}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="text-white/70 text-sm font-medium tracking-wide hidden md:block"
                    >
                        {slides[current].label}
                    </motion.p>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex gap-2 mx-auto md:mx-0">
                    {slides.map((_: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => goTo(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === current
                                ? 'w-8 bg-white'
                                : 'w-3 bg-white/40 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </div>

                {/* Counter */}
                <p className="text-white/50 text-sm font-mono hidden md:block">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </p>
            </div>
        </section>
    );
}
