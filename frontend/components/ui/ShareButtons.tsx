'use client';

import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
    const [copied, setCopied] = useState(false);
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">Share</span>
            <div className="flex items-center gap-2">
                <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1" title="Share on WhatsApp">
                    <Share2 size={18} />
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1" title="Share on Facebook">
                    <Facebook size={18} />
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all transform hover:-translate-y-1" title="Share on X">
                    <Twitter size={18} />
                </a>
                <button onClick={copyToClipboard} className="p-2 bg-gray-50 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all transform hover:-translate-y-1 relative" title="Copy Link">
                    {copied ? <Check size={18} className="text-green-600" /> : <LinkIcon size={18} />}
                    {copied && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded animate-in fade-in slide-in-from-bottom-1">
                            Copied!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;
