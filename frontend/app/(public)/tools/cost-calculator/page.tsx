'use client';

import React, { useState, useMemo } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Calculator, Calendar, Users, MapPin, Plane, Hotel, UtensilsCrossed, Car, ChevronDown } from 'lucide-react';

const DAILY_RATES = {
    budget: { label: 'Budget', stay: 800, food: 400, local: 300, activities: 200 },
    mid: { label: 'Mid-Range', stay: 2500, food: 800, local: 600, activities: 500 },
    luxury: { label: 'Luxury', stay: 7000, food: 2000, local: 1500, activities: 1500 },
};

const FLIGHT_COSTS: Record<string, { city: string; price: number }> = {
    guwahati: { city: 'Guwahati (Assam hub)', price: 6000 },
    shillong: { city: 'Shillong via Guwahati', price: 7000 },
    imphal: { city: 'Imphal (Manipur)', price: 7500 },
    agartala: { city: 'Agartala (Tripura)', price: 7000 },
    bagdogra: { city: 'Bagdogra (Sikkim gateway)', price: 7000 },
    dibrugarh: { city: 'Dibrugarh (Assam)', price: 8000 },
};

export default function CostCalculatorPage() {
    const [days, setDays] = useState(7);
    const [travellers, setTravellers] = useState(2);
    const [style, setStyle] = useState<keyof typeof DAILY_RATES>('mid');
    const [destination, setDestination] = useState('guwahati');
    const [includeFlights, setIncludeFlights] = useState(true);

    const rates = DAILY_RATES[style];
    const flight = FLIGHT_COSTS[destination];

    const breakdown = useMemo(() => {
        const perPersonPerDay = rates.stay + rates.food + rates.local + rates.activities;
        const totalPerPerson = (perPersonPerDay * days) + (includeFlights ? flight.price * 2 : 0);
        const groupTotal = totalPerPerson * travellers;
        return {
            perDay: perPersonPerDay,
            stay: rates.stay * days,
            food: rates.food * days,
            local: rates.local * days,
            activities: rates.activities * days,
            flights: includeFlights ? flight.price * 2 : 0,
            perPerson: totalPerPerson,
            group: groupTotal,
        };
    }, [days, travellers, style, destination, includeFlights, rates, flight]);

    return (
        <div>
            <div className="bg-gradient-to-br from-blue-800 to-blue-500 py-20 text-white text-center">
                <ScrollReveal>
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-bold mb-6">
                        <Calculator size={16} /> Cost Calculator Tool
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Trip Cost Calculator</h1>
                    <p className="text-blue-100 max-w-xl mx-auto text-lg">Get a realistic budget estimate for your North East India trip.</p>
                </ScrollReveal>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <ScrollReveal>
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
                            <h2 className="text-xl font-extrabold text-gray-900">Trip Details</h2>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        <Calendar size={12} className="inline mr-1" /> Days
                                    </label>
                                    <input type="number" min={1} max={30} value={days}
                                        onChange={e => setDays(Math.max(1, Number(e.target.value)))}
                                        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        <Users size={12} className="inline mr-1" /> Travellers
                                    </label>
                                    <input type="number" min={1} max={20} value={travellers}
                                        onChange={e => setTravellers(Math.max(1, Number(e.target.value)))}
                                        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Travel Style</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {(Object.keys(DAILY_RATES) as Array<keyof typeof DAILY_RATES>).map(s => (
                                        <button key={s} onClick={() => setStyle(s)}
                                            className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${style === s ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}>
                                            {DAILY_RATES[s].label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    <MapPin size={12} className="inline mr-1" /> Destination Hub
                                </label>
                                <select value={destination} onChange={e => setDestination(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none bg-white">
                                    {Object.entries(FLIGHT_COSTS).map(([k, v]) => <option key={k} value={k}>{v.city}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => setIncludeFlights(!includeFlights)}
                                    className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 ${includeFlights ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${includeFlights ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                                <span className="text-sm font-medium text-gray-700">
                                    <Plane size={14} className="inline mr-1" /> Include return flights from metro (~₹{(flight.price * 2).toLocaleString('en-IN')})
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Output */}
                    <ScrollReveal>
                        <div className="space-y-5">
                            <div className="bg-blue-600 rounded-3xl p-8 text-white text-center">
                                <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-2">Total for {travellers} {travellers === 1 ? 'Person' : 'People'}</p>
                                <p className="text-5xl font-black mb-1">₹{breakdown.group.toLocaleString('en-IN')}</p>
                                <p className="text-blue-200 text-sm">(₹{breakdown.perPerson.toLocaleString('en-IN')} per person)</p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-4">
                                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-widest">Cost Breakdown (per person)</h3>
                                {[
                                    { icon: Hotel, label: 'Accommodation', val: breakdown.stay },
                                    { icon: UtensilsCrossed, label: 'Food & Dining', val: breakdown.food },
                                    { icon: Car, label: 'Local Transport', val: breakdown.local },
                                    { icon: MapPin, label: 'Activities & Sightseeing', val: breakdown.activities },
                                    ...(includeFlights ? [{ icon: Plane, label: 'Return Flights (est.)', val: breakdown.flights }] : []),
                                ].map(({ icon: Icon, label, val }) => (
                                    <div key={label} className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-sm text-gray-600">
                                            <Icon size={14} className="text-blue-400" /> {label}
                                        </span>
                                        <span className="font-bold text-gray-900">₹{val.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-100 pt-4 flex justify-between">
                                    <span className="font-extrabold text-gray-900">Total per person</span>
                                    <span className="font-extrabold text-blue-600 text-lg">₹{breakdown.perPerson.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 text-center px-4">
                                *Estimates only. Prices vary by season and availability. Permits, visa fees, and tips not included.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
}
