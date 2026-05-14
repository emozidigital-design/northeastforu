import { STATIC_BLOGS, getBlogBySlug as getStaticBlog } from './blogData';
import { STATIC_ITINERARIES, getItineraryBySlug as getStaticItinerary } from './itineraryData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!res.ok) return null;

        return res.json();
    } catch {
        return null;
    }
}

export async function fetchStates() {
    return fetchAPI('/states', { next: { revalidate: 3600 } });
}

export async function fetchStateBySlug(slug: string) {
    const res = await fetchAPI(`/states/${slug}`, { next: { revalidate: 3600 } });
    return res?.data || null;
}

export async function fetchCitiesByState(stateSlug: string) {
    return fetchAPI(`/cities?state=${stateSlug}`, { next: { revalidate: 3600 } });
}

export async function fetchAllCities() {
    return fetchAPI('/cities', { next: { revalidate: 3600 } });
}

export async function fetchCityBySlug(slug: string) {
    const res = await fetchAPI(`/cities/${slug}`, { next: { revalidate: 3600 } });
    return res?.data || null;
}

export async function fetchAttractionsByCity(cityId: number | string) {
    return fetchAPI(`/attractions?city_id=${cityId}`, { next: { revalidate: 3600 } });
}

export async function fetchAttractionBySlug(slug: string) {
    const res = await fetchAPI(`/attractions/${slug}`, { next: { revalidate: 3600 } });
    return res?.data || null;
}

export async function fetchAllAttractions() {
    return fetchAPI('/attractions', { next: { revalidate: 3600 } });
}

export async function fetchActivityBySlug(slug: string) {
    const res = await fetchAPI(`/activities/${slug}`, { next: { revalidate: 3600 } });
    return res?.data || null;
}

export async function fetchAllActivities() {
    return fetchAPI('/activities', { next: { revalidate: 30 } });
}

export async function fetchBlogBySlug(slug: string) {
    const res = await fetchAPI(`/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (res?.data) return res.data;
    return getStaticBlog(slug);
}

export async function fetchAllBlogs() {
    const res = await fetchAPI('/blogs', { next: { revalidate: 30 } });
    if (res?.data?.length) return res;
    return { data: STATIC_BLOGS };
}

export async function fetchAllItineraries() {
    const res = await fetchAPI('/itineraries', { next: { revalidate: 3600 } });
    if (res?.data?.length) return res;
    return { data: STATIC_ITINERARIES };
}

export async function fetchItineraryBySlug(slug: string) {
    const res = await fetchAPI(`/itineraries/${slug}`, { next: { revalidate: 3600 } });
    if (res?.data) return res.data;
    return getStaticItinerary(slug);
}

export async function searchAPI(query: string) {
    return fetchAPI(`/search?q=${encodeURIComponent(query)}`);
}
