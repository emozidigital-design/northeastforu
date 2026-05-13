'use client';

import React, { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
    {
        category: 'Getting There',
        questions: [
            { q: 'How to reach North East India from Delhi?', a: 'The best way is to fly into Guwahati (Assam) or Bagdogra (West Bengal). These cities are well-connected to Delhi, Mumbai, and Kolkata.' },
            { q: 'Which is the nearest airport to Meghalaya?', a: 'Shillong has its own airport (Umroi), but Guwahati airport is more popular due to better connectivity and is only 3 hours away.' },
            { q: 'Is there a train to Sikkim?', a: 'Currently, the nearest major station is NJP (New Jalpaiguri) in Siliguri. A new toy train and direct line to Rangpo are under construction.' }
        ]
    },
    {
        category: 'Permits and Visa',
        questions: [
            { q: 'Do I need a permit to visit Arunachal Pradesh?', a: 'Yes, Indian citizens need an Inner Line Permit (ILP), and foreigners need a Protected Area Permit (PAP).' },
            { q: 'How do I apply for ILP online?', a: 'You can apply at the official government portals like arunachalilp.com or visit local liaison offices.' }
        ]
    },
    {
        category: 'Safety',
        questions: [
            { q: 'Is North East India safe for solo female travellers?', a: 'Absolutely. North East India is known for being extremely safe and respectful towards women. It has some of the safest cities in India.' }
        ]
    }
];

export default function FAQ() {
    const [search, setSearch] = useState('');
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => setOpenIndex(openIndex === id ? null : id);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <section className="bg-white border-b border-gray-100 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">North East India <span className="text-green-600">Travel FAQ</span></h1>
                        <p className="text-xl text-gray-500 mb-10">We've answered 100+ of the most common questions about the region.</p>

                        <div className="relative max-w-2xl mx-auto group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Search your question..."
                                className="w-full p-6 pl-16 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-4 focus:ring-green-100 focus:outline-none transition-all text-xl"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
                {faqData.map((cat, catIdx) => (
                    <ScrollReveal delay={catIdx * 100} key={cat.category}>
                        <div className="space-y-4">
                            <h2 className="text-xl font-black text-gray-400 uppercase tracking-widest pl-4">{cat.category}</h2>
                            <div className="space-y-4">
                                {cat.questions.map((item, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`;
                                    const isOpen = openIndex === id;
                                    return (
                                        <div key={id} className={`bg-white rounded-2xl border transition-all ${isOpen ? 'border-green-500 shadow-xl' : 'border-gray-200 shadow-sm'}`}>
                                            <button
                                                onClick={() => toggle(id)}
                                                className="w-full flex items-center justify-between p-6 text-left"
                                            >
                                                <span className="font-bold text-gray-900 text-lg pr-8">{item.q}</span>
                                                {isOpen ? <ChevronUp className="text-green-600 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                                            </button>
                                            {isOpen && (
                                                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                                                    <p className="text-gray-600 leading-relaxed py-4 border-t border-gray-50">{item.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            <ScrollReveal>
                <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
                    <div className="bg-green-600 p-12 rounded-[3rem] text-white">
                        <HelpCircle size={48} className="mx-auto mb-6 opacity-50" />
                        <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
                        <p className="text-green-50 opacity-90 mb-8">Our local experts are just a click away to answer anything else.</p>
                        <button className="bg-white text-green-600 px-10 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all hover-scale">
                            Send a Message
                        </button>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
