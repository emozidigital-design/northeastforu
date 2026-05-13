import React from 'react';
import FadeUp from '@/components/ui/FadeUp';

interface ActivityTimelineProps {
    itinerary?: any[];
}

export default function ActivityTimeline({ itinerary }: ActivityTimelineProps) {
    if (!itinerary || itinerary.length === 0) return null;

    return (
        <section className="scroll-mt-32" id="itinerary">
            <FadeUp>
                <div className="mb-12 text-center md:text-left">
                    <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">HOW IT UNFOLDS</span>
                    <h2 className="font-serif text-[32px] text-[#0f1e14] font-bold">Your Day at a Glance</h2>
                    <div className="w-[40px] h-[2px] bg-[#1a6b3c] mt-4 mx-auto md:mx-0" />
                </div>
            </FadeUp>

            <div className="relative max-w-3xl mx-auto md:mx-0">
                {/* Center vertical line (desktop) / Left vertical line (mobile) */}
                <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] bg-[#e0e0e0] md:-translate-x-1/2" />

                <div className="space-y-8">
                    {itinerary.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        
                        return (
                            <FadeUp key={idx} delay={idx * 0.15}>
                                <div className={`relative flex items-center md:justify-between w-full
                                    ${isEven ? 'md:flex-row-reverse' : ''}
                                `}>
                                    {/* Spacer for desktop layout */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* Center Dot */}
                                    <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 flex items-center justify-center
                                        w-[24px] h-[24px] rounded-full bg-white border-2 border-[#1a6b3c] z-10"
                                    >
                                        <div className="w-[6px] h-[6px] rounded-full bg-[#1a6b3c]" />
                                    </div>

                                    {/* Timeline Card */}
                                    <div className={`w-full md:w-[calc(50%-40px)] pl-[60px] md:pl-0 
                                        ${isEven ? 'md:pr-0 md:text-left' : 'md:text-right'}
                                    `}>
                                        <div className={`bg-white border border-[#eeeeee] rounded-[8px] p-[20px] md:p-[24px]
                                            hover:border-[#1a6b3c]/30 transition-colors duration-300
                                            ${isEven ? 'md:mr-auto' : 'md:ml-auto'} max-w-[320px]
                                        `}>
                                            <div className="text-[12px] font-mono tracking-[0.05em] text-[#1a6b3c] uppercase mb-1">
                                                {step.time || `Stop ${idx + 1}`}
                                            </div>
                                            <h3 className="font-bold text-[15px] text-[#0f1e14] font-sans mb-2">
                                                {step.title}
                                            </h3>
                                            {step.description && (
                                                <p className="text-[14px] text-[#666] leading-[1.6] font-sans">
                                                    {step.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
