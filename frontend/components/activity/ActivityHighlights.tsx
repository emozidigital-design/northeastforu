import React from 'react';
import FadeUp from '@/components/ui/FadeUp';
import { Sparkles, MapPin, Compass, Navigation, Camera, Sun, Moon, Star } from 'lucide-react';

interface ActivityHighlightsProps {
    highlights: any[];
}

export default function ActivityHighlights({ highlights }: ActivityHighlightsProps) {
    if (!highlights || highlights.length === 0) return null;

    // We cycle through 4 soft background colors for the icon squares
    const colorThemes = [
        { bg: 'bg-[#f0f7f2]', css: '#1a6b3c' }, // light green
        { bg: 'bg-[#fff8ee]', css: '#f5a623' }, // light amber
        { bg: 'bg-[#f0f4ff]', css: '#4a90d9' }, // light blue
        { bg: 'bg-[#fdf0f0]', css: '#e05252' }, // light red
    ];

    // Pick a semi-random icon based on the title to give it some variety
    const getIcon = (title: string, color: string) => {
        const text = title.toLowerCase();
        let Icon = Sparkles;
        if (text.includes('view') || text.includes('see') || text.includes('look')) Icon = Camera;
        if (text.includes('walk') || text.includes('hike') || text.includes('trek')) Icon = Compass;
        if (text.includes('visit') || text.includes('place') || text.includes('location')) Icon = MapPin;
        if (text.includes('explore') || text.includes('discover')) Icon = Navigation;
        if (text.includes('day') || text.includes('morning')) Icon = Sun;
        if (text.includes('night') || text.includes('evening')) Icon = Moon;
        if (text.includes('best') || text.includes('top')) Icon = Star;
        
        return <Icon size={22} color={color} />;
    };

    return (
        <section className="scroll-mt-32" id="highlights">
            <FadeUp>
                <div className="mb-8">
                    <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">WHAT TO EXPECT</span>
                    <h2 className="font-serif text-[32px] text-[#0f1e14] font-bold">Highlights</h2>
                    <div className="w-[40px] h-[2px] bg-[#1a6b3c] mt-4" />
                </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {highlights.map((highlight, idx) => {
                    const theme = colorThemes[idx % colorThemes.length];
                    return (
                        <FadeUp key={idx} delay={idx * 0.1}>
                            <div className="bg-white border border-[#eeeeee] p-7 rounded-[8px] h-full transition-colors duration-200 hover:border-[#1a6b3c] group">
                                <div className={`w-[44px] h-[44px] rounded-[8px] flex items-center justify-center mb-4 ${theme.bg}`}>
                                    {getIcon(highlight.title, theme.css)}
                                </div>
                                <h3 className="font-bold text-[16px] text-[#0f1e14] font-sans mb-2 leading-snug">
                                    {highlight.title}
                                </h3>
                                <p className="text-[14px] text-[#666] leading-[1.7] font-sans">
                                    {highlight.description}
                                </p>
                            </div>
                        </FadeUp>
                    );
                })}
            </div>
        </section>
    );
}
