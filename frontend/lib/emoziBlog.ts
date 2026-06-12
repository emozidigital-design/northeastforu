// Blog source: the external Emozi CMS (admin.emozidigital.com).
// Blogs for this site are authored there with NorthEastForU as a client.
// This module fetches from the Emozi API and normalises each post into the
// shape the blog pages already expect. If the CMS is not configured or is
// unreachable, callers fall back to the local API / static data.

const EMOZI_URL = process.env.NEXT_PUBLIC_EMOZI_CMS_URL; // e.g. https://admin.emozidigital.com/api
const EMOZI_CLIENT = process.env.NEXT_PUBLIC_EMOZI_CLIENT || 'northeastforu';

export const emoziConfigured = Boolean(EMOZI_URL);

// The shape the blog list/detail pages consume.
export interface NormalizedBlog {
    id: number | string;
    slug: string;
    title: string;
    content: string;        // markdown
    author: string;
    category: string;
    featured_image: string;
    published_at: string;
    updated_at?: string;
    status: 'published' | 'draft';
    seo_title?: string;
    seo_description?: string;
    excerpt?: string;
    faq?: { question: string; answer: string }[];
}

// Map a raw Emozi post (field names may vary) to NormalizedBlog. This is the
// single place to adjust if the Emozi API contract differs from assumptions.
function normalize(p: any): NormalizedBlog {
    return {
        id: p.id ?? p._id ?? p.slug,
        slug: p.slug,
        title: p.title ?? p.name ?? '',
        content: p.content ?? p.body ?? p.markdown ?? p.html ?? '',
        author: p.author ?? p.author_name ?? (p.author && p.author.name) ?? 'NorthEastForU Team',
        category: p.category ?? p.category_name ?? (Array.isArray(p.tags) ? p.tags[0] : '') ?? '',
        featured_image: p.featured_image ?? p.cover_image ?? p.image ?? p.thumbnail ?? '',
        published_at: p.published_at ?? p.publishedAt ?? p.date ?? p.created_at ?? new Date().toISOString(),
        updated_at: p.updated_at ?? p.updatedAt,
        // CMSes use various flags; treat anything not explicitly draft as published.
        status: (p.status === 'draft' || p.published === false) ? 'draft' : 'published',
        seo_title: p.seo_title ?? p.meta_title,
        seo_description: p.seo_description ?? p.meta_description ?? p.excerpt,
        excerpt: p.excerpt ?? p.summary ?? p.description,
        faq: Array.isArray(p.faq) ? p.faq : undefined,
    };
}

async function emoziFetch(path: string, init: RequestInit = {}) {
    if (!EMOZI_URL) return null;
    try {
        const sep = path.includes('?') ? '&' : '?';
        const url = `${EMOZI_URL}${path}${sep}client=${encodeURIComponent(EMOZI_CLIENT)}`;
        const res = await fetch(url, {
            ...init,
            headers: { 'Content-Type': 'application/json', ...init.headers },
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

// Pull the list of posts out of whatever envelope the CMS returns.
function extractList(json: any): any[] | null {
    if (!json) return null;
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.data)) return json.data;
    if (Array.isArray(json.posts)) return json.posts;
    if (Array.isArray(json.results)) return json.results;
    return null;
}

function extractOne(json: any): any | null {
    if (!json) return null;
    if (json.data && !Array.isArray(json.data)) return json.data;
    if (json.post) return json.post;
    if (json.slug || json.title) return json;
    const list = extractList(json);
    return list?.[0] ?? null;
}

// Returns normalized blogs, or null if the CMS is unconfigured/unreachable.
export async function fetchEmoziBlogs(): Promise<NormalizedBlog[] | null> {
    const json = await emoziFetch('/posts', { next: { revalidate: 60 } } as RequestInit);
    const list = extractList(json);
    if (!list) return null;
    return list.map(normalize);
}

export async function fetchEmoziBlogBySlug(slug: string): Promise<NormalizedBlog | null> {
    const json = await emoziFetch(`/posts/${encodeURIComponent(slug)}`, { next: { revalidate: 300 } } as RequestInit);
    const one = extractOne(json);
    return one ? normalize(one) : null;
}
