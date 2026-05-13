'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import SmartImage from './SmartImage';

const fallbackDestinations = [
    {
        id: 1,
        title: "Kaziranga Safaris",
        subtitle: "Assam",
        image: "https://images.unsplash.com/photo-1542152341-2e6bbf451e59?auto=format&fit=crop&q=80",
        size: "large",
        link: "/assam/kaziranga"
    },
    {
        id: 2,
        title: "Living Root Bridges",
        subtitle: "Meghalaya",
        image: "https://images.unsplash.com/photo-1698226068228-9842a22cc431?auto=format&fit=crop&q=80",
        size: "small",
        link: "/meghalaya/cherrapunji"
    },
    {
        id: 3,
        title: "Tawang Monastery",
        subtitle: "Arunachal",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80",
        size: "small",
        link: "/arunachal-pradesh/tawang"
    },
    {
        id: 4,
        title: "Dzukou Valley Trek",
        subtitle: "Nagaland",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&q=80",
        size: "horizontal",
        link: "/nagaland/kohima"
    }
];

export default function BentoDestinations({ destinations }: { destinations?: any[] }) {
    const displayItems = destinations && destinations.length >= 4 ? destinations.slice(0, 4) : fallbackDestinations;
    
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="h-[2px] w-12 bg-green-600 block"></span>
                            <span className="text-green-600 font-bold uppercase tracking-widest text-sm">Curated Experiences</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-display">
                            Must-Do in the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">North East</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[240px] md:auto-rows-[280px]">
                    {displayItems.map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative rounded-[2rem] overflow-hidden ${
                                dest.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                                dest.size === 'horizontal' ? 'md:col-span-2 md:row-span-1' : 
                                'md:col-span-1 md:row-span-1'
                            }`}
                        >
                            <Link href={dest.link} className="absolute inset-0 z-10 block">
                                <SmartImage 
                                    src={dest.image} 
                                    alt={dest.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Hover Arrow */}
                                <div className="absolute top-6 right-6 opacity-0 translate-y-4 translate-x-[-1rem] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white">
                                    <ArrowUpRight size={20} />
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={14} className="text-emerald-400" />
                                        <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest">{dest.subtitle}</span>
                                    </div>
                                    <h3 className={`font-bold text-white font-display leading-tight ${dest.size === 'large' ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
                                        {dest.title}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
