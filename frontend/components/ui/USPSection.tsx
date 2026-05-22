'use client';

import { Shield, Clock, Headphones, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const USPs = [
    {
        icon: Shield,
        title: 'Safe & Secure',
        description: 'Verified properties and certified local guides for a worry-free experience in the hills.',
    },
    {
        icon: Clock,
        title: 'Instant Confirmation',
        description: 'Get your booking confirmed instantly with our real-time regional availability engine.',
    },
    {
        icon: Headphones,
        title: '24/7 Local Support',
        description: 'Dedicated travel experts natively from the North East available round the clock.',
    },
    {
        icon: BadgeCheck,
        title: 'Best Price Guarantee',
        description: 'The most competitive local rates with zero hidden costs or middleman fees.',
    },
];

export default function USPSection() {
    return (
        <section className="bg-[#0f1e14] py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Why Travel With Us?
                    </h2>
                    <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                        We don&apos;t just sell tours — we are locals delivering the authentic,
                        secure, and premium North East experience.
                    </p>
                </div>

                {/* USP columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                    {USPs.map((usp, i) => {
                        const Icon = usp.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group flex flex-col gap-4 px-8 py-10 lg:py-0 first:pl-0 last:pr-0"
                            >
                                <Icon
                                    size={22}
                                    className="text-white/30 group-hover:text-[#7fff27] transition-colors duration-300"
                                    strokeWidth={1.5}
                                />
                                <div>
                                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-[#7fff27] transition-colors duration-300">
                                        {usp.title}
                                    </h3>
                                    <p className="text-sm text-white/35 leading-relaxed">
                                        {usp.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
