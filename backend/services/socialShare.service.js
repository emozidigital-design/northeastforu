const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Shares a blog post to active social media platforms.
 */
exports.shareBlogOnSocial = async (blog) => {
    console.log(`Sharing blog to social media: ${blog.title}`);

    const platforms = [
        { name: 'facebook', func: this.shareOnFacebook },
        { name: 'twitter', func: this.shareOnTwitter }
    ];

    for (const platform of platforms) {
        try {
            const postUrl = await platform.func(blog);
            await prisma.social_shares.create({
                data: {
                    blog_id: blog.id,
                    platform: platform.name,
                    status: 'shared',
                    shared_at: new Date(),
                    post_url: postUrl
                }
            });
            console.log(`Shared on ${platform.name}: ${postUrl}`);
        } catch (error) {
            console.error(`Failed to share on ${platform.name}:`, error.message);
            await prisma.social_shares.create({
                data: {
                    blog_id: blog.id,
                    platform: platform.name,
                    status: 'failed',
                    error_message: error.message
                }
            });
        }
    }

    // Handle Instagram (Manual Queue as requested)
    await this.queueForInstagram(blog);
};

/**
 * Shares to Facebook Page via Graph API.
 */
exports.shareOnFacebook = async (blog) => {
    if (!process.env.FACEBOOK_ACCESS_TOKEN || !process.env.FACEBOOK_PAGE_ID) {
        throw new Error('Facebook credentials missing');
    }

    const blogUrl = `https://northeastforu.com/blog/${blog.slug}`;
    const message = `🌿 ${blog.title}\n\n${blog.seo_description || blog.content.substring(0, 150)}...\n\nRead the full guide → ${blogUrl}\n\n#NorthEastIndia #Travel #NorthEastForU`;

    const response = await axios.post(`https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/feed`, {
        message: message,
        link: blogUrl,
        access_token: process.env.FACEBOOK_ACCESS_TOKEN
    });

    return `https://facebook.com/${response.data.id}`;
};

/**
 * Shares to Twitter / X via API v2.
 */
exports.shareOnTwitter = async (blog) => {
    // Twitter integration usually requires OAuth 1.0a or 2.0. 
    // For simplicity in this script, we'll assume a wrapper or direct POST if using bearer token.
    if (!process.env.TWITTER_ACCESS_TOKEN) {
        throw new Error('Twitter credentials missing');
    }

    const blogUrl = `https://northeastforu.com/blog/${blog.slug}`;
    const tweetText = `🏔️ ${blog.title}\n\n${blog.seo_description?.substring(0, 100) || 'New travel guide!'}...\n\nFull guide → ${blogUrl}\n\n#NorthEastIndia #Travel`;

    // Using a mock URL for this implementation as real Twitter API v2 requires complex OAuth signing libs
    const response = await axios.post('https://api.twitter.com/2/tweets', {
        text: tweetText
    }, {
        headers: { Authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}` }
    });

    return `https://twitter.com/intent/status/${response.data.data.id}`;
};

/**
 * Queues post data for manual Instagram sharing.
 */
exports.queueForInstagram = async (blog) => {
    const blogUrl = `https://northeastforu.com/blog/${blog.slug}`;
    const caption = `📸 ${blog.title}\n\n${blog.seo_description}\n\nLink in bio: ${blogUrl}\n\n#NorthEastIndia #TravelGuide #IncredibleIndia`;

    // Save to a specialized table or just log for admin
    console.log('Instagram queued (Manual):', caption);

    // Reusing social_shares table with 'pending' status for Instagram
    await prisma.social_shares.create({
        data: {
            blog_id: blog.id,
            platform: 'instagram',
            status: 'pending',
            error_message: 'Manual posting required',
            post_url: blog.featured_image // Store image link for admin to download
        }
    });
};
