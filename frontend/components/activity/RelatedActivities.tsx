'use client';

import React from 'react';
import Link from 'next/link';
import SmartImage from '@/components/ui/SmartImage';
import { Star, Clock, BarChart2 } from 'lucide-react';

interface Activity {
    id: number;
    slug: string;
    name: string;
    featured_image?: string;
    duration?: string;
    difficulty?: string;
    price?: number;
    price_discounted?: number;
    rating?: number;
    review_count?: number;
    category?: string;
}

interface RelatedActivitiesProps {
    activities: Activity[];
    locationLabel: string;
}

export default function RelatedActivities({ activities, locationLabel }: RelatedActivitiesProps) {
    if (!activities?.length) return null;

    return (
        <section className="mt-16 pt-16 border-t border-[#eeeeee]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">EXPLORE MORE</span>
                    <h2 className="font-serif text-[32px] font-bold text-[#0f1e14]">Similar Activities</h2>
                </div>
                <Link href="/activities" className="text-[#1a6b3c] font-bold hover:underline text-[14px]">
                    View all →
                </Link>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activities.map(act => {
                    const displayPrice = act.price_discounted || act.price;
                    return (
                        <Link key={act.id} href={`/activities/${act.slug}`}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                            
                            {/* Image - 3:2 ratio */}
                            <div className="aspect-[3/2] relative overflow-hidden bg-gray-100">
                                <SmartImage
                                    src={act.featured_image || '/images/activity-placeholder.jpg'}
                                    alt={act.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                                />
                                {act.rating && act.rating > 0 && (
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-bold text-gray-900">{Number(act.rating).toFixed(1)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Content - Padded box */}
                            <div className="flex flex-col p-5 flex-1">
                                {act.category && (
                                    <span className="text-xs font-medium text-[#1a6b3c] uppercase mb-2">
                                        {act.category}
                                    </span>
                                )}
                                
                                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-[#1a6b3c] transition-colors line-clamp-2">
                                    {act.name}
                                </h3>

                                <div className="text-sm text-gray-500 mb-4 flex items-center gap-3">
                                    {act.duration && (
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {act.duration}</span>
                                    )}
                                    {act.difficulty && (
                                        <span className="flex items-center gap-1.5"><BarChart2 size={14} /> {act.difficulty}</span>
                                    )}
                                </div>

                                {/* Price / Enquire */}
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        {displayPrice ? (
                                            <span className="font-bold text-gray-900 text-base">
                                                ₹{Number(displayPrice).toLocaleString('en-IN')}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-500">Contact for price</span>
                                        )}
                                    </div>
                                    <span className="text-sm font-bold text-[#1a6b3c]">
                                        Explore
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
