'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface CityStickyBarProps {
    title: string;
    stateName: string;
}

export default function CityStickyBar({ title, stateName }: CityStickyBarProps) {
    const [visible, setVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('tab-overview');

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // IntersectionObserver to auto-update active tab as user scrolls
    useEffect(() => {
        const tabs = [
            'tab-overview', 'tab-attractions', 'tab-tours', 'tab-weather', 'tab-plantrip'
        ];
        const observers: IntersectionObserver[] = [];

        tabs.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveTab(id);
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100; // account for sticky bar height
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    const handlePlanTrip = () => scrollTo('tab-plantrip');

    return (
        <div className={`fixed top-[65px] left-0 right-0 z-[40] bg-white border-b border-gray-200 shadow-lg transition-all duration-500 ease-in-out
            ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-6">
                {/* Title */}
                <h2 className="font-bold text-gray-900 text-sm truncate max-w-[240px] hidden md:block">
                    {title.length > 40 ? title.slice(0, 40) + '...' : title}
                </h2>

                {/* State Tag */}
                <div className="hidden md:flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full flex-shrink-0">
                    <MapPin size={14} className="text-green-600" />
                    <span className="font-bold text-sm text-green-700">{stateName}</span>
                </div>

                {/* Jump links */}
                <nav className="hidden lg:flex items-center gap-0.5 text-sm ml-auto">
                    {[
                        { id: 'tab-overview', label: 'Discover' },
                        { id: 'tab-attractions', label: 'Top Attractions' },
                        { id: 'tab-tours', label: 'Curated Tours' },
                        { id: 'tab-weather', label: 'Weather & Insights' },
                        { id: 'tab-plantrip', label: 'Plan Your Trip' }
                    ].map(tab => (
                        <button 
                            key={tab.id} 
                            onClick={() => scrollTo(tab.id)}
                            className={`px-2 py-1.5 rounded-lg transition-all font-medium ${
                                activeTab === tab.id 
                                ? 'text-green-600 bg-green-50 font-bold' 
                                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* 24/7 Help / Plan Trip */}
                <div className="ml-auto lg:ml-4 flex items-center gap-3 flex-shrink-0">
                    <a href="https://wa.me/918811909095" target="_blank" rel="noopener noreferrer" 
                        className="hidden xl:flex items-center gap-1.5 text-gray-600 hover:text-green-600 font-medium text-sm transition-colors">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        24/7 Expert Help
                    </a>
                    <button onClick={handlePlanTrip}
                        className="bg-[#1a6b3c] flex items-center justify-center text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-all gap-1.5 shadow-md hover:shadow-lg">
                        <Calendar size={16} /> Plan Trip
                    </button>
                </div>
            </div>
        </div>
    );
}
