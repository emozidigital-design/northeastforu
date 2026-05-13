'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const permitsData: any = {
    indian: {
        'Arunachal Pradesh': 'ILP required. Apply online at arunachalilp.com. Processing: 2 days.',
        'Nagaland': 'ILP required. Apply online at nagalandilp.gov.in. Processing: 1 day.',
        'Sikkim': 'No permit for main cities. PAP needed for North/East Sikkim via travel agent.',
        'Mizoram': 'ILP required. Apply online or at Lengpui Airport/Liaison offices.',
        'Manipur': 'ILP required since 2020. Apply online or at entry points.',
        'Assam': 'No permit required for Indian citizens.',
        'Meghalaya': 'No permit required for Indian citizens.',
        'Tripura': 'No permit required for Indian citizens.'
    },
    foreign: {
        'Arunachal Pradesh': 'PAP required. Min 2 people. Apply via registered travel agent.',
        'Sikkim': 'RAP required. Free. Available at Rangpo/Melli checkposts. PAP needed for North.',
        'Nagaland': 'No PAP required since 2011 (except for certain nationalities). Register at local PS.',
        'Manipur': 'No PAP required. Must register at local Police Station within 24 hours.',
        'Mizoram': 'No PAP required. Must register at local Police Station within 24 hours.',
        'Assam': 'No permit required.',
        'Meghalaya': 'No permit required.',
        'Tripura': 'No permit required.'
    }
};

export default function PlanYourTrip() {
    const [nationality, setNationality] = useState('indian');
    const [targetState, setTargetState] = useState('Arunachal Pradesh');


    return (
        <div className="bg-white min-h-screen pb-20">
            <section className="bg-green-600 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Plan Your North East India Trip</h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">Everything you need to plan the perfect journey across the Eight Sisters.</p>
                    </ScrollReveal>
                </div>
            </section>



            {/* Best Time Matrix Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <ScrollReveal>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-green-600 pl-4">Weather & Highlights Matrix</h2>
                    <div className="overflow-x-auto shadow-2xl rounded-3xl border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-6 font-bold text-gray-400">STATE</th>
                                    {['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'].map(m => (
                                        <th key={m} className="p-6 font-bold text-gray-400 text-center">{m}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {['Assam', 'Meghalaya', 'Sikkim', 'Arunachal'].map(state => (
                                    <tr key={state} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-6 font-bold text-gray-900 bg-white">{state}</td>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
                                            <td key={idx} className="p-2 text-center">
                                                <div className={`w-8 h-8 rounded-full mx-auto ${idx < 6 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex gap-8 justify-center">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> <span className="text-sm text-gray-600">Peak Season</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> <span className="text-sm text-gray-600">Good Time</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div> <span className="text-sm text-gray-600">Monsoon / Avoid</span></div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
