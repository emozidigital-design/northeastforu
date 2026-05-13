'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const WhatsAppButton: React.FC = () => {
    const pathname = usePathname();

    // Hide on admin pages
    if (pathname?.startsWith('/admin')) return null;

    const phoneNumber = '919876543210';
    const message = 'Hi NorthEastForU! I want to know more about travelling to North East India.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-[104px] right-6 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-0"></div>
            <MessageCircle size={32} />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-100">
                Need Help Planning?
            </span>
        </a>
    );
};

export default WhatsAppButton;
