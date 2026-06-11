'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StateCard from './StateCard';

interface StateItem {
    slug: string;
    name: string;
    image: string;
    theme: string;
    best_season: string;
    city_count: number;
}

export default function StatesGrid({ statesData }: { statesData: StateItem[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statesData.map((state, i) => (
                <motion.div
                    key={state.slug}
                    initial={{ opacity: 0, y: 36 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <StateCard
                        name={state.name}
                        slug={state.slug}
                        image={state.image}
                        theme={state.theme}
                        best_season={state.best_season}
                        city_count={state.city_count}
                    />
                </motion.div>
            ))}
        </div>
    );
}
