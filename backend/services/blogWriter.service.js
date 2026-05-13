const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Main service to write a blog post for the next pending topic in the queue.
 */
exports.writeDailyBlog = async () => {
    console.log('Starting daily blog writing process with Gemini...');

    // STEP 1 - GET TODAYS TOPIC
    const queueItem = await prisma.blog_queue.findFirst({
        where: {
            status: 'pending',
            scheduled_for: {
                lte: new Date()
            }
        },
        include: {
            blog_topics: true
        },
        orderBy: {
            scheduled_for: 'asc'
        }
    });

    if (!queueItem) {
        console.log('No pending topics scheduled for today.');
        return null;
    }

    const topicText = queueItem.blog_topics.topic;
    console.log(`Writing blog for topic: ${topicText}`);

    try {
        // STEP 2 - RESEARCH CONTEXT FOR INTERNAL LINKING
        const context = await this.getSiteContext(topicText);
        const contextList = context.map(c => `- ${c.name}: /explore/${c.slug}`).join('\n');

        // STEP 3 - CALL GEMINI API
        const systemPrompt = `You are an expert travel writer for NorthEastForU.com, a leading travel guide for North East India.
You write engaging, accurate, SEO-optimized travel articles that feel personal and helpful. You have deep knowledge of North East India.

Your writing style is:
- Warm and conversational but informative
- Uses specific local details and real place names
- Gives practical actionable tips
- Includes local food recommendations
- Mentions entry fees and timings where relevant
- Honest about challenges like road conditions or permits
- Never uses generic filler phrases

Every article you write must include:
- An engaging introduction that answers the main question immediately
- At least 5 clear sections with H2 headings
- A practical tips section
- A FAQ section with 5 questions and detailed answers
- A conclusion with a call to action
- Minimum 1200 words, maximum 1800 words
- Natural keyword usage, never keyword stuffing

Return your response as valid JSON in exactly this format:
{
  "title": "article title here",
  "slug": "url-friendly-slug-here",
  "metaTitle": "SEO title max 60 characters",
  "metaDescription": "SEO description max 160 characters",
  "category": "category name",
  "content": "full article content in markdown format",
  "faqQuestions": [
    {"question": "question 1", "answer": "answer 1"},
    {"question": "question 2", "answer": "answer 2"},
    {"question": "question 3", "answer": "answer 3"},
    {"question": "question 4", "answer": "answer 4"},
    {"question": "question 5", "answer": "answer 5"}
  ],
  "internalLinkSuggestions": [
    {"anchorText": "text to link", "targetSlug": "state-slug/city-slug"}
  ],
  "tags": ["tag1", "tag2", "tag3"]
}`;

        const userMessage = `${systemPrompt}\n\nWrite a complete travel article about: ${topicText}\n\nRelated pages on our site you must link to naturally in the content:\n${contextList}\n\nMake sure internal links feel natural in the content. Do not force links where they do not fit.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }, { apiVersion: "v1" });
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const rawText = response.text();

        // STEP 4 - PARSE GEMINI RESPONSE
        let blogData;
        try {
            const jsonStart = rawText.indexOf('{');
            const jsonEnd = rawText.lastIndexOf('}') + 1;
            blogData = JSON.parse(rawText.substring(jsonStart, jsonEnd));
        } catch (parseError) {
            console.error('Failed to parse Gemini response, retrying once...');
            await prisma.blog_queue.update({
                where: { id: queueItem.id },
                data: { status: 'failed', error_message: 'JSON parse error from AI' }
            });
            throw parseError;
        }

        // STEP 5 - ADD INTERNAL LINKS TO CONTENT
        let enrichedContent = blogData.content;
        const usedSlugs = new Set();

        if (blogData.internalLinkSuggestions) {
            for (const link of blogData.internalLinkSuggestions) {
                if (!usedSlugs.has(link.targetSlug)) {
                    const regex = new RegExp(link.anchorText, 'i');
                    enrichedContent = enrichedContent.replace(regex, `[${link.anchorText}](https://northeastforu.com/explore/${link.targetSlug})`);
                    usedSlugs.add(link.targetSlug);
                }
            }
        }

        // STEP 6 - SAVE BLOG TO DATABASE
        // Ensure slug uniqueness
        let finalSlug = blogData.slug;
        const existingBlog = await prisma.blog.findUnique({ where: { slug: finalSlug } });
        if (existingBlog) finalSlug = `${finalSlug}-2`;

        const newBlog = await prisma.blog.create({
            data: {
                title: blogData.title,
                slug: finalSlug,
                content: enrichedContent,
                author: 'NorthEastForU Editorial Team',
                category: blogData.category || 'Travel Guide',
                seo_title: blogData.metaTitle,
                seo_description: blogData.metaDescription,
                ai_draft: true,
                published_at: new Date()
            }
        });

        // Update Queue and Topic
        await prisma.blog_queue.update({
            where: { id: queueItem.id },
            data: {
                status: 'published',
                published_at: new Date(),
                blog_id: newBlog.id
            }
        });

        await prisma.blog_topics.update({
            where: { id: queueItem.topic_id },
            data: { is_used: true }
        });

        console.log(`Blog published successfully: ${newBlog.title}`);
        return newBlog;

    } catch (error) {
        console.error('Error in blog writer service:', error);
        await prisma.blog_queue.update({
            where: { id: queueItem.id },
            data: { status: 'failed', error_message: error.message }
        });
        throw error;
    }
};

/**
 * Fetches relevant states, cities, and attractions for context.
 */
exports.getSiteContext = async (topic) => {
    // Simple keyword matching for context
    const states = await prisma.states.findMany({ select: { id: true, name: true, slug: true } });
    const cities = await prisma.cities.findMany({ select: { id: true, name: true, slug: true }, take: 20 });
    const attractions = await prisma.attractions.findMany({ select: { id: true, name: true, slug: true }, take: 20 });

    return [...states, ...cities, ...attractions].filter(item =>
        topic.toLowerCase().includes(item.name.toLowerCase()) ||
        Math.random() > 0.7 // Add some random relevant ones if none match
    ).slice(0, 10);
};
