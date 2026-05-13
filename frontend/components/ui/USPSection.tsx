'use client';

import { Shield, Clock, Headphones, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const USPs = [
    {
        icon: <Shield size={28} />,
        title: 'Safe & Secure',
        description: 'Verified properties and certified local guides for a worry-free experience in the hills.',
        color: 'from-emerald-400 to-green-600',
        bg: 'bg-green-500/10'
    },
    {
        icon: <Clock size={28} />,
        title: 'Instant Confirmation',
        description: 'Get your booking confirmed instantly with our real-time regional availability engine.',
        color: 'from-blue-400 to-indigo-600',
        bg: 'bg-blue-500/10'
    },
    {
        icon: <Headphones size={28} />,
        title: '24/7 Local Support',
        description: 'Dedicated travel experts natively from the North East available round the clock.',
        color: 'from-purple-400 to-pink-600',
        bg: 'bg-purple-500/10'
    },
    {
        icon: <CheckCircle size={28} />,
        title: 'Best Price Guarantee',
        description: 'We offer the most competitive local rates with zero hidden costs or middleman fees.',
        color: 'from-amber-400 to-orange-600',
        bg: 'bg-amber-500/10'
    }
];

export default function USPSection() {
    return (
        <section className="bg-[#0f1e14] py-24 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/10 blur-[130px] rounded-full mix-blend-screen"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
                        Why Travel With Us?
                    </h2>
                    <p className="text-green-100/60 max-w-2xl mx-auto text-lg">
                        We don&apos;t just sell tours; we are locals delivering the authentic, secure, and premium North East experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {USPs.map((usp, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-colors group relative overflow-hidden"
                        >
                            {/* Hover Gradient Glow */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${usp.color} mix-blend-overlay transition-opacity duration-500`}></div>
                            
                            <div className={`inline-flex p-4 rounded-2xl mb-6 relative z-10 ${usp.bg}`}>
                                <div className={`text-transparent bg-clip-text bg-gradient-to-br ${usp.color}`}>
                                    {usp.icon}
                                </div>
                            </div>
                            
                            <h3 className="font-bold text-white text-xl mb-3 relative z-10">{usp.title}</h3>
                            <p className="text-sm text-green-100/50 leading-relaxed relative z-10">{usp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
