'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Tab {
    id: string;
    label: string;
}

const TABS: Tab[] = [
    { id: 'tab-overview', label: 'Discover' },
    { id: 'tab-attractions', label: 'Top Attractions' },
    { id: 'tab-tours', label: 'Curated Tours' },
    { id: 'tab-weather', label: 'Weather & Insights' },
    { id: 'tab-plantrip', label: 'Plan Your Trip' },
];

export default function CityTabs() {
    const [activeTab, setActiveTab] = useState('tab-overview');
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120; // account for sticky bar + tab bar height
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        setActiveTab(id);
    };

    // IntersectionObserver to auto-update active tab as user scrolls
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        TABS.forEach(tab => {
            const el = document.getElementById(tab.id);
            if (!el) return;

            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveTab(tab.id);
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    return (
        <nav className="sticky top-[65px] z-[30] bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={scrollRef} className="flex gap-1 overflow-x-auto scrollbar-hide no-scrollbar py-0"
                    style={{ scrollbarWidth: 'none' }}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => scrollTo(tab.id)}
                            className={`flex-shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'border-[#1a6b3c] text-[#1a6b3c] font-semibold'
                                    : 'border-transparent text-gray-500 hover:text-[#1a6b3c]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
