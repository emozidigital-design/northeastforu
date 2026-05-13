const aiService = require('../services/aiService');

exports.generateMeta = async (req, res, next) => {
    try {
        const { page_type, title, description, location, id } = req.body;

        // In real app, you would validate inputs
        const meta = await aiService.generateMeta({ page_type, title, description, location });

        // Auto-update database (Mock update for now)
        // await prisma[page_type].update({
        //   where: { id },
        //   data: {
        //     seo_title: meta.seo_title,
        //     seo_description: meta.seo_description,
        //     faq_data: meta.faqs
        //   }
        // });

        res.status(200).json({ success: true, data: meta });
    } catch (error) {
        next(error);
    }
};

exports.generateBlog = async (req, res, next) => {
    try {
        const { topic, location, word_count } = req.body;

        const draftContent = await aiService.generateBlogDraft({ topic, location, word_count });

        // Save as draft (Mock save)
        // const blog = await prisma.blog.create({
        //   data: {
        //     title: topic,
        //     slug: topic.toLowerCase().replace(/ /g, '-'),
        //     content: draftContent,
        //     ai_draft: true
        //   }
        // });

        res.status(200).json({ success: true, data: { draft_content: draftContent } });
    } catch (error) {
        next(error);
    }
};
