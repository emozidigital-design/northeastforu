'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AboutSections() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-[#0f1e14]">About the NorthEastForU Blog</h3>
                    <div className={`text-gray-600 leading-relaxed overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[120px]'}`}>
                        <p>
                            NorthEastForU is your trusted travel guide for North East India, covering all 8 states with expert destination guides, travel tips, itineraries, and local insights. Our goal is to help every traveller discover the incredible beauty and culture of India's most diverse region.
                        </p>
                        {isExpanded && (
                            <div className="mt-4 space-y-4 animate-in fade-in duration-700">
                                <p>
                                    Whether you're looking for the best time to visit the living root bridges of Meghalaya, tips for a rhino safari in Kaziranga, or a hidden homestay in the mountains of Arunachal, our contributors share first-hand experiences to make your journey unforgettable.
                                </p>
                                <p>
                                    We believe in sustainable travel that respects local communities and preserves the pristine environment of the region.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-[#0f1e14]">About NorthEastForU</h3>
                    <div className={`text-gray-600 leading-relaxed overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[120px]'}`}>
                        <p>
                            NorthEastForU is a dedicated travel platform built by Emozi Digital, covering Assam, Meghalaya, Arunachal Pradesh, Nagaland, Sikkim, Manipur, Mizoram, and Tripura. We publish detailed travel guides, honest reviews, and practical itineraries to help you plan the perfect North East India trip.
                        </p>
                        {isExpanded && (
                            <div className="mt-4 space-y-4 animate-in fade-in duration-700">
                                <p>
                                    Our platform connects travellers with local service providers, ensuring you get authentic experiences while supporting the local economy. From budget trips to luxury explorations, we provide comprehensive resources for all types of explorers.
                                </p>
                                <p>
                                    Visit: <a href="https://northeastforu.com" className="text-green-600 font-bold hover:underline">northeastforu.com</a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 mx-auto text-green-600 font-bold hover:text-green-700 group transition-colors"
            >
                {isExpanded ? (
                    <>Show Less <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                    <>Read More <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" /></>
                )}
            </button>
        </div>
    );
}
