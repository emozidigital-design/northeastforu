'use client';

import { Check, Info } from 'lucide-react';

interface PricingTier {
    name: string;
    description: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

interface PricingTableProps {
    tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
    if (!tiers || tiers.length === 0) return null;

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Choose Your Stay Style</h2>
                <div className="group relative">
                    <Info size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Prices vary based on property selection and seasonality.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier, idx) => (
                    <div 
                        key={idx}
                        className={`relative flex flex-col p-8 rounded-[2rem] border-2 transition-all duration-300 ${
                            tier.isPopular 
                            ? 'border-green-600 bg-green-50/30 shadow-xl scale-[1.02]' 
                            : 'border-gray-100 bg-white hover:border-gray-300'
                        }`}
                    >
                        {tier.isPopular && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                                Recommended
                            </span>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{tier.description}</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-gray-900">₹{tier.price.toLocaleString('en-IN')}</span>
                                <span className="text-gray-500 text-sm">/ pax</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 rounded-full p-0.5 flex-shrink-0">
                                        <Check size={12} className="text-green-600" />
                                    </div>
                                    <span className="text-sm text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-3.5 rounded-2xl font-bold transition-all ${
                            tier.isPopular
                            ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-100'
                            : 'bg-gray-900 text-white hover:bg-black'
                        }`}>
                            Select {tier.name}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
