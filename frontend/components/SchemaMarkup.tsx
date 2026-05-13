import React from 'react';

interface SchemaProps {
    type: 'TouristDestination' | 'TouristAttraction' | 'Event' | 'BlogPosting' | 'FAQPage';
    data: any;
}

const SchemaMarkup: React.FC<SchemaProps> = ({ type, data }) => {
    let schema: any = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    // Add BreadcrumbList implicitly
    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': data.breadcrumbs || []
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
        </>
    );
};

export default SchemaMarkup;
