const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
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
    return res?.data || null;
}

export async function fetchAllBlogs() {
    return fetchAPI('/blogs', { next: { revalidate: 30 } });
}

export async function fetchAllItineraries() {
    return fetchAPI('/itineraries', { next: { revalidate: 3600 } });
}

export async function fetchItineraryBySlug(slug: string) {
    const res = await fetchAPI(`/itineraries/${slug}`, { next: { revalidate: 3600 } });
    return res?.data || null;
}

export async function searchAPI(query: string) {
    return fetchAPI(`/search?q=${encodeURIComponent(query)}`);
}
