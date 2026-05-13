'use client';

import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { fetchStates, fetchCitiesByState, fetchAttractionsByCity } from '@/lib/api';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface LocationItem {
    id: string | number;
    name: string;
    slug: string;
    [key: string]: unknown;
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [states, setStates] = useState<LocationItem[]>([]);
    const [cities, setCities] = useState<LocationItem[]>([]);
    const [showStates, setShowStates] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [activeState, setActiveState] = useState<LocationItem | null>(null);
    const [activeCity, setActiveCity] = useState<LocationItem | null>(null);
    const [attractions, setAttractions] = useState<LocationItem[]>([]);
    const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
    const [isMobileHelpOpen, setIsMobileHelpOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const helpDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowStates(false);
                setActiveState(null);
                setActiveCity(null);
            }
            if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
                setShowHelp(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        async function loadStates() {
            try {
                const res = await fetchStates();
                setStates(res?.data || []);
            } catch (e) {
                console.error('Failed to load states', e);
            }
        }
        loadStates();
    }, []);

    const handleStateHover = async (state: any) => {
        setActiveState(state);
        setActiveCity(null); // Reset city when changing state
        setAttractions([]); // Reset attractions when changing state
        try {
            const res = await fetchCitiesByState(state.slug);
            setCities(res?.data || []);
        } catch (e) {
            console.error('Failed to load cities', e);
        }
    };

    const handleCityHover = async (city: any) => {
        setActiveCity(city);
        setAttractions([]); // Clear current attractions before loading new ones
        try {
            const res = await fetchAttractionsByCity(city.id as number);
            setAttractions(res?.data || []);
        } catch (e) {
            console.error('Failed to load attractions', e);
        }
    };

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
    ];

    const helpItems = [
        { name: 'Itineraries', href: '/itineraries' },
        { name: 'Deals', href: '/deals', border: true },
        { name: 'Booking Status', href: '/booking-status', border: true },
        { name: 'Search The Website', href: '/search' },
        { name: 'Northeast Info Panel', href: '/info' },
        { name: 'FAQs', href: '/faq', border: true },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Cancellation Policy', href: '/cancellation' },
        { name: 'Reschedule Policy', href: '/reschedule' },
        { name: 'Terms & Conditions', href: '/terms' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white ${isScrolled
                ? 'border-gray-100 shadow-lg py-1'
                : 'border-gray-200 py-3'
                }`}
        >
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        NorthEastForU
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-gray-600 hover:text-green-600 font-medium transition-colors nav-link py-2"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {/* Destinations Dropdown */}
                        <div
                            className="relative inline-block text-left"
                            ref={dropdownRef}
                            onMouseEnter={() => setShowStates(true)}
                            onMouseLeave={() => {
                                setShowStates(false);
                                setActiveState(null);
                                setActiveCity(null);
                            }}
                        >
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium transition-colors py-2"
                                onClick={() => setShowStates(!showStates)}
                            >
                                Destinations
                                <ChevronDown size={16} className={`transition-transform ${showStates ? 'rotate-180' : ''}`} />
                            </button>

                            {showStates && (
                                <div className="absolute left-0 mt-0 w-auto min-w-[250px] rounded-xl shadow-2xl bg-white ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex bg-white">
                                        {/* States Column */}
                                        <div className="w-[250px] py-2 border-r border-gray-50 max-h-[450px] overflow-y-auto">
                                            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">States</div>
                                            {states.map((state) => (
                                                <Link
                                                    key={state.slug}
                                                    href={`/${state.slug}`}
                                                    className={`group flex items-center justify-between w-full text-left px-4 py-2.5 text-sm transition-colors ${activeState?.slug === state.slug ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onMouseEnter={() => handleStateHover(state)}
                                                    onClick={() => { setShowStates(false); setActiveState(null); setActiveCity(null); }}
                                                >
                                                    <span className="flex-1">{state.name}</span>
                                                    <ChevronRight size={14} className={`transition-opacity ${activeState?.slug === state.slug ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Cities Column - Conditionally Rendered */}
                                        {activeState && (
                                            <div className="w-[250px] py-2 bg-gray-50/50 max-h-[450px] overflow-y-auto duration-300 animate-in fade-in slide-in-from-left-2">
                                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    Cities in {activeState.name}
                                                </div>
                                                {cities.length > 0 ? (
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {cities.map((city) => (
                                                            <Link
                                                                key={city.slug}
                                                                href={`/cities/${city.slug}`}
                                                                className={`block px-4 py-2 text-sm transition-colors ${activeCity?.slug === city.slug ? 'text-green-600 bg-white font-medium' : 'text-gray-600 hover:text-green-600 hover:bg-white'}`}
                                                                onClick={() => {
                                                                    setShowStates(false);
                                                                    setActiveState(null);
                                                                    setActiveCity(null);
                                                                }}
                                                                onMouseEnter={() => handleCityHover(city)}
                                                            >
                                                                {city.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-8 text-center">
                                                        <div className="text-sm text-gray-400 italic">No cities found</div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Attractions Column - Conditionally Rendered */}
                                        {activeCity && (
                                            <div className="w-[250px] py-2 bg-gray-100/50 max-h-[450px] overflow-y-auto duration-300 animate-in fade-in slide-in-from-left-2">
                                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                                    Attractions in {activeCity.name}
                                                </div>
                                                {attractions.length > 0 ? (
                                                    <div className="grid grid-cols-1 gap-1">
                                                        {attractions.map((attraction) => (
                                                            <Link
                                                                key={attraction.slug}
                                                                href={`/attractions/${attraction.slug}`}
                                                                className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-white transition-colors"
                                                                onClick={() => {
                                                                    setShowStates(false);
                                                                    setActiveState(null);
                                                                    setActiveCity(null);
                                                                }}
                                                            >
                                                                {attraction.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-8 text-center">
                                                        <div className="text-sm text-gray-400 italic">No attractions found</div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Help Dropdown */}
                        <div
                            className="relative inline-block text-left"
                            ref={helpDropdownRef}
                            onMouseEnter={() => setShowHelp(true)}
                            onMouseLeave={() => setShowHelp(false)}
                        >
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium transition-colors py-2"
                                onClick={() => setShowHelp(!showHelp)}
                            >
                                Help
                                <ChevronDown size={16} className={`transition-transform ${showHelp ? 'rotate-180' : ''}`} />
                            </button>

                            {showHelp && (
                                <div className="absolute left-0 mt-0 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="py-2">
                                        {helpItems.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                className={`block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors ${item.border ? 'border-b border-gray-100' : ''}`}
                                                onClick={() => setShowHelp(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-green-600 font-medium transition-colors nav-link py-2"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                            className="text-gray-600 hover:text-green-600 transition-colors p-2"
                            aria-label="Search"
                        >
                            <Search size={22} />
                        </button>

                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href="/plan-my-trip"
                                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-7 py-3 rounded-full font-bold hover:shadow-xl hover:shadow-green-500/20 transition-all hover-scale relative overflow-hidden group"
                            >
                                <span className="relative z-10">Plan Your Trip</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-green-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl slide-in-bottom">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-lg font-medium text-gray-900 hover:text-green-600 px-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Destinations Accordion */}
                        <div>
                            <button
                                onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                                className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-green-600 px-2 py-1"
                            >
                                Destinations
                                <ChevronDown size={20} className={`transition-transform ${isMobileDestinationsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMobileDestinationsOpen && (
                                <div className="mt-2 ml-4 space-y-3 border-l-2 border-green-50 animate-in slide-in-from-left-2 duration-200">
                                    {states.map((state) => (
                                        <div key={state.slug} className="pl-4">
                                            <div
                                                className="text-gray-700 font-medium py-1 cursor-pointer"
                                                onClick={() => handleStateHover(state)}
                                            >
                                                {state.name}
                                            </div>
                                            {activeState?.slug === state.slug && (
                                                <div className="mt-1 ml-2 space-y-2">
                                                    {cities.map((city) => (
                                                        <Link
                                                            key={city.slug}
                                                            href={`/cities/${city.slug}`}
                                                            className="block text-sm text-gray-500 hover:text-green-600 py-1"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {city.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Help Accordion */}
                        <div>
                            <button
                                onClick={() => setIsMobileHelpOpen(!isMobileHelpOpen)}
                                className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-green-600 px-2 py-1"
                            >
                                Help
                                <ChevronDown size={20} className={`transition-transform ${isMobileHelpOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMobileHelpOpen && (
                                <div className="mt-2 ml-4 space-y-2 border-l-2 border-green-50 animate-in slide-in-from-left-2 duration-200">
                                    {helpItems.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className="block pl-4 py-2 text-base text-gray-600 hover:text-green-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/contact"
                            className="block text-lg font-medium text-gray-900 hover:text-green-600 px-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        <div className="pt-4 border-t border-gray-50 flex flex-col space-y-4">
                            <Link
                                href="/plan-my-trip"
                                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-green-700 transition-all active:scale-95"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Plan Your Trip
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
