'use client';

import { ChevronDown, MapPin, Coffee, Car, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DayPlan {
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
    stay?: string;
}

interface ItineraryListProps {
    days: DayPlan[];
}

export default function ItineraryList({ days }: ItineraryListProps) {
    const [openDay, setOpenDay] = useState<number | null>(1);

    if (!days || days.length === 0) return null;

    return (
        <div className="space-y-4">
            {days.map((day) => (
                <div 
                    key={day.day}
                    className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm"
                >
                    <button
                        onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0">
                                Day {day.day}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 leading-snug">{day.title}</h3>
                                {day.stay && (
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1">
                                        <MapPin size={12} />
                                        <span>Stay in {day.stay}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ChevronDown 
                            className={`text-gray-400 transition-transform duration-300 ${openDay === day.day ? 'rotate-180' : ''}`}
                            size={20}
                        />
                    </button>

                    <AnimatePresence>
                        {openDay === day.day && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="px-6 pb-8 pt-2 border-t border-gray-50 ml-[72px]">
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                        {day.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        {day.activities && day.activities.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Car size={14} /> Activities
                                                </h4>
                                                <ul className="space-y-2">
                                                    {day.activities.map((act, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                                            <span>{act}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="space-y-6">
                                            {day.meals && day.meals.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Coffee size={14} /> Meals
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.meals.map((meal, i) => (
                                                            <span key={i} className="bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                                                                {meal}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {day.stay && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                        <Moon size={14} /> Night Stay
                                                    </h4>
                                                    <p className="text-sm font-semibold text-gray-900">{day.stay}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
