import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://northeastforu.com';

    try {
        // Fetch data from API
        const [statesRes, citiesRes, attractionsRes, activitiesRes, blogsRes] = await Promise.all([
            fetch(`${API_URL}/states`).then(res => res.json()),
            fetch(`${API_URL}/cities?limit=100`).then(res => res.json()),
            fetch(`${API_URL}/attractions?limit=200`).then(res => res.json()),
            fetch(`${API_URL}/activities?limit=100`).then(res => res.json()),
            fetch(`${API_URL}/blogs?limit=100`).then(res => res.json()),
        ]);

        const states = statesRes.data || [];
        const cities = citiesRes.data || [];
        const attractions = attractionsRes.data || [];
        const activities = activitiesRes.data || [];
        const blogs = blogsRes.data || [];

        const staticPages: MetadataRoute.Sitemap = [
            { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
            { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
            { url: `${baseUrl}/activities`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
            { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
            { url: `${baseUrl}/plan-my-trip`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
            { url: `${baseUrl}/itineraries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        ];

        const stateEntries: MetadataRoute.Sitemap = states.map((state: any) => ({
            url: `${baseUrl}/${state.slug}`,
            lastModified: new Date(state.updated_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.9,
        }));

        const cityEntries: MetadataRoute.Sitemap = cities.map((city: any) => ({
            url: `${baseUrl}/${city.state?.slug || 'unknown'}/${city.slug}`,
            lastModified: new Date(city.updated_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        const attractionEntries: MetadataRoute.Sitemap = attractions.map((attr: any) => ({
            url: `${baseUrl}/${attr.city?.state?.slug || 'unknown'}/${attr.city?.slug || 'unknown'}/${attr.slug}`,
            lastModified: new Date(attr.updated_at || new Date()),
            changeFrequency: 'monthly',
            priority: 0.7,
        }));

        const activityEntries: MetadataRoute.Sitemap = activities.map((act: any) => ({
            url: `${baseUrl}/activities/${act.slug}`,
            lastModified: new Date(act.updated_at || new Date()),
            changeFrequency: 'weekly',
            priority: 0.8,
        }));

        const blogEntries: MetadataRoute.Sitemap = blogs.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.published_at || new Date()),
            changeFrequency: 'weekly',
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
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [
            { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        ];
    }
}
