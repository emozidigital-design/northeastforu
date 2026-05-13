'use client';

import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import { Heart, Shield, Globe, Users, Star, ShieldCheck, Map, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function About() {
    const reasons = [
        {
            icon: <Map className="text-green-600" size={32} />,
            title: "Local Expertise",
            desc: "Born and raised in the North East, our team knows every hidden trail and local secret."
        },
        {
            icon: <ShieldCheck className="text-blue-600" size={32} />,
            title: "Safety First",
            desc: "We prioritize your safety with verified accommodations and expert local drivers."
        },
        {
            icon: <Heart className="text-red-500" size={32} />,
            title: "Authentic Experiences",
            desc: "Beyond the tourist traps—we connect you with real tribal cultures and homestays."
        },
        {
            icon: <Clock className="text-orange-500" size={32} />,
            title: "24/7 Support",
            desc: "Our travel experts are just a WhatsApp message away, anytime, anywhere."
        },
        {
            icon: <Zap className="text-yellow-500" size={32} />,
            title: "Instant Booking",
            desc: "Seamless booking process with instant confirmation for curated activities."
        },
        {
            icon: <Star className="text-purple-600" size={32} />,
            title: "Premium Service",
            desc: "From budget to luxury, we ensure every trip feels like a five-star adventure."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
                <Image
                    src="https://images.unsplash.com/photo-1582650007812-7f7220088cb0?q=80&w=2070"
                    alt="North East India Landscape"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="relative z-10 text-center text-white px-4">
                    <ScrollReveal>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">Our Mission</h1>
                        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium">To bring the raw, untouched beauty of North East India to the global stage while promoting responsible tourism.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Story */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <ScrollReveal direction="right">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">The Story Behind <span className="text-green-600">NorthEastForU</span></h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>Founded in 2024, NorthEastForU started as a passion project by a group of travel enthusiasts who realized that the "Seven Sisters" were often overlooked in mainstream Indian tourism.</p>
                            <p>We believe that travel is more than just visiting places; it's about understanding cultures, respecting ecosystems, and empowering local communities.</p>
                            <p>Our platform is designed to provide travelers with authentic, verified information, from permit requirements to hidden trekking trails that you won't find in any commercial guidebook.</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="left">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1546416631-08149176317b?q=80&w=1974"
                                alt="Tribal Festival"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <ScrollReveal>
                        <h2 className="text-4xl font-black text-gray-900">Our Core Principles</h2>
                    </ScrollReveal>
                </div>
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Globe, title: 'Authenticity', desc: 'We only recommend places and experiences we have verified locally.' },
                        { icon: Heart, title: 'Local First', desc: 'We prioritize local guides, homestays, and community-led initiatives.' },
                        { icon: Shield, title: 'Safety', desc: 'Security is our priority. We provide real-time travel advisories and tips.' },
                        { icon: Users, title: 'Community', desc: 'A platform built for travelers, by travelers of North East India.' }
                    ].map((item, idx) => (
                        <ScrollReveal delay={idx * 100} key={item.title}>
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover-lift text-center h-full">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-24 text-[#1a1a1a]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 font-display">Why Choose NorthEastForU?</h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">We are more than a travel agency. We are your local friends in the North East, ensuring your journey is as smooth as it is memorable.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {reasons.map((item, idx) => (
                                <div key={idx} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:border-green-100 hover:bg-green-50/20 transition-all group">
                                    <div className="bg-white p-4 rounded-2xl inline-block shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 font-display">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#0f1e14] rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 blur-[100px] rounded-full"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-6 font-display">Ready to Explore the Unexplored?</h3>
                                <p className="text-green-100/70 mb-10 max-w-xl mx-auto text-lg leading-relaxed">Let us create a personalized itinerary tailored to your preferences and travel style.</p>
                                <Link href="/plan-my-trip" className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors inline-block shadow-xl shadow-black/20">
                                    Start Planning My Trip
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}

