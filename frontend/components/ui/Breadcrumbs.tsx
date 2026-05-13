'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
    // Build BreadcrumbList JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://northeastforu.com',
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `https://northeastforu.com${item.href}`,
            })),
        ],
    };

    return (
        <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm text-gray-500 mb-6 ${className}`}>
            {/* JSON-LD Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link
                href="/"
                className="hover:text-green-600 transition-colors flex items-center gap-1"
            >
                <Home size={14} />
                <span className="sr-only">Home</span>
            </Link>

            {items.map((item, index) => (
                <React.Fragment key={item.href}>
                    <ChevronRight size={14} className="text-gray-300" />
                    <Link
                        href={item.href}
                        className={`hover:text-green-600 transition-colors ${
                            index === items.length - 1 ? 'font-semibold text-gray-900 pointer-events-none' : ''
                        }`}
                        aria-current={index === items.length - 1 ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
