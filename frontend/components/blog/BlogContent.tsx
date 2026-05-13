'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <article className="max-w-none">
            {/* Custom typography to match blog.agentbazar.in exactly */}
            <style jsx global>{`
                .blog-article-content {
                    font-family: var(--font-source-sans), 'Source Sans 3', sans-serif;
                    font-size: 18px;
                    color: #4f5056;
                    line-height: 1.6;
                }
                .blog-article-content h1 {
                    font-family: var(--font-poppins), 'Poppins', sans-serif;
                    font-weight: 700;
                    font-size: 40px;
                    color: #1a1a1b;
                    margin-bottom: 24px;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }
                .blog-article-content h2 {
                    font-family: var(--font-poppins), 'Poppins', sans-serif;
                    font-weight: 700;
                    font-size: 28px;
                    color: #1a1a1b;
                    margin-top: 48px;
                    margin-bottom: 16px;
                    line-height: 1.3;
                    letter-spacing: -0.02em;
                }
                .blog-article-content h3 {
                    font-family: var(--font-poppins), 'Poppins', sans-serif;
                    font-weight: 700;
                    font-size: 22px;
                    color: #1a1a1b;
                    margin-top: 36px;
                    margin-bottom: 12px;
                    line-height: 1.4;
                    letter-spacing: -0.02em;
                }
                .blog-article-content p {
                    margin-bottom: 20px;
                }
                .blog-article-content strong {
                    color: #1a1a1b;
                    font-weight: 700;
                }
                .blog-article-content ul {
                    list-style-type: disc;
                    padding-left: 24px;
                    margin-bottom: 25px;
                }
                .blog-article-content ul li {
                    margin-bottom: 12px;
                    line-height: 1.6;
                }
                .blog-article-content ol {
                    list-style-type: decimal;
                    padding-left: 24px;
                    margin-bottom: 25px;
                }
                .blog-article-content ol li {
                    margin-bottom: 12px;
                    line-height: 1.6;
                }
                .blog-article-content blockquote {
                    border-left: 4px solid #1a1a1b;
                    background: #f9fafb;
                    padding: 24px 32px;
                    font-style: italic;
                    border-radius: 0 12px 12px 0;
                    margin: 40px 0;
                    color: #4f5056;
                }
                .blog-article-content a {
                    color: #1a6b3c;
                    font-weight: 600;
                    text-decoration: underline;
                    transition: all 0.2s;
                }
                .blog-article-content a:hover {
                    color: #14522e;
                }
                .blog-article-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 32px 0;
                    border: 1px solid #e0e0e0;
                    font-size: 16px;
                }
                .blog-article-content th {
                    background: #f9fafb;
                    color: #1a1a1b;
                    padding: 16px;
                    text-align: left;
                    font-family: var(--font-poppins), sans-serif;
                    font-weight: 700;
                    border: 1px solid #e0e0e0;
                }
                .blog-article-content td {
                    padding: 16px;
                    border: 1px solid #e0e0e0;
                    color: #4f5056;
                }
                .blog-article-content tr:nth-child(even) {
                    background: #fcfcfc;
                }
            `}</style>

            <div className="blog-article-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || "Content coming soon..."}
                </ReactMarkdown>
            </div>
        </article>
    );
}
