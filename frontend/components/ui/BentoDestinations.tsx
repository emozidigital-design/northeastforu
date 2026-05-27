'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Clock } from 'lucide-react';

interface BentoItem {
    id: number;
    title: string;
    subtitle: string;
    category?: string;
    image?: string;
    images?: string[];
    size: 'large' | 'small' | 'horizontal';
    link: string;
    duration?: string;
    tagline?: string;
}

const CATEGORY_STYLES: Record<string, { pill: string; dot: string }> = {
    NATURE: { pill: 'bg-emerald-500 text-white', dot: 'bg-emerald-300' },
    CULTURE: { pill: 'bg-amber-500 text-white', dot: 'bg-amber-300' },
    ADVENTURE: { pill: 'bg-sky-500 text-white', dot: 'bg-sky-300' },
    LUXURY: { pill: 'bg-violet-600 text-white', dot: 'bg-violet-300' },
};

const FALLBACK_ITEMS: BentoItem[] = [
    {
        id: 1,
        title: "Classic Assam & Meghalaya",
        subtitle: "Assam · Meghalaya",
        category: "NATURE",
        images: [
            "/images/assam/assam-2.jpg",
            "/images/assam/assam-3.jpg",
            "/images/assam/assam-4.jpg",
            "/images/meghalaya/meghalaya-1.jpg",
            "/images/meghalaya/meghalaya-2.jpg",
        ],
        size: "large",
        link: "/itineraries/classic-assam-meghalaya",
        duration: "8 Days",
        tagline: "Rhinos, root bridges & rain forests",
    },
    {
        id: 2,
        title: "Nagaland Cultural Trail",
        subtitle: "Nagaland",
        category: "CULTURE",
        images: [
            "/images/nagaland/nagaland-1.jpg",
            "/images/nagaland/nagaland-2.jpg",
            "/images/nagaland/nagaland-3.jpg",
        ],
        size: "small",
        link: "/itineraries/nagaland-cultural-trail",
        duration: "6 Days",
        tagline: "Ancient tribes & hornbill festivals",
    },
    {
        id: 3,
        title: "Sikkim Himalayan Explorer",
        subtitle: "Sikkim",
        category: "ADVENTURE",
        images: [
            "/images/sikkim/sikkim-1.jpg",
            "/images/sikkim/sikkim-2.jpg",
            "/images/sikkim/sikkim-3.jpg",
        ],
        size: "small",
        link: "/itineraries/sikkim-himalayan-explorer",
        duration: "7 Days",
        tagline: "High passes & ancient monasteries",
    },
    {
        id: 4,
        title: "Northeast Grand Tour",
        subtitle: "Full Northeast",
        category: "LUXURY",
        images: [
            "/images/arunachal-pradesh/arunachal-pradesh-1.jpg",
            "/images/arunachal-pradesh/arunachal-pradesh-2.jpg",
            "/images/arunachal-pradesh/arunachal-pradesh-3.jpg",
            "/images/sikkim/sikkim-2.jpg",
            "/images/meghalaya/meghalaya-3.jpg",
        ],
        size: "horizontal",
        link: "/itineraries/northeast-grand-tour",
        duration: "14 Days",
        tagline: "The complete northeast experience",
    },
];

// Per-card image slider
function CardSlider({
    images,
    alt,
    interval = 4000,
    offset = 0,
}: {
    images: string[];
    alt: string;
    interval?: number;
    offset?: number;
}) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;
        // Stagger start so cards don't all slide simultaneously
        const delay = setTimeout(() => {
            const timer = setInterval(() => {
                setCurrent((prev) => (prev + 1) % images.length);
            }, interval);
            return () => clearInterval(timer);
        }, offset);
        return () => clearTimeout(delay);
    }, [images.length, interval, offset]);

    return (
        <div className="absolute inset-0">
            <AnimatePresence mode="sync">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[current]}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                        priority={current === 0}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function BentoDestinations({ destinations }: { destinations?: any[] }) {
    const items: BentoItem[] =
        destinations && destinations.length >= 4
            ? destinations.slice(0, 4)
            : FALLBACK_ITEMS;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="h-[2px] w-12 bg-[#7fff27] block" />
                            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">
                                Curated Experiences
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-display">
                            Must-Do in the{' '}
                            <br />
                            <span className="text-[#16a34a]">
                                North <span className="text-[#7fff27]">East</span>
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/itineraries"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-800 border-b-2 border-[#7fff27] pb-0.5 hover:text-green-700 transition-colors self-end md:self-auto whitespace-nowrap"
                    >
                        View all journeys
                        <ArrowUpRight
                            size={15}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
                    {items.map((dest, i) => {
                        const cat = CATEGORY_STYLES[dest.category ?? ''] ?? {
                            pill: 'bg-gray-600 text-white',
                            dot: 'bg-gray-400',
                        };
                        const isLarge = dest.size === 'large';
                        const isHorizontal = dest.size === 'horizontal';
                        const images = dest.images ?? (dest.image ? [dest.image] : []);

                        return (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`group relative rounded-[1.75rem] overflow-hidden shadow-md ${isLarge
                                    ? 'md:col-span-2 md:row-span-2'
                                    : isHorizontal
                                        ? 'md:col-span-2 md:row-span-1'
                                        : 'md:col-span-1 md:row-span-1'
                                    }`}
                            >
                                {/* Sliding image background */}
                                {images.length > 0 && (
                                    <CardSlider
                                        images={images}
                                        alt={dest.title}
                                        interval={4500}
                                        offset={i * 1100}
                                    />
                                )}

                                {/* Zoom effect on hover — separate from slider */}
                                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] pointer-events-none z-[1]" />

                                {/* Dark gradient */}
                                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-colors duration-300" />

                                {/* Clickable content layer */}
                                <Link href={dest.link} className="absolute inset-0 z-[3] flex flex-col justify-between p-5">

                                    {/* Top row: category + duration */}
                                    <div className="flex items-center justify-between">
                                        {dest.category && (
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${cat.pill}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                                                {dest.category}
                                            </span>
                                        )}
                                        {dest.duration && (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                                <Clock size={10} />
                                                {dest.duration}
                                            </span>
                                        )}
                                    </div>

                                    {/* Bottom: location + title + tagline + CTA */}
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <MapPin size={11} className="text-[#7fff27] flex-shrink-0" />
                                            <span className="text-[#7fff27] font-bold text-[10px] uppercase tracking-[0.18em]">
                                                {dest.subtitle}
                                            </span>
                                        </div>

                                        <h3
                                            className={`font-extrabold text-white leading-tight ${isLarge
                                                ? 'text-3xl md:text-[2.1rem] mb-2'
                                                : 'text-[1.1rem] md:text-[1.2rem] mb-1'
                                                }`}
                                        >
                                            {dest.title}
                                        </h3>

                                        {(isLarge || isHorizontal) && dest.tagline && (
                                            <p className="text-white/55 text-sm leading-snug mb-2">
                                                {dest.tagline}
                                            </p>
                                        )}

                                        {/* CTA — slides up on hover */}
                                        <div className="flex items-center gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                                            <span className="text-xs font-bold text-white">Explore Journey</span>
                                            <ArrowUpRight size={13} className="text-[#7fff27]" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
