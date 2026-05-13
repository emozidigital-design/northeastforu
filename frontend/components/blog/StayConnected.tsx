'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send, MessageCircle } from 'lucide-react';

export default function StayConnected() {
    return (
        <section className="bg-[#1a6b3c] rounded-[2rem] p-8 md:p-12 text-white overflow-hidden relative group">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

            <div className="relative z-10 text-center space-y-8">
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-display font-bold">🌿 Stay Connected with NorthEastForU</h2>
                    <p className="text-green-50/90 text-lg max-w-2xl mx-auto">
                        Follow us for daily North East India travel inspiration and tips. Explore the Seven Sisters and Sikkim with us!
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://facebook.com/northeastforu" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#0d65d9] px-6 py-3 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg">
                        <Facebook size={20} /> <span className="hidden sm:inline">Facebook</span>
                    </a>
                    <a href="https://instagram.com/northeastforu" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-110 px-6 py-3 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg">
                        <Instagram size={20} /> <span className="hidden sm:inline">Instagram</span>
                    </a>
                    <a href="https://twitter.com/northeastforu" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-gray-900 px-6 py-3 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg border border-white/20">
                        <Twitter size={20} /> <span className="hidden sm:inline">Twitter / X</span>
                    </a>
                    <a href="https://youtube.com/northeastforu" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#dd0000] px-6 py-3 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg">
                        <Youtube size={20} /> <span className="hidden sm:inline">YouTube</span>
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 border-t border-white/10">
                    <a href="https://whatsapp.com/channel/..." target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe55] px-8 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02]">
                        <MessageCircle size={24} /> Join WhatsApp Channel
                    </a>
                    <a href="https://t.me/northeastforu" target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#229ED9] hover:bg-[#1c8ec9] px-8 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02]">
                        <Send size={24} /> Join Telegram Channel
                    </a>
                </div>
            </div>
        </section>
    );
}
