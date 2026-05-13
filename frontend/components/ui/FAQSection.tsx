'use client';

import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full text-left px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-900">{faq.question}</span>
                            <span className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>
                        {activeIndex === index && (
                            <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-200">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
