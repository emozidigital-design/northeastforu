'use client';

import React, { useState, useEffect } from 'react';

export default function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const article = document.getElementById('article-content');
            if (!article) return;

            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.scrollY;

            // Adjust calculation to be relative to the article section
            const relativeScrolled = scrolled - articleTop;
            const scrollableHeight = articleHeight - windowHeight;

            const currentProgress = Math.min(
                Math.max((relativeScrolled / scrollableHeight) * 100, 0),
                100
            );

            setProgress(currentProgress);
        };

        window.addEventListener('scroll', updateProgress);
        window.addEventListener('resize', updateProgress);
        // Run once on mount to handle initial state
        updateProgress();

        return () => {
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-[3px] bg-[#1a6b3c] z-[9999] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
        />
    );
}
