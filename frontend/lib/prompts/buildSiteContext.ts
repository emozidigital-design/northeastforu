// Builds a compact site context block injected into the system prompt at request time.
// Tries the live backend first; falls back to static data so the chatbot always has content.

import STATE_DATA from '@/lib/stateData';
import { STATIC_ITINERARIES } from '@/lib/itineraryData';
import { STATIC_BLOGS } from '@/lib/blogData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://northeastforu.com';

async function safeFetch(url: string): Promise<any[] | null> {
    try {
        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) return null;
        const json = await res.json();
        return Array.isArray(json.data) ? json.data : null;
    } catch {
        return null;
    }
}

export async function buildSiteContext(): Promise<string> {
    const [apiStates, apiItineraries, apiBlogs] = await Promise.all([
        safeFetch(`${API_URL}/states`),
        safeFetch(`${API_URL}/itineraries?limit=50`),
        safeFetch(`${API_URL}/blogs?limit=30`),
    ]);

    // --- States & cities ---
    const states = apiStates ?? STATE_DATA;
    const statesBlock = states.map((s: any) => {
        const cities = (s.cities ?? [])
            .map((c: any) => `    • ${c.name} (${c.best_time ?? ''}) — ${c.slug ? `${SITE_URL}/${s.slug}/${c.slug}` : ''}`)
            .join('\n');
        const attractions = (s.attractions ?? [])
            .map((a: any) => `    • ${a.name}${a.location ? ` (${a.location})` : ''}`)
            .join('\n');
        return [
            `STATE: ${s.name} | ${s.tagline ?? ''} | Best season: ${s.best_season ?? ''}`,
            `  URL: ${SITE_URL}/${s.slug}`,
            `  Theme: ${s.theme ?? ''}`,
            cities   ? `  Cities:\n${cities}`      : '',
            attractions ? `  Attractions:\n${attractions}` : '',
        ].filter(Boolean).join('\n');
    }).join('\n\n');

    // --- Itineraries ---
    const itineraries = apiItineraries ?? STATIC_ITINERARIES;
    const itinerariesBlock = itineraries.map((it: any) => {
        const price  = it.price_estimate ?? it.price;
        const dur    = it.duration_days  ? `${it.duration_days} days` : (it.duration ?? '');
        const highlights = Array.isArray(it.highlights)
            ? it.highlights.join(', ')
            : (typeof it.highlights === 'string' ? it.highlights : '');
        return [
            `ITINERARY: ${it.title}`,
            `  URL: ${SITE_URL}/itineraries/${it.slug}`,
            `  Category: ${it.category ?? ''} | Duration: ${dur} | From: ₹${price ?? ''}`,
            `  Summary: ${it.description ?? ''}`,
            highlights ? `  Highlights: ${highlights}` : '',
        ].filter(Boolean).join('\n');
    }).join('\n\n');

    // --- Blog guides ---
    const blogs = apiBlogs ?? STATIC_BLOGS;
    const blogsBlock = blogs
        .filter((b: any) => b.status !== 'draft')
        .map((b: any) =>
            `BLOG: ${b.title}\n  URL: ${SITE_URL}/blog/${b.slug}\n  Category: ${b.category ?? ''} | ${b.excerpt ?? b.seo_description ?? ''}`
        ).join('\n\n');

    return `
=== NORTHEASTFORU WEBSITE CONTENT (use this as your primary knowledge source) ===

--- DESTINATIONS (${states.length} states) ---
${statesBlock}

--- ITINERARIES & PACKAGES (${itineraries.length} packages) ---
${itinerariesBlock}

--- BLOG GUIDES (${blogs.length} articles) ---
${blogsBlock}

--- SITE PAGES ---
Homepage:      ${SITE_URL}
Destinations:  ${SITE_URL}/destinations
All Activities:${SITE_URL}/activities
Itineraries:   ${SITE_URL}/itineraries
Blog:          ${SITE_URL}/blog
Plan My Trip:  ${SITE_URL}/plan-my-trip
=== END SITE CONTENT ===
`.trim();
}
