import React from 'react';
import FadeUp from '@/components/ui/FadeUp';
import { Check, Minus } from 'lucide-react';

interface ActivityInclusionsProps {
    inclusions: string[];
    exclusions: string[];
    whatToBring: string[];
}

export default function ActivityInclusions({ inclusions, exclusions, whatToBring }: ActivityInclusionsProps) {
    if (!inclusions?.length && !exclusions?.length && !whatToBring?.length) return null;

    // Helper map to assign relevant emojis to what-to-bring items quickly
    const getEmoji = (item: string) => {
        const text = item.toLowerCase();
        if (text.includes('shoe') || text.includes('boot')) return '👟';
        if (text.includes('sunscreen') || text.includes('lotion')) return '🧴';
        if (text.includes('water') || text.includes('bottle')) return '💧';
        if (text.includes('camera') || text.includes('photo')) return '📷';
        if (text.includes('jacket') || text.includes('warm')) return '🧥';
        if (text.includes('hat') || text.includes('cap')) return '🧢';
        if (text.includes('glass') || text.includes('shade')) return '🕶️';
        if (text.includes('id') || text.includes('passport') || text.includes('document')) return '🪪';
        if (text.includes('money') || text.includes('cash')) return '💵';
        if (text.includes('bag') || text.includes('pack')) return '🎒';
        return '📌'; // fallback
    };

    return (
        <section className="scroll-mt-32" id="inclusions">
            <FadeUp>
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    
                    {/* INCLUDED */}
                    {inclusions && inclusions.length > 0 && (
                        <div className="flex-1">
                            <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">INCLUDED</span>
                            <h2 className="font-serif text-[28px] text-[#0f1e14] font-bold mb-6">What's in Your Experience</h2>
                            
                            <ul className="space-y-4">
                                {inclusions.map((item, idx) => (
                                    <li key={idx} className={`flex items-start gap-4 ${idx !== inclusions.length - 1 ? 'pb-4 border-b border-[#f0f0f0]' : ''}`}>
                                        <div className="w-[18px] h-[18px] rounded-full bg-[#1a6b3c] flex items-center justify-center flex-shrink-0 mt-[6px]">
                                            <Check size={12} color="white" strokeWidth={3} />
                                        </div>
                                        <span className="text-[15px] text-[#333] leading-[2.0] font-sans">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* EXCLUDED */}
                    {exclusions && exclusions.length > 0 && (
                        <div className="flex-1">
                            <span className="text-[11px] font-mono tracking-[0.15em] text-[#888] uppercase block mb-3">EXCLUDED</span>
                            <h2 className="font-serif text-[28px] text-[#0f1e14] font-bold mb-6">Not Part of This Activity</h2>
                            
                            <ul className="space-y-4">
                                {exclusions.map((item, idx) => (
                                    <li key={idx} className={`flex items-start gap-4 ${idx !== exclusions.length - 1 ? 'pb-4 border-b border-[#f0f0f0]' : ''}`}>
                                        <div className="w-[18px] h-[18px] rounded-full bg-[#f5f5f5] flex items-center justify-center flex-shrink-0 mt-[6px]">
                                            <Minus size={12} color="#888" strokeWidth={3} />
                                        </div>
                                        <span className="text-[15px] text-[#888] leading-[2.0] font-sans">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </FadeUp>

            {/* WHAT TO BRING */}
            {whatToBring && whatToBring.length > 0 && (
                <FadeUp delay={0.2} className="mt-12">
                    <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-4">PACK THESE</span>
                    <div className="flex flex-wrap gap-3">
                        {whatToBring.map((item, idx) => (
                            <div key={idx} className="bg-white border border-[#dddddd] rounded-full px-[14px] py-[6px] text-[13px] text-[#444] flex items-center gap-2">
                                <span>{getEmoji(item)}</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </FadeUp>
            )}
        </section>
    );
}
