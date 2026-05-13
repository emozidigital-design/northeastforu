import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import SmartImage from '@/components/ui/SmartImage';
import { fetchBlogBySlug, fetchAllBlogs } from '@/lib/api';
import { Calendar, User, Tag, Clock, ChevronRight } from 'lucide-react';
import CategoryPills from '@/components/blog/CategoryPills';
import ReadingProgress from '@/components/blog/ReadingProgress';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogShareButtons from '@/components/blog/BlogShareButtons';
import StayConnected from '@/components/blog/StayConnected';
import AboutSections from '@/components/blog/AboutSections';
import BlogContent from '@/components/blog/BlogContent';
import SEOSchema, { FAQItem } from '@/components/seo/SEOSchema';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) return { title: 'Not Found' };
    
    const baseUrl = 'https://northeastforu.com';
    const canonicalUrl = `${baseUrl}/blog/${slug}`;
    const title = blog.seo_title || blog.title || 'Blog Post | NorthEastForU';
    const description = blog.seo_description || blog.title || '';
    const ogImage = blog.featured_image || `${baseUrl}/images/blog-placeholder.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: 'NorthEastForU',
            images: [{ url: ogImage }],
            type: 'article',
            publishedTime: blog.published_at,
            authors: [blog.author || 'NorthEastForU Team'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await fetchBlogBySlug(slug);
    if (!blog) notFound();

    // Fetch related posts (same category or just recent)
    let relatedPosts: any[] = [];
    try {
        const allBlogs = await fetchAllBlogs();
        relatedPosts = (allBlogs?.data || [])
            .filter((b: any) => b.status === 'published' && b.slug !== slug)
            .filter((b: any) => b.category === blog.category)
            .slice(0, 3);

        if (relatedPosts.length < 3) {
            const more = (allBlogs?.data || [])
                .filter((b: any) => b.status === 'published' && b.slug !== slug && !relatedPosts.find(r => r.id === b.id))
                .slice(0, 3 - relatedPosts.length);
            relatedPosts = [...relatedPosts, ...more];
        }
    } catch { relatedPosts = []; }

    // Estimate read time
    const wordCount = (blog.content || '').split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    // Split content into intro and body
    const paragraphs = (blog.content || '').split('\n\n');
    const intro = paragraphs[0];
    const body = paragraphs.slice(1).join('\n\n');

    return (
        <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
            {/* SEO Structured Data Plugin */}
            <SEOSchema 
                type="blog"
                data={{
                    title: blog.title,
                    description: blog.seo_description || blog.title,
                    slug: `blog/${blog.slug}`,
                    image: blog.featured_image,
                    publishedAt: blog.published_at,
                    updatedAt: blog.updated_at,
                    author: blog.author,
                    faq: blog.faq as unknown as FAQItem[],
                    breadcrumbs: [
                        { name: 'Home', item: '/' },
                        { name: 'Blog', item: '/blog' },
                        ...(blog.category ? [{ name: blog.category, item: `/blog/category/${blog.category.toLowerCase().replace(/\s+/g, '-')}` }] : []),
                        { name: blog.title, item: `/blog/${blog.slug}` }
                    ]
                }}
            />

            {/* Reading Progress Indicator */}
            <ReadingProgress />

            {/* Category Pills Bar */}
            <Suspense fallback={<div className="h-16 border-b border-gray-100 bg-white" />}>
                <CategoryPills />
            </Suspense>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Article Header */}
                <header className="max-w-4xl mx-auto space-y-6 text-center mb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
                        <ChevronRight size={12} />
                        {blog.category && (
                            <>
                                <Link href={`/blog/category/${encodeURIComponent(blog.category.toLowerCase().replace(/\s+/g, '-'))}`} className="hover:text-green-600 transition-colors">
                                    {blog.category}
                                </Link>
                                <ChevronRight size={12} />
                            </>
                        )}
                        <span className="text-gray-900 font-medium truncate max-w-[200px]">{blog.title}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1a1a1b] leading-tight tracking-tight">
                        {blog.title}
                    </h1>

                    <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                        {intro}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-[#6b7c6e]">
                        {blog.author && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                                    {blog.author.charAt(0)}
                                </div>
                                <span className="font-semibold text-gray-900">{blog.author}</span>
                            </div>
                        )}
                        {blog.published_at && (
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span suppressHydrationWarning>{new Date(blog.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{readTime} min read</span>
                        </div>
                        {blog.category && (
                            <span className="bg-green-100 text-[#1a6b3c] px-3 py-1 rounded-full font-bold text-[12px] uppercase tracking-wider">
                                {blog.category}
                            </span>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                <div className="max-w-[900px] mx-auto aspect-video mb-16 rounded-[1.5rem] overflow-hidden shadow-2xl shadow-green-100/50">
                    <SmartImage
                        src={blog.featured_image || '/images/blog-placeholder.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Main Content Layout */}
                <div id="article-content" className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column - Article Content */}
                    <div className="flex-grow lg:max-w-[740px]">
                        <BlogContent content={body} />

                        {/* Tags Row */}
                        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-3">
                            <span className="font-bold text-gray-400 text-sm uppercase tracking-widest">Tags:</span>
                            <div className="flex flex-wrap gap-2">
                                {blog.category && (
                                    <Link href={`/blog/category/${encodeURIComponent(blog.category.toLowerCase().replace(/\s+/g, '-'))}`}
                                        className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-100 hover:text-green-700 transition-colors">
                                        {blog.category}
                                    </Link>
                                )}
                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">North East India</span>
                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">Travel 2026</span>
                            </div>
                        </div>

                        {/* Share buttons */}
                        <div className="mt-12">
                            <BlogShareButtons title={blog.title} />
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="hidden lg:block lg:w-[320px] flex-shrink-0">
                        <BlogSidebar relatedPosts={relatedPosts} />
                    </div>
                </div>

                {/* Bottom Sections */}
                <div className="mt-24 space-y-24">
                    {/* Stay Connected Box */}
                    <StayConnected />

                    {/* About Sections */}
                    <AboutSections />

                    {/* Related Articles Grid */}
                    <section className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-display font-bold text-[#0f1e14]">You Might Also Like</h2>
                            <Link href="/blog" className="text-green-600 font-bold hover:underline">View All →</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group space-y-4 flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <SmartImage
                                            src={post.featured_image || '/images/blog-placeholder.jpg'}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {post.category && (
                                            <span className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="px-5 pb-6 flex flex-col flex-grow space-y-3">
                                        <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                                            {post.title}
                                        </h3>
                                        <div className="mt-auto flex items-center justify-between text-xs text-[#6b7c6e]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-[10px] font-bold">
                                                    {post.author?.charAt(0) || 'N'}
                                                </div>
                                                <span>{post.author || 'Team NE'}</span>
                                            </div>
                                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
