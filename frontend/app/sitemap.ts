import { MetadataRoute } from 'next';
import { fetchAllBlogs } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

const STATIC_STATE_SLUGS = [
    'assam', 'meghalaya', 'mizoram', 'nagaland',
    'manipur', 'tripura', 'arunachal-pradesh', 'sikkim',
];

async function safeFetch(url: string): Promise<any[]> {
    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://northeastforu.com';

    const [states, cities, attractions, activities, blogsRes] = await Promise.all([
        safeFetch(`${API_URL}/states`),
        safeFetch(`${API_URL}/cities?limit=100`),
        safeFetch(`${API_URL}/attractions?limit=200`),
        safeFetch(`${API_URL}/activities?limit=100`),
        fetchAllBlogs().catch(() => ({ data: [] })), // Emozi CMS (with local/static fallback)
    ]);
    const blogs = blogsRes?.data || [];

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/explore`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/activities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
        { url: `${baseUrl}/plan-my-trip`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/itineraries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ];

    // State entries: prefer API data, fall back to static slug list
    const stateEntries: MetadataRoute.Sitemap = states.length > 0
        ? states.map((state: any) => ({
            url: `${baseUrl}/${state.slug}`,
            lastModified: new Date(state.updated_at || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
        : STATIC_STATE_SLUGS.map(slug => ({
            url: `${baseUrl}/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }));

    const cityEntries: MetadataRoute.Sitemap = cities.map((city: any) => ({
        url: `${baseUrl}/${city.state?.slug || 'unknown'}/${city.slug}`,
        lastModified: new Date(city.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const attractionEntries: MetadataRoute.Sitemap = attractions.map((attr: any) => ({
        url: `${baseUrl}/${attr.city?.state?.slug || 'unknown'}/${attr.city?.slug || 'unknown'}/${attr.slug}`,
        lastModified: new Date(attr.updated_at || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const activityEntries: MetadataRoute.Sitemap = activities.map((act: any) => ({
        url: `${baseUrl}/activities/${act.slug}`,
        lastModified: new Date(act.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const blogEntries: MetadataRoute.Sitemap = blogs.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        ...staticPages,
        ...stateEntries,
        ...cityEntries,
        ...attractionEntries,
        ...activityEntries,
        ...blogEntries,
    ];
}
