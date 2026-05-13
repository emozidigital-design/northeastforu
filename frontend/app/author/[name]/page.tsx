'use client';

import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { Twitter, Instagram, Globe, BookOpen, MapPin } from 'lucide-react';
import CardGrid from '@/components/ui/CardGrid';

export default function AuthorProfile({ params }: { params: { name: string } }) {
    // Mock author data
    const author = {
        name: "Pranab Keleng",
        role: "Senior Travel Architect",
        bio: "Pranab has spent the last 15 years exploring every nook and cranny of North East India. From the high passes of Tawang to the river islands of Assam, he brings first-hand experience to every guide.",
        avatar: "https://i.pravatar.cc/300?u=pranab",
        location: "Guwahati, Assam",
        specialty: "Offbeat Itineraries & Cultural Documentation",
        social: {
            twitter: "#",
            instagram: "#",
            website: "#"
        }
    };

    const mockArticles = [
        { title: 'The Ultimate Guide to Ziro', slug: 'ziro-guide', category: 'Travel Guide', image: 'https://images.unsplash.com/photo-1546416631-08149176317b' },
        { title: 'Top 10 Satras of Majuli', slug: 'majuli-satras', category: 'Culture', image: 'https://images.unsplash.com/photo-1582650007812-7f7220088cb0' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="max-w-5xl mx-auto px-4 pt-32">
                <ScrollReveal>
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center text-center md:text-left">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                            <Image
                                src={author.avatar}
                                alt={author.name}
                                fill
                                className="object-cover rounded-full border-4 border-green-100 p-2"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-3 rounded-full shadow-lg">
                                <BookOpen size={24} />
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900">{author.name}</h1>
                                    <p className="text-green-600 font-bold text-lg mt-1">{author.role}</p>
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <a href={author.social.twitter} className="p-3 bg-gray-50 text-gray-400 hover:text-blue-500 rounded-xl transition-all"><Twitter size={20} /></a>
                                    <a href={author.social.instagram} className="p-3 bg-gray-50 text-gray-400 hover:text-pink-500 rounded-xl transition-all"><Instagram size={20} /></a>
                                    <a href={author.social.website} className="p-3 bg-gray-50 text-gray-400 hover:text-green-600 rounded-xl transition-all"><Globe size={20} /></a>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 mb-6 justify-center md:justify-start">
                                <MapPin size={18} />
                                <span className="text-sm font-medium">{author.location}</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {author.bio}
                            </p>

                            <div className="inline-block bg-green-50 text-green-700 px-6 py-2 rounded-full text-sm font-bold border border-green-100">
                                Specializes in: {author.specialty}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="mt-20">
                    <ScrollReveal>
                        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
                            <BookOpen className="text-green-600" />
                            Articles by {author.name.split(' ')[0]}
                        </h2>
                    </ScrollReveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mockArticles.map((article, idx) => (
                            <ScrollReveal key={idx} delay={idx * 100}>
                                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100">
                                    <div className="relative h-64">
                                        <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-8">
                                        <span className="text-green-600 font-bold text-xs uppercase tracking-widest">{article.category}</span>
                                        <h3 className="text-2xl font-bold text-gray-900 mt-2 group-hover:text-green-600 transition-colors">{article.title}</h3>
                                        <p className="mt-4 text-green-600 font-bold flex items-center gap-2 hover:translate-x-2 transition-transform cursor-pointer">
                                            Read Article →
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
