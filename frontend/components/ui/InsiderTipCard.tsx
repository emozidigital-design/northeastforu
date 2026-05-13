'use client';

import React from 'react';
import {
    Banknote, Shield, Utensils, Car, Camera, Layers, Clock, FileText, Backpack
} from 'lucide-react';

interface InsiderTipCardProps {
    tip_title: string;
    tip_content: string;
    tip_category: string;
}

const CATEGORIES: Record<string, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    Budget: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', icon: <Banknote size={14} /> },
    Food: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: <Utensils size={14} /> },
    Transport: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: <Car size={14} /> },
    Safety: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400', icon: <Shield size={14} /> },
    Photography: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: <Camera size={14} /> },
    Culture: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', icon: <Layers size={14} /> },
    Timing: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', icon: <Clock size={14} /> },
    Permits: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', icon: <FileText size={14} /> },
    Packing: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', icon: <Backpack size={14} /> },
};

const InsiderTipCard: React.FC<InsiderTipCardProps> = ({ tip_title, tip_content, tip_category }) => {
    const style = CATEGORIES[tip_category] ?? { bg: 'bg-gray-800', border: 'border-gray-700', text: 'text-gray-400', icon: null };

    return (
        <div className={`${style.bg} ${style.border} border rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-200 cursor-default`}>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold mb-3 ${style.border} ${style.text}`}>
                {style.icon}
                {tip_category}
            </div>
            <p className="text-white font-semibold text-sm mb-2 leading-snug">{tip_title}</p>
            <p className="text-gray-400 text-xs leading-relaxed">{tip_content}</p>
        </div>
    );
};

export default InsiderTipCard;
