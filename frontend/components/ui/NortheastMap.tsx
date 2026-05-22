'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronRight, MapPin, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface City  { name: string; slug: string; lat: number; lng: number; }
interface NEState {
    name: string; slug: string; lat: number; lng: number;
    tagline: string; image: string; highlights: string[];
    color: string; initial: string; type: string;
    cities: City[];
}

const NE_STATES: NEState[] = [
    {
        name: 'Assam', slug: 'assam', lat: 26.14, lng: 92.90,
        color: '#f59e0b', initial: 'A', type: 'Wildlife & Nature',
        tagline: 'Wildlife safaris & tea garden escapes',
        image: '/images/assam/assam-1.jpg',
        highlights: ['Kaziranga', 'Majuli', 'Manas'],
        cities: [
            { name: 'Guwahati',           slug: 'guwahati',           lat: 26.1445, lng: 91.7362 },
            { name: 'Kaziranga',          slug: 'kaziranga',          lat: 26.5775, lng: 93.1711 },
            { name: 'Majuli',             slug: 'majuli',             lat: 26.9500, lng: 94.1900 },
            { name: 'Pobitora',           slug: 'pobitora',           lat: 26.2285, lng: 92.0432 },
            { name: 'Manas',              slug: 'manas',              lat: 26.7000, lng: 91.0000 },
            { name: 'Sibsagar',           slug: 'sibsagar',           lat: 26.9869, lng: 94.6406 },
            { name: 'Mayong',             slug: 'mayong',             lat: 26.1867, lng: 92.0167 },
            { name: 'Orang National Park',slug: 'orang-national-park',lat: 26.5000, lng: 92.2500 },
        ],
    },
    {
        name: 'Meghalaya', slug: 'meghalaya', lat: 25.47, lng: 91.37,
        color: '#10b981', initial: 'M', type: 'Nature & Waterfalls',
        tagline: 'Living root bridges & endless waterfalls',
        image: '/images/meghalaya/meghalaya-1.jpg',
        highlights: ['Shillong', 'Cherrapunji', 'Dawki'],
        cities: [
            { name: 'Shillong',    slug: 'shillong',    lat: 25.5788, lng: 91.8933 },
            { name: 'Laitlum',     slug: 'laitlum',     lat: 25.5553, lng: 91.9625 },
            { name: 'Cherrapunji', slug: 'cherrapunji', lat: 25.2714, lng: 91.7264 },
            { name: 'Mawsynram',   slug: 'mawsynram',   lat: 25.2960, lng: 91.5820 },
            { name: 'Dawki',       slug: 'dawki',       lat: 25.1800, lng: 92.0200 },
            { name: 'Mawlynnong',  slug: 'mawlynnong',  lat: 25.2044, lng: 91.9115 },
            { name: 'Jowai',       slug: 'jowai',       lat: 25.4500, lng: 92.2000 },
            { name: 'Umiam',       slug: 'umiam',       lat: 25.6000, lng: 91.9500 },
        ],
    },
    {
        name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', lat: 27.10, lng: 93.62,
        color: '#8b5cf6', initial: 'A', type: 'Adventure & Mountains',
        tagline: 'Himalayan valleys, monasteries & tribes',
        image: '/images/arunachal-pradesh/arunachal-pradesh-1.jpg',
        highlights: ['Tawang', 'Ziro', 'Mechuka'],
        cities: [
            { name: 'Tawang',          slug: 'tawang',     lat: 27.5859, lng: 91.8594 },
            { name: 'Ziro Valley',     slug: 'ziro-valley',lat: 27.5285, lng: 93.8258 },
            { name: 'Bomdila & Dirang',slug: 'bomdila',    lat: 27.2667, lng: 92.4167 },
            { name: 'Mechuka',         slug: 'mechuka',    lat: 28.6177, lng: 94.0422 },
            { name: 'Namdapha',        slug: 'namdapha',   lat: 27.5500, lng: 96.4167 },
            { name: 'Pakke & Eaglenest',slug:'pakke',      lat: 27.0000, lng: 92.9167 },
            { name: 'Sela Pass & Bumla',slug:'sela-pass',  lat: 27.5072, lng: 92.0000 },
        ],
    },
    {
        name: 'Nagaland', slug: 'nagaland', lat: 26.16, lng: 94.57,
        color: '#ef4444', initial: 'N', type: 'Tribal Culture',
        tagline: 'Naga tribes & the Hornbill Festival',
        image: '/images/nagaland/nagaland-1.jpg',
        highlights: ['Kohima', 'Dzükou Valley', 'Mon'],
        cities: [
            { name: 'Kohima',         slug: 'kohima',          lat: 25.6747, lng: 94.1086 },
            { name: 'Dimapur',        slug: 'dimapur',         lat: 25.9090, lng: 93.7266 },
            { name: 'Dzukou Valley',  slug: 'dzukou-valley',   lat: 25.5000, lng: 94.0667 },
            { name: 'Hornbill Festival',slug:'hornbill-festival',lat:25.6200,lng: 94.0700 },
            { name: 'Mon District',   slug: 'mon-district',    lat: 26.7300, lng: 95.0200 },
            { name: 'Phek & Tuensang',slug: 'phek-tuensang',   lat: 26.2700, lng: 94.8200 },
        ],
    },
    {
        name: 'Manipur', slug: 'manipur', lat: 24.66, lng: 93.91,
        color: '#06b6d4', initial: 'M', type: 'Culture & Lakes',
        tagline: 'Loktak Lake & classical performing arts',
        image: '/images/manipur/manipur-1.jpg',
        highlights: ['Imphal', 'Loktak', 'Ukhrul'],
        cities: [
            { name: 'Imphal',         slug: 'imphal',    lat: 24.8170, lng: 93.9368 },
            { name: 'Loktak Lake',    slug: 'loktak-lake',lat:24.5233, lng: 93.7780 },
            { name: 'Moirang & INA',  slug: 'moirang',   lat: 24.5000, lng: 93.7500 },
            { name: 'Ukhrul & Shirui',slug: 'ukhrul',    lat: 25.1185, lng: 94.3620 },
            { name: 'Tamenglong',     slug: 'tamenglong',lat: 25.0000, lng: 93.7000 },
            { name: 'Bishnupur & Andro',slug:'bishnupur',lat: 24.6276, lng: 93.7761 },
        ],
    },
    {
        name: 'Mizoram', slug: 'mizoram', lat: 23.16, lng: 92.94,
        color: '#f97316', initial: 'M', type: 'Hills & Serenity',
        tagline: 'Rolling bamboo hills & pristine lakes',
        image: '/images/mizoram/mizoram-1.jpg',
        highlights: ['Aizawl', 'Champhai', 'Tam Dil'],
        cities: [
            { name: 'Aizawl',             slug: 'aizawl',             lat: 23.1645, lng: 92.9376 },
            { name: 'Vantawng Falls',      slug: 'vantawng-falls',     lat: 22.9300, lng: 92.7900 },
            { name: 'Tam Dil Lake',        slug: 'tam-dil-lake',       lat: 23.5000, lng: 93.3000 },
            { name: 'Palak Dil',           slug: 'palak-dil',          lat: 22.5300, lng: 92.9100 },
            { name: 'Champhai Valley',     slug: 'champhai-valley',    lat: 23.4602, lng: 93.3290 },
            { name: 'Dampa Tiger Reserve', slug: 'dampa-tiger-reserve',lat: 23.5167, lng: 92.3000 },
        ],
    },
    {
        name: 'Sikkim', slug: 'sikkim', lat: 27.53, lng: 88.51,
        color: '#3b82f6', initial: 'S', type: 'Himalayan Adventure',
        tagline: 'Himalayan peaks & ancient monasteries',
        image: '/images/sikkim/sikkim-1.jpg',
        highlights: ['Gangtok', 'Pelling', 'Yumthang'],
        cities: [
            { name: 'Gangtok',          slug: 'gangtok',    lat: 27.3389, lng: 88.6065 },
            { name: 'Tsomgo & Nathula', slug: 'tsomgo-lake',lat: 27.3726, lng: 88.7640 },
            { name: 'Pelling & Ravangla',slug:'pelling',    lat: 27.2920, lng: 88.1177 },
            { name: 'North Sikkim',     slug: 'north-sikkim',lat:27.7300, lng: 88.5500 },
            { name: 'Silk Route & Zuluk',slug:'zuluk',      lat: 27.1896, lng: 88.8106 },
            { name: 'Namchi & South',   slug: 'namchi',     lat: 27.1672, lng: 88.3632 },
        ],
    },
    {
        name: 'Tripura', slug: 'tripura', lat: 23.94, lng: 91.99,
        color: '#ec4899', initial: 'T', type: 'Heritage & Culture',
        tagline: 'Palaces, temples & indigenous tribes',
        image: '/images/tripura/tripura-1.jpg',
        highlights: ['Agartala', 'Neermahal', 'Unakoti'],
        cities: [
            { name: 'Agartala',         slug: 'agartala',    lat: 23.8315, lng: 91.2868 },
            { name: 'Neermahal',        slug: 'neermahal',   lat: 23.5218, lng: 91.1026 },
            { name: 'Unakoti',          slug: 'unakoti',     lat: 24.3278, lng: 92.0914 },
            { name: 'Jampui Hills',     slug: 'jampui-hills',lat: 23.9500, lng: 92.2500 },
            { name: 'Sepahijala',       slug: 'sepahijala',  lat: 23.7167, lng: 91.4167 },
            { name: 'Pilak & Boxanagar',slug: 'pilak',       lat: 23.2500, lng: 91.6000 },
        ],
    },
];

const CENTER: [number, number] = [25.5, 92.0];
const DEFAULT_ZOOM = 6;
const DEFAULT_H    = 540;
const MIN_H        = 320;
const MAX_H        = 860;

// ── Leaflet inner helpers (inside MapContainer — guaranteed client-side) ──

function FlyController({ state }: { state: NEState | null }) {
    const map  = useMap();
    const prev = useRef<string | null>(null);
    useEffect(() => {
        if (state && state.slug !== prev.current) {
            map.flyTo([state.lat, state.lng], 8, { duration: 0.8 });
            prev.current = state.slug;
        } else if (!state && prev.current !== null) {
            map.flyTo(CENTER, DEFAULT_ZOOM, { duration: 0.8 });
            prev.current = null;
        }
    }, [state, map]);
    return null;
}

function SizeWatcher({ height }: { height: number }) {
    const map = useMap();
    useEffect(() => {
        const t = setTimeout(() => map.invalidateSize(), 60);
        return () => clearTimeout(t);
    }, [height, map]);
    return null;
}

// ── Pin factories ──

function makeStatePin(color: string, initial: string, active: boolean) {
    const W = active ? 42 : 34;
    const H = active ? 52 : 42;
    const dot = W * 0.55;
    return L.divIcon({
        className: '',
        html: `
          <div style="width:${W}px;height:${H}px;position:relative;
                      filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
            <svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg"
                 width="${W}" height="${H}" style="position:absolute;inset:0">
              <path d="M20 0C8.954 0 0 8.954 0 20c0 7.42 4.02 13.9 9.99 17.35L20 50l10.01-12.65C36.98 33.9 41 27.42 41 20 41 8.954 31.046 0 20 0z" fill="${color}"/>
            </svg>
            <div style="position:absolute;top:5px;left:50%;transform:translateX(-50%);
                        width:${dot}px;height:${dot}px;background:white;border-radius:50%;
                        display:flex;align-items:center;justify-content:center;
                        font-size:${dot * 0.48}px;font-weight:900;color:${color};line-height:1">
              ${initial}
            </div>
          </div>`,
        iconSize:     [W, H],
        iconAnchor:   [W / 2, H],
        tooltipAnchor:[0, -H],
    });
}

function makeCityPin(color: string) {
    return L.divIcon({
        className: '',
        html: `<div style="
            width:10px;height:10px;
            background:${color};
            border-radius:50%;
            border:2px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
        "></div>`,
        iconSize:     [10, 10],
        iconAnchor:   [5, 5],
        tooltipAnchor:[0, -8],
    });
}

// ── Main component ──

export default function NortheastMap() {
    const router   = useRouter();
    const [selected,  setSelected]  = useState<NEState | null>(null);
    const [mapHeight, setMapHeight] = useState(DEFAULT_H);

    // Drag-to-resize
    const dragging  = useRef(false);
    const dragStart = useRef({ y: 0, h: 0 });

    const onHandleMouseDown = (e: React.MouseEvent) => {
        dragging.current  = true;
        dragStart.current = { y: e.clientY, h: mapHeight };
        e.preventDefault();
    };

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            const delta = e.clientY - dragStart.current.y;
            setMapHeight(Math.max(MIN_H, Math.min(MAX_H, dragStart.current.h + delta)));
        };
        const onUp = () => { dragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup',   onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup',   onUp);
        };
    }, []);

    const handleSelect = useCallback(
        (s: NEState) => setSelected(prev => prev?.slug === s.slug ? null : s),
        []
    );

    return (
        /* isolation: isolate → new stacking context, prevents map layers from
           bleeding over the fixed navbar (which is z-50 / z-index:50) */
        <div className="isolate border border-gray-200 rounded-3xl overflow-hidden shadow-xl bg-white select-none">

            {/* ── Map + sidebar ── */}
            <div className="flex" style={{ height: mapHeight }}>

                {/* Leaflet map */}
                <div className="flex-1 relative min-w-0">
                    <MapContainer
                        center={CENTER}
                        zoom={DEFAULT_ZOOM}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                        zoomControl={true}
                        attributionControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                        />
                        <FlyController state={selected} />
                        <SizeWatcher   height={mapHeight} />

                        {/* State markers — always visible */}
                        {NE_STATES.map(s => (
                            <Marker
                                key={`state-${s.slug}`}
                                position={[s.lat, s.lng]}
                                icon={makeStatePin(s.color, s.initial, selected?.slug === s.slug)}
                                zIndexOffset={selected?.slug === s.slug ? 1000 : 0}
                                eventHandlers={{ click: () => handleSelect(s) }}
                            >
                                <Tooltip direction="top" offset={[0, -6]} opacity={1} className="ne-tt">
                                    {s.name}
                                </Tooltip>
                            </Marker>
                        ))}

                        {/* City markers — visible when a state is selected */}
                        {selected?.cities.map(city => (
                            <Marker
                                key={`city-${city.slug}`}
                                position={[city.lat, city.lng]}
                                icon={makeCityPin(selected.color)}
                                eventHandlers={{
                                    click: () => router.push(`/${selected.slug}/${city.slug}`),
                                }}
                            >
                                <Tooltip direction="top" offset={[0, -6]} opacity={1} className="ne-tt-city">
                                    {city.name}
                                </Tooltip>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* ── Discover Places sidebar ── */}
                <div className="w-60 flex flex-col border-l border-gray-100 bg-white flex-shrink-0">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Northeast India</p>
                        <h3 className="text-sm font-extrabold text-gray-900">Discover Places</h3>
                    </div>

                    <div className="overflow-y-auto flex-1 py-1">
                        {/* All-states reset */}
                        <button
                            onClick={() => setSelected(null)}
                            className={`group w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                !selected ? 'bg-gray-50' : 'hover:bg-gray-50/70'
                            }`}
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold ${!selected ? 'text-gray-900' : 'text-gray-500'}`}>All States</p>
                                <p className="text-[11px] text-gray-400">Overview</p>
                            </div>
                            <ChevronRight size={13} className={!selected ? 'text-gray-500' : 'text-gray-200'} />
                        </button>

                        <div className="h-px bg-gray-100 mx-4 my-1" />

                        {NE_STATES.map(s => {
                            const active = selected?.slug === s.slug;
                            return (
                                <div key={s.slug}>
                                    {/* State row */}
                                    <button
                                        onClick={() => handleSelect(s)}
                                        className={`group w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                            active ? 'bg-gray-50' : 'hover:bg-gray-50/70'
                                        }`}
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                                            style={{
                                                backgroundColor: s.color,
                                                boxShadow: active ? `0 0 0 3px ${s.color}30` : 'none',
                                            }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-semibold truncate leading-tight ${active ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {s.name}
                                            </p>
                                            <p className="text-[11px] text-gray-400 truncate">{s.type}</p>
                                        </div>
                                        <ChevronRight
                                            size={13}
                                            className={`flex-shrink-0 transition-all ${
                                                active ? 'text-gray-600 rotate-90' : 'text-gray-200 group-hover:text-gray-400'
                                            }`}
                                        />
                                    </button>

                                    {/* City sub-list — expands when state is active */}
                                    <AnimatePresence>
                                        {active && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                {s.cities.map(city => (
                                                    <Link
                                                        key={city.slug}
                                                        href={`/${s.slug}/${city.slug}`}
                                                        className="flex items-center gap-2.5 pl-10 pr-5 py-1.5 hover:bg-gray-50 transition-colors group"
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: s.color }}
                                                        />
                                                        <span className="text-xs text-gray-500 group-hover:text-gray-800 transition-colors truncate">
                                                            {city.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    <div className="px-5 py-3 border-t border-gray-100">
                        <p className="text-[10px] text-gray-300">© CARTO · OpenStreetMap</p>
                    </div>
                </div>
            </div>

            {/* ── Drag-to-resize handle ── */}
            <div
                onMouseDown={onHandleMouseDown}
                className="flex items-center justify-center h-5 bg-gray-50 border-t border-gray-200 cursor-row-resize hover:bg-gray-100 transition-colors group"
            >
                <GripHorizontal size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>

            {/* ── State detail strip ── */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        key={selected.slug}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-gray-100"
                    >
                        <div className="flex items-center gap-5 px-6 py-4">
                            <div className="w-1 h-14 rounded-full flex-shrink-0" style={{ backgroundColor: selected.color }} />
                            <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                <Image src={selected.image} alt={selected.name} fill className="object-cover" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                    <h4 className="font-extrabold text-gray-900 text-base">{selected.name}</h4>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selected.type}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2 leading-snug">{selected.tagline}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {selected.highlights.map(h => (
                                        <span key={h} className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full">
                                            <MapPin size={8} style={{ color: selected.color }} />
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Link
                                href={`/${selected.slug}`}
                                className="group flex items-center gap-2 bg-[#0f1e14] hover:bg-green-900 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors flex-shrink-0 whitespace-nowrap"
                            >
                                Explore {selected.name}
                                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <button
                                onClick={() => setSelected(null)}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
                            >✕</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Leaflet overrides */}
            <style jsx global>{`
                .ne-tt {
                    background: #111827 !important; color: #fff !important;
                    border: none !important; border-radius: 6px !important;
                    padding: 3px 9px !important; font-size: 11px !important;
                    font-weight: 700 !important;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important;
                    white-space: nowrap !important;
                }
                .ne-tt::before { border-top-color: #111827 !important; }
                .ne-tt-city {
                    background: #374151 !important; color: #f9fafb !important;
                    border: none !important; border-radius: 5px !important;
                    padding: 2px 7px !important; font-size: 10px !important;
                    font-weight: 600 !important;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
                    white-space: nowrap !important;
                }
                .ne-tt-city::before { border-top-color: #374151 !important; }
                .leaflet-container { font-family: inherit; }
                .leaflet-marker-icon { cursor: pointer !important; }
            `}</style>
        </div>
    );
}
