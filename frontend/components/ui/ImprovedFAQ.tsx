'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    schema_eligible?: boolean;
}

interface ImprovedFAQProps {
    pageType: string;
    pageSlug: string;
    title?: string;
}

const ImprovedFAQ: React.FC<ImprovedFAQProps> = ({ pageType, pageSlug, title = 'Frequently Asked Questions' }) => {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [open, setOpen] = useState<number | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/faq/${pageType}/${pageSlug}`)
            .then(r => r.json())
            .then(d => { if (d.success) setFaqs(d.data); })
            .catch(() => { });
    }, [pageType, pageSlug]);

    const filtered = faqs.filter(f =>
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase())
    );

    if (!faqs.length) return null;

    // Build FAQPage JSON-LD
    const schemaItems = faqs.filter(f => f.schema_eligible).map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    }));

    return (
        <section className="mt-16">
            {schemaItems.length > 0 && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: schemaItems,
                    })
                }} />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <HelpCircle className="text-blue-400" size={24} />
                    {title}
                </h2>
                <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-3">
                {filtered.map((faq, idx) => (
                    <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
                        className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors">
                        <button
                            onClick={() => setOpen(open === faq.id ? null : faq.id)}
                            className="w-full flex justify-between items-center px-6 py-5 text-left gap-4">
                            <span className="text-white text-sm font-medium leading-snug">{faq.question}</span>
                            <div className="text-gray-400 flex-shrink-0">
                                {open === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {open === faq.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                                    className="overflow-hidden">
                                    <div className="px-6 pb-6 border-t border-gray-800 pt-4">
                                        <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                                        <div className="mt-4 flex items-center gap-2 text-gray-600">
                                            <ThumbsUp size={14} />
                                            <span className="text-xs">Was this helpful?</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {search && !filtered.length && (
                <p className="text-center text-gray-600 text-sm py-8">No questions found matching "{search}".</p>
            )}
        </section>
    );
};

export default ImprovedFAQ;
