interface DestinationData {
    name: string;
    description?: string;
    hero_image?: string;
    slug: string;
}

export function generateTouristDestinationSchema(data: DestinationData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: data.name,
        description: data.description,
        image: data.hero_image,
        url: `https://northeastforu.com/${data.slug}`,
    };
}

interface AttractionData {
    name: string;
    description?: string;
    hero_image?: string;
    location?: string;
}

export function generateTouristAttractionSchema(data: AttractionData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: data.name,
        description: data.description,
        image: data.hero_image,
        address: {
            '@type': 'PostalAddress',
            addressLocality: data.location,
        },
    };
}

interface BlogData {
    title: string;
    featured_image?: string;
    author?: string;
    published_at?: string;
    seo_description?: string;
}

export function generateBlogPostingSchema(data: BlogData) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        image: data.featured_image,
        author: {
            '@type': 'Person',
            name: data.author,
        },
        datePublished: data.published_at,
        description: data.seo_description,
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://northeastforu.com${item.item}`,
        })),
    };
}
