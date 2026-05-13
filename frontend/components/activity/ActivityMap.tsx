'use client';

import React, { useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

interface ActivityMapProps {
    lat: number;
    lng: number;
    address: string;
    activityName: string;
}

export default function ActivityMap({ lat, lng, address, activityName }: ActivityMapProps) {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    return (
        <div className="space-y-4">
            <div className="h-[300px] md:h-[320px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <MapContainer
                    center={[lat, lng]}
                    zoom={14}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                        <Popup>{activityName}</Popup>
                    </Marker>
                </MapContainer>
            </div>

            {address && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{address}</span>
                </div>
            )}

            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1a6b3c] hover:text-green-700 transition-colors">
                <ExternalLink size={14} />
                Get Directions on Google Maps
            </a>
        </div>
    );
}
