'use client';

import React from 'react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface SEOSchemaProps {
    type: 'blog' | 'page' | 'activity' | 'city' | 'state';
    data: {
        title: string;
        description?: string;
        slug: string;
        image?: string;
        publishedAt?: string;
        updatedAt?: string;
        author?: string;
        content?: string;
        faq?: FAQItem[];
        breadcrumbs?: { name: string; item: string }[];
    };
}

const SEOSchema: React.FC<SEOSchemaProps> = ({ type, data }) => {
    const baseUrl = 'https://northeastforu.com';
    const canonicalUrl = `${baseUrl}/${data.slug}`;

    // Base Schema
    const schemas: Record<string, unknown>[] = [];

    // 1. Breadcrumb Schema
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': data.breadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': crumb.name,
                'item': crumb.item.startsWith('http') ? crumb.item : `${baseUrl}${crumb.item}`
            }))
        });
    }

    // 2. Main Content Schema (Article for Blogs)
    if (type === 'blog') {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': data.title,
            'description': data.description,
            'image': data.image || `${baseUrl}/images/blog-placeholder.jpg`,
            'author': {
                '@type': 'Organization',
                'name': data.author || 'NorthEastForU Team',
                'url': baseUrl
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'NorthEastForU',
                'logo': {
                    '@type': 'ImageObject',
                    'url': `${baseUrl}/logo.png`
                }
            },
            'datePublished': data.publishedAt,
            'dateModified': data.updatedAt || data.publishedAt,
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': canonicalUrl
            }
        });
    }

    // 3. FAQ Schema
    if (data.faq && data.faq.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': data.faq.map(item => ({
                '@type': 'Question',
                'name': item.question,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': item.answer
                }
            }))
        });
    }

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};

export default SEOSchema;
