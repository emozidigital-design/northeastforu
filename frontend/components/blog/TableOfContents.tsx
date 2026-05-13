'use client';

import React, { useEffect, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('article h2'));
        const tocItems = elements.map((el) => {
            const text = el.textContent || '';
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            el.id = id;
            // Add custom styles for highlight effect
            (el as HTMLElement).style.scrollMarginTop = '100px';
            return { id, text };
        });
        setHeadings(tocItems);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -70% 0px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });

            // Highlight effect
            element.classList.add('bg-green-50');
            setTimeout(() => {
                element.classList.remove('bg-green-50');
            }, 2000);

            window.history.pushState(null, '', `#${id}`);
        }
    };

    if (headings.length === 0) return null;

    return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg font-bold text-[#0f1e14]">In This Article</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-green-600 font-medium text-sm"
                >
                    {isOpen ? 'Close' : 'Expand'}
                </button>
            </div>

            <nav className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="space-y-3 border-l-2 border-gray-200">
                    {headings.map((heading) => (
                        <li key={heading.id}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => handleClick(e, heading.id)}
                                className={`
                                    block pl-4 text-sm transition-all duration-200 border-l-2 -ml-[2px]
                                    ${activeId === heading.id
                                        ? 'text-[#1a6b3c] font-bold border-[#1a6b3c]'
                                        : 'text-gray-500 hover:text-green-600 border-transparent hover:border-green-200'
                                    }
                                `}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
