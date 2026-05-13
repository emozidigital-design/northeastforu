'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const permitsData: Record<string, Record<string, { required: boolean; permit: string; details: string; apply?: string }>> = {
    indian: {
        'Arunachal Pradesh': { required: true, permit: 'Inner Line Permit (ILP)', details: 'Fee: ₹100. Processing: 2-3 days.', apply: 'https://arunachalilp.com' },
        'Nagaland': { required: true, permit: 'Inner Line Permit (ILP)', details: 'Fee: ₹50. Processing: 1 day.', apply: 'https://nagalandilp.gov.in' },
        'Mizoram': { required: true, permit: 'Inner Line Permit (ILP)', details: 'Fee: ₹100. Apply at Lengpui Airport or online.', apply: 'https://mizoramilp.nic.in' },
        'Manipur': { required: true, permit: 'Inner Line Permit (ILP)', details: 'ILP required since 2020. Apply online or at entry points. Fee: ₹100.', apply: 'https://manipuronline.gov.in' },
        'Assam': { required: false, permit: 'None', details: 'No permit required for Indian citizens.' },
        'Meghalaya': { required: false, permit: 'None', details: 'No permit required for Indian citizens.' },
        'Tripura': { required: false, permit: 'None', details: 'No permit required for Indian citizens.' },
        'Sikkim': { required: false, permit: 'Partial — PAP for restricted zones', details: 'No permit for Gangtok, Pelling, Namchi. PAP required for North/East Sikkim (via travel agent).' },
    },
    foreign: {
        'Arunachal Pradesh': { required: true, permit: 'Protected Area Permit (PAP)', details: 'Minimum 2 people. Apply via registered travel agent. Fee: USD 50 approx.' },
        'Sikkim': { required: true, permit: 'Restricted Area Permit (RAP)', details: 'Free. Available at Rangpo & Melli checkposts. PAP required for North Sikkim.' },
        'Nagaland': { required: false, permit: 'None since 2011', details: 'No PAP required. Must register at local Police Station within 24 hours.' },
        'Manipur': { required: false, permit: 'None', details: 'No PAP required. Must register at local Police Station within 24 hours of arrival.' },
        'Mizoram': { required: false, permit: 'None', details: 'No PAP required. Must register at local Police Station within 24 hours.' },
        'Assam': { required: false, permit: 'None', details: 'No permit required.' },
        'Meghalaya': { required: false, permit: 'None', details: 'No permit required.' },
        'Tripura': { required: false, permit: 'None', details: 'No permit required.' },
    },
};

export default function PermitCheckerPage() {
    const [nationality, setNationality] = useState<'indian' | 'foreign'>('indian');
    const [selectedState, setSelectedState] = useState('Arunachal Pradesh');

    const result = permitsData[nationality][selectedState];

    return (
        <div>
            <div className="bg-gradient-to-br from-red-700 to-red-500 py-20 text-white text-center">
                <ScrollReveal>
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-bold mb-6">
                        <Shield size={16} /> Permit Checker Tool
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Do I Need a Permit?</h1>
                    <p className="text-red-100 max-w-xl mx-auto text-lg">Instantly check permit requirements for any North East India state.</p>
                </ScrollReveal>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
                <ScrollReveal>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Your Nationality</label>
                            <div className="flex gap-4">
                                {['indian', 'foreign'].map(n => (
                                    <button key={n} onClick={() => { setNationality(n as any); setSelectedState(Object.keys(permitsData[n as any])[0]); }}
                                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border-2 ${nationality === n ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>
                                        {n === 'indian' ? '🇮🇳 Indian Citizen' : '🌍 Foreign National'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Destination State</label>
                            <select value={selectedState} onChange={e => setSelectedState(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 outline-none bg-white text-gray-800 text-base">
                                {Object.keys(permitsData[nationality]).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </ScrollReveal>

                {result && (
                    <ScrollReveal>
                        <div className={`rounded-3xl border-2 p-8 ${result.required ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl ${result.required ? 'bg-red-100' : 'bg-green-100'}`}>
                                    {result.required ? <AlertTriangle size={28} className="text-red-600" /> : <CheckCircle size={28} className="text-green-600" />}
                                </div>
                                <div className="flex-1">
                                    <h2 className={`text-xl font-extrabold mb-2 ${result.required ? 'text-red-800' : 'text-green-800'}`}>
                                        {result.required ? 'Permit Required' : 'No Permit Needed'}
                                    </h2>
                                    <p className={`font-bold mb-1 ${result.required ? 'text-red-700' : 'text-green-700'}`}>{result.permit}</p>
                                    <p className="text-gray-700 mt-2 leading-relaxed">{result.details}</p>
                                    {result.apply && (
                                        <a href={result.apply} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-4 bg-red-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-red-700 transition-all">
                                            Apply Online <Shield size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 bg-white/60 rounded-xl p-4">
                                <Info size={14} className="flex-shrink-0 mt-0.5" />
                                <span>Permit rules can change. Always verify with official State Government websites before travelling.</span>
                            </div>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
}
