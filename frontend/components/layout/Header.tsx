'use client';

import Link from 'next/link';
import { Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const DESTINATIONS = [
    {
        name: 'Assam',
        slug: 'assam',
        places: [
            { name: 'Why Assam?', slug: '', why: true },
            { name: 'Guwahati', slug: 'guwahati' },
            { name: 'Kaziranga', slug: 'kaziranga' },
            { name: 'Majuli', slug: 'majuli' },
            { name: 'Pobitora', slug: 'pobitora' },
            { name: 'Manas', slug: 'manas' },
            { name: 'Sibsagar', slug: 'sibsagar' },
            { name: 'Mayong', slug: 'mayong' },
            { name: 'Orang National Park', slug: 'orang-national-park' },
        ],
    },
    {
        name: 'Meghalaya',
        slug: 'meghalaya',
        places: [
            { name: 'Why Meghalaya?', slug: '', why: true },
            { name: 'Shillong', slug: 'shillong' },
            { name: 'Laitlum', slug: 'laitlum' },
            { name: 'Cherrapunji', slug: 'cherrapunji' },
            { name: 'Mawsynram', slug: 'mawsynram' },
            { name: 'Dawki', slug: 'dawki' },
            { name: 'Mawlynnong', slug: 'mawlynnong' },
            { name: 'Jowai', slug: 'jowai' },
            { name: 'Umiam', slug: 'umiam' },
        ],
    },
    {
        name: 'Mizoram',
        slug: 'mizoram',
        places: [
            { name: 'Why Mizoram?', slug: '', why: true },
            { name: 'Aizawl', slug: 'aizawl' },
            { name: 'Vantawng Falls', slug: 'vantawng-falls' },
            { name: 'Tam Dil Lake', slug: 'tam-dil-lake' },
            { name: 'Palak Dil', slug: 'palak-dil' },
            { name: 'Champhai Valley', slug: 'champhai-valley' },
            { name: 'Dampa Tiger Reserve', slug: 'dampa-tiger-reserve' },
        ],
    },
    {
        name: 'Nagaland',
        slug: 'nagaland',
        places: [
            { name: 'Why Nagaland?', slug: '', why: true },
            { name: 'Kohima', slug: 'kohima' },
            { name: 'Dimapur', slug: 'dimapur' },
            { name: 'Dzukou Valley', slug: 'dzukou-valley' },
            { name: 'Hornbill Festival', slug: 'hornbill-festival' },
            { name: 'Mon District', slug: 'mon-district' },
            { name: 'Phek & Tuensang', slug: 'phek-tuensang' },
        ],
    },
    {
        name: 'Manipur',
        slug: 'manipur',
        places: [
            { name: 'Why Manipur?', slug: '', why: true },
            { name: 'Imphal', slug: 'imphal' },
            { name: 'Loktak Lake', slug: 'loktak-lake' },
            { name: 'Moirang & INA', slug: 'moirang' },
            { name: 'Ukhrul & Shirui', slug: 'ukhrul' },
            { name: 'Tamenglong', slug: 'tamenglong' },
            { name: 'Bishnupur & Andro', slug: 'bishnupur' },
        ],
    },
    {
        name: 'Tripura',
        slug: 'tripura',
        places: [
            { name: 'Why Tripura?', slug: '', why: true },
            { name: 'Agartala', slug: 'agartala' },
            { name: 'Neermahal', slug: 'neermahal' },
            { name: 'Unakoti', slug: 'unakoti' },
            { name: 'Jampui Hills', slug: 'jampui-hills' },
            { name: 'Sepahijala', slug: 'sepahijala' },
            { name: 'Pilak & Boxanagar', slug: 'pilak' },
        ],
    },
    {
        name: 'Arunachal Pradesh',
        slug: 'arunachal-pradesh',
        places: [
            { name: 'Why Arunachal?', slug: '', why: true },
            { name: 'Tawang', slug: 'tawang' },
            { name: 'Ziro Valley', slug: 'ziro-valley' },
            { name: 'Bomdila & Dirang', slug: 'bomdila' },
            { name: 'Mechuka', slug: 'mechuka' },
            { name: 'Namdapha', slug: 'namdapha' },
            { name: 'Pakke & Eaglenest', slug: 'pakke' },
            { name: 'Sela Pass & Bumla', slug: 'sela-pass' },
        ],
    },
    {
        name: 'Sikkim',
        slug: 'sikkim',
        places: [
            { name: 'Why Sikkim?', slug: '', why: true },
            { name: 'Gangtok', slug: 'gangtok' },
            { name: 'Tsomgo & Nathula', slug: 'tsomgo-lake' },
            { name: 'Pelling & Ravangla', slug: 'pelling' },
            { name: 'North Sikkim', slug: 'north-sikkim' },
            { name: 'Silk Route & Zuluk', slug: 'zuluk' },
            { name: 'Namchi & South', slug: 'namchi' },
        ],
    },
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

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDest, setShowDest] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [activeState, setActiveState] = useState(DESTINATIONS[0]);
    const [mobileDestOpen, setMobileDestOpen] = useState(false);
    const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
    const [mobileExpandedState, setMobileExpandedState] = useState<string | null>(null);
    const destRef = useRef<HTMLDivElement>(null);
    const helpRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (destRef.current && !destRef.current.contains(e.target as Node)) setShowDest(false);
            if (helpRef.current && !helpRef.current.contains(e.target as Node)) setShowHelp(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white ${isScrolled ? 'border-gray-100 shadow-lg py-1' : 'border-gray-200 py-3'}`}>
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#7fff27]/20"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold text-[#16a34a]">
                        NorthEast<span className="text-[#7fff27]">ForU</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="text-gray-600 hover:text-green-600 font-medium transition-colors py-2">
                                {item.name}
                            </Link>
                        ))}

                        {/* Destinations Mega-Menu */}
                        <div
                            className="relative"
                            ref={destRef}
                            onMouseEnter={() => setShowDest(true)}
                            onMouseLeave={() => setShowDest(false)}
                        >
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium transition-colors py-2"
                                onClick={() => setShowDest(!showDest)}
                            >
                                Destinations
                                <ChevronDown size={16} className={`transition-transform duration-200 ${showDest ? 'rotate-180' : ''}`} />
                            </button>

                            {showDest && (
                                <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-[620px] rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 z-50 overflow-hidden">
                                    <div className="flex">
                                        {/* States list */}
                                        <div className="w-[200px] bg-gray-50 py-3 border-r border-gray-100">
                                            <p className="px-4 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Choose State</p>
                                            {DESTINATIONS.map((dest) => (
                                                <button
                                                    key={dest.slug}
                                                    type="button"
                                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors text-left ${activeState.slug === dest.slug ? 'bg-white text-green-700 border-r-2 border-green-500' : 'text-gray-700 hover:bg-white hover:text-green-600'}`}
                                                    onMouseEnter={() => setActiveState(dest)}
                                                >
                                                    <span>{dest.name}</span>
                                                    <ChevronRight size={13} className={`transition-opacity ${activeState.slug === dest.slug ? 'opacity-100 text-green-500' : 'opacity-0'}`} />
                                                </button>
                                            ))}
                                        </div>

                                        {/* Destinations for active state */}
                                        <div className="flex-1 py-4 px-2">
                                            <div className="px-3 pb-3 border-b border-gray-50 mb-2">
                                                <Link
                                                    href={`/${activeState.slug}`}
                                                    className="inline-flex items-center gap-2 text-green-700 font-bold text-sm hover:text-green-600"
                                                    onClick={() => setShowDest(false)}
                                                >
                                                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">→</span>
                                                    Why {activeState.name}? — Full Guide
                                                </Link>
                                            </div>
                                            <div className="grid grid-cols-2 gap-0.5">
                                                {activeState.places.filter(p => !p.why).map((place) => (
                                                    <Link
                                                        key={place.slug}
                                                        href={`/${activeState.slug}/${place.slug}`}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors group"
                                                        onClick={() => setShowDest(false)}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-green-500 transition-colors flex-shrink-0"></span>
                                                        {place.name}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-gray-50 px-3">
                                                <Link
                                                    href={`/${activeState.slug}`}
                                                    className="text-xs text-gray-400 hover:text-green-600 transition-colors"
                                                    onClick={() => setShowDest(false)}
                                                >
                                                    View all of {activeState.name} →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Help Dropdown */}
                        <div
                            className="relative"
                            ref={helpRef}
                            onMouseEnter={() => setShowHelp(true)}
                            onMouseLeave={() => setShowHelp(false)}
                        >
                            <button
                                type="button"
                                className="inline-flex items-center gap-1 text-gray-600 hover:text-green-600 font-medium transition-colors py-2"
                                onClick={() => setShowHelp(!showHelp)}
                            >
                                Help
                                <ChevronDown size={16} className={`transition-transform duration-200 ${showHelp ? 'rotate-180' : ''}`} />
                            </button>

                            {showHelp && (
                                <div className="absolute left-0 mt-0 w-64 rounded-xl shadow-2xl bg-white ring-1 ring-black/5 z-50 overflow-hidden">
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

                        <Link href="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors py-2">
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
                        <div className="hidden md:flex items-center">
                            <Link
                                href="/plan-my-trip"
                                className="bg-[#7fff27] text-black px-7 py-3 rounded-full font-bold hover:shadow-xl hover:shadow-[#7fff27]/20 transition-all relative overflow-hidden group"
                            >
                                <span className="relative z-10">Plan Your Trip</span>
                                <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Link>
                        </div>
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-green-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-5 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block py-3 px-2 text-base font-medium text-gray-900 hover:text-green-600 border-b border-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Destinations */}
                        <div className="border-b border-gray-50">
                            <button
                                onClick={() => setMobileDestOpen(!mobileDestOpen)}
                                className="flex items-center justify-between w-full py-3 px-2 text-base font-medium text-gray-900"
                            >
                                Destinations
                                <ChevronDown size={18} className={`transition-transform ${mobileDestOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileDestOpen && (
                                <div className="pb-3 space-y-1">
                                    {DESTINATIONS.map((dest) => (
                                        <div key={dest.slug}>
                                            <button
                                                onClick={() => setMobileExpandedState(mobileExpandedState === dest.slug ? null : dest.slug)}
                                                className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-green-600 rounded-lg"
                                            >
                                                <span>{dest.name}</span>
                                                <ChevronDown size={15} className={`transition-transform text-gray-400 ${mobileExpandedState === dest.slug ? 'rotate-180' : ''}`} />
                                            </button>
                                            {mobileExpandedState === dest.slug && (
                                                <div className="pl-4 pb-2 space-y-0.5">
                                                    <Link
                                                        href={`/${dest.slug}`}
                                                        className="block px-3 py-2 text-sm font-bold text-green-600"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Why {dest.name}? →
                                                    </Link>
                                                    {dest.places.filter(p => !p.why).map((place) => (
                                                        <Link
                                                            key={place.slug}
                                                            href={`/${dest.slug}/${place.slug}`}
                                                            className="block px-3 py-1.5 text-sm text-gray-500 hover:text-green-600"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {place.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Help */}
                        <div className="border-b border-gray-50">
                            <button
                                onClick={() => setMobileHelpOpen(!mobileHelpOpen)}
                                className="flex items-center justify-between w-full py-3 px-2 text-base font-medium text-gray-900"
                            >
                                Help
                                <ChevronDown size={18} className={`transition-transform ${mobileHelpOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileHelpOpen && (
                                <div className="pb-3 pl-4 space-y-1">
                                    {helpItems.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/contact" className="block py-3 px-2 text-base font-medium text-gray-900 hover:text-green-600 border-b border-gray-50" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>

                        <div className="pt-3">
                            <Link
                                href="/plan-my-trip"
                                className="block bg-[#7fff27] text-black px-6 py-3 rounded-xl font-bold text-center hover:bg-[#6ee620] transition-all"
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
