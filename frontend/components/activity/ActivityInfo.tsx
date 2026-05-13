import React from 'react';
import FadeUp from '@/components/ui/FadeUp';
import { HelpCircle, Clock, Umbrella, CheckSquare, UserCheck, RefreshCcw, MessageSquare } from 'lucide-react';

interface ActivityInfoProps {
    infoItems: string[];
}

export default function ActivityInfo({ infoItems }: ActivityInfoProps) {
    if (!infoItems || infoItems.length === 0) return null;

    // We cycle through 3 colors for the left border accent
    const accents = [
        'border-l-[#1a6b3c]', // green
        'border-l-[#f5a623]', // amber
        'border-l-[#4a90d9]', // blue
    ];

    // Helper map to pick an icon based on content
    const getIcon = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('time') || lower.includes('arrive') || lower.includes('hour')) return Clock;
        if (lower.includes('weather') || lower.includes('rain')) return Umbrella;
        if (lower.includes('book') || lower.includes('confirm') || lower.includes('voucher')) return CheckSquare;
        if (lower.includes('age') || lower.includes('child') || lower.includes('adult')) return UserCheck;
        if (lower.includes('cancel') || lower.includes('refund')) return RefreshCcw;
        if (lower.includes('language') || lower.includes('english') || lower.includes('hindi')) return MessageSquare;
        return HelpCircle; // fallback
    };

    // Attempt to split each info item into a Title (first line/sentence) and Body.
    // In our DB it might just be a flat string "Age: Suitable for 10+". We try to extract a title if possible.
    const formatItem = (item: string) => {
        // Look for a colon or a period as a separator
        let title = '';
        let body = item;
        
        const colonSplit = item.split(':');
        if (colonSplit.length > 1 && colonSplit[0].length < 30) {
            title = colonSplit[0].trim();
            body = colonSplit.slice(1).join(':').trim();
        } else {
            const periodSplit = item.split('.');
            if (periodSplit.length > 1 && periodSplit[0].length < 40) {
                title = periodSplit[0].trim();
                body = periodSplit.slice(1).join('.').trim() + (item.endsWith('.') ? '.' : '');
            } else {
                title = 'Good to Know'; // default
            }
        }
        
        return { title, body };
    };

    return (
        <section className="scroll-mt-32" id="info">
            <FadeUp>
                <div className="mb-8">
                    <span className="text-[11px] font-mono tracking-[0.15em] text-[#1a6b3c] uppercase block mb-3">GOOD TO KNOW</span>
                    <h2 className="font-serif text-[32px] text-[#0f1e14] font-bold">Before You Go</h2>
                    <div className="w-[40px] h-[2px] bg-[#1a6b3c] mt-4" />
                </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {infoItems.map((item, idx) => {
                    const accent = accents[idx % accents.length];
                    const { title, body } = formatItem(item);
                    const Icon = getIcon(item);

                    return (
                        <FadeUp key={idx} delay={idx * 0.1}>
                            <div className={`bg-[#fafaf8] rounded-[8px] p-6 h-full border-l-[3px] ${accent}`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <Icon size={24} className="text-[#0f1e14]" strokeWidth={1.5} />
                                    <h3 className="font-bold text-[15px] text-[#0f1e14] font-sans">
                                        {title}
                                    </h3>
                                </div>
                                <p className="text-[14px] text-[#666] leading-[1.7] font-sans">
                                    {body}
                                </p>
                            </div>
                        </FadeUp>
                    );
                })}
            </div>
        </section>
    );
}
