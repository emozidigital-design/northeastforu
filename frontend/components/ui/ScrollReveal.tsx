'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    amount?: number;
}

const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
    amount = 0.12,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount });
    const offset = directionOffset[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: offset.x, y: offset.y }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.75,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
