'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { MapPin, Calendar, Users, DollarSign, Compass, CheckCircle } from 'lucide-react';

const permitsData: Record<string, Record<string, string>> = {
    indian: {
        'Arunachal Pradesh': '🔴 ILP Required — Apply online at arunachalilp.com. Processing: 2-3 days.',
        'Nagaland': '🔴 ILP Required — Apply online at nagalandilp.gov.in. Processing: 1 day.',
        'Mizoram': '🔴 ILP Required — Apply at Lengpui Airport or online.',
        'Manipur': '🔴 ILP Required since 2020 — Apply online or at entry points.',
        'Assam': '🟢 No permit required for Indian citizens.',
        'Meghalaya': '🟢 No permit required for Indian citizens.',
        'Tripura': '🟢 No permit required for Indian citizens.',
        'Sikkim': '🟡 No permit required for main cities. PAP needed for North/East Sikkim via travel agent.',
    },
    foreign: {
        'Arunachal Pradesh': '🔴 PAP Required — Min 2 people. Apply via registered travel agent. Fee: $50.',
        'Sikkim': '🟡 RAP Required — Free. Available at Rangpo/Melli checkposts. PAP for North Sikkim.',
        'Nagaland': '🟢 No PAP required since 2011. Register at local Police Station.',
        'Manipur': '🟢 No PAP required. Must register at local PS within 24 hours.',
        'Mizoram': '🟢 No PAP required. Must register at local PS within 24 hours.',
        'Assam': '🟢 No permit required.',
        'Meghalaya': '🟢 No permit required.',
        'Tripura': '🟢 No permit required.',
    },
};

export default function PlanMyTripPage() {
    const [nationality, setNationality] = useState<'indian' | 'foreign'>('indian');
    const [targetState, setTargetState] = useState('Assam');
    const [days, setDays] = useState(7);
    const [travellers, setTravellers] = useState(2);

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="bg-gradient-to-br from-green-700 to-green-500 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-bold mb-6">
                            <Compass size={16} /> AI-Powered Planning Tools
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Plan My Trip</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            Permit checker, budget calculator, and trip planning tools — all in one place.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
                {/* Permit Checker */}
                <ScrollReveal>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-green-600 px-8 py-6 text-white">
                            <h2 className="text-2xl font-extrabold flex items-center gap-3">
                                <CheckCircle size={24} /> Permit Checker
                            </h2>
                            <p className="text-green-100 mt-1 text-sm">Find out which permits you need for your destination.</p>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Your Nationality</label>
                                    <select value={nationality} onChange={e => setNationality(e.target.value as any)}
                                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-white text-gray-800">
                                        <option value="indian">Indian Citizen</option>
                                        <option value="foreign">Foreign National</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Destination State</label>
                                    <select value={targetState} onChange={e => setTargetState(e.target.value)}
                                        className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none bg-white text-gray-800">
                                        {Object.keys(permitsData[nationality]).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-gray-50 border-2 border-dashed border-green-400 rounded-2xl p-6 w-full">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Permit Requirement</p>
                                    <p className="text-gray-800 font-medium leading-relaxed text-base">
                                        {permitsData[nationality][targetState]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>


            </div>
        </div>
    );
}
