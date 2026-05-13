'use client';

import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Link as LinkIcon, Check, MessageCircle } from 'lucide-react';

interface BlogShareButtonsProps {
    title: string;
    url?: string;
}

export default function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(url || '');

    useEffect(() => {
        if (!url && typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, [url]);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    };

    const copyToClipboard = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-[#0f1e14]">Share This Article</h3>
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:brightness-110 transition-all text-sm"
                >
                    <MessageCircle size={18} /> <span className="truncate">Share on WhatsApp</span>
                </a>
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#1877F2] text-white rounded-lg font-bold hover:brightness-110 transition-all text-sm"
                >
                    <Facebook size={18} /> <span className="truncate">Share on Facebook</span>
                </a>
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-black text-white rounded-lg font-bold hover:brightness-110 transition-all text-sm"
                >
                    <Twitter size={18} /> <span className="truncate">Share on X</span>
                </a>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-[#f0f0f0] text-[#333333] rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
                >
                    {copied ? <Check size={18} className="text-green-600" /> : <LinkIcon size={18} />}
                    <span className="truncate">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
            </div>
        </div>
    );
}
