'use client';

import { MapPin, Star, Clock } from 'lucide-react';

interface Attraction {
    name: string;
    location: string;
    why_visit: string;
    best_time: string;
    rating?: number;
}

interface AttractionTableProps {
    stateName: string;
    attractions: Attraction[];
}

export default function AttractionTable({ stateName, attractions }: AttractionTableProps) {
    if (!attractions || attractions.length === 0) return null;

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    Top Attractions in {stateName}
                </h2>
                <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full w-fit">
                    Must-visit spots
                </span>
            </div>

            <div className="overflow-hidden border border-gray-100 rounded-3xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Attraction</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Why Visit?</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Best Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {attractions.map((attr, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">{attr.name}</span>
                                            {attr.rating && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            size={10} 
                                                            className={i < (attr.rating || 0) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} 
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5 text-gray-600">
                                            <MapPin size={14} className="text-gray-400" />
                                            <span className="text-sm">{attr.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm text-gray-600 leading-relaxed max-w-xs md:max-w-sm">
                                            {attr.why_visit}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5 text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full w-fit">
                                            <Clock size={14} />
                                            <span className="text-[12px]">{attr.best_time}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
