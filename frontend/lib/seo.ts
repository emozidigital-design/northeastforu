export function generateMetadata({
    title,
    description,
    slug,
    image,
}: {
    title?: string;
    description?: string;
    slug?: string;
    image?: string;
}) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://northeastforu.com';
    const fullTitle = title ? `${title} | NorthEastForU` : 'NorthEastForU - Explore North East India';
    const fullDescription = description || 'Discover the hidden gems of North East India with NorthEastForU.';
    const canonical = `${siteUrl}${slug || ''}`;

    return {
        title: fullTitle,
        description: fullDescription,
        alternates: {
            canonical,
        },
        openGraph: {
            title: fullTitle,
            description: fullDescription,
            url: canonical,
            siteName: 'NorthEastForU',
            images: [
                {
                    url: image || '/og-image.jpg',
                    width: 1200,
                    height: 630,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: fullDescription,
            images: [image || '/og-image.jpg'],
        },
    };
}
