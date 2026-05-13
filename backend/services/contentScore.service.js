const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Scores a page from 0-100 based on content quality criteria.
 */
const scoreItem = (item, type) => {
    let score = 0;
    const desc = item.description || item.content || '';
    const wordCount = desc.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount >= 200) score += 20;
    else if (wordCount >= 100) score += 10;

    if (item.seo_title) score += 10;
    if (item.seo_description) score += 10;
    if (item.featured_image || item.image_url) score += 10;

    // Freshness: last verified within 6 months
    const lastVerified = item.last_verified_date || item.updated_at || item.published_at;
    if (lastVerified) {
        const diffDays = (Date.now() - new Date(lastVerified).getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays < 180) score += 15;
        else if (diffDays < 365) score += 7;
    }

    return {
        id: item.id,
        name: item.name || item.title,
        slug: item.slug,
        type,
        score,
        wordCount,
        hasSeoTitle: !!item.seo_title,
        hasSeoDescription: !!item.seo_description,
        hasImage: !!(item.featured_image || item.image_url),
        grade: score >= 90 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work',
    };
};

/**
 * Returns quality scores for all content across site.
 */
exports.getAllScores = async () => {
    const [states, cities, attractions, blogs] = await Promise.all([
        prisma.states.findMany(),
        prisma.cities.findMany(),
        prisma.attractions.findMany(),
        prisma.blog.findMany(),
    ]);

    // Augment with FAQ and tip counts
    const faqCounts = await prisma.faq_items.groupBy({
        by: ['page_slug'],
        where: { is_approved: true },
        _count: true,
    });
    const faqMap = Object.fromEntries(faqCounts.map(r => [r.page_slug, r._count]));

    const tipCounts = await prisma.insider_tips.groupBy({
        by: ['page_slug'],
        where: { is_approved: true },
        _count: true,
    });
    const tipMap = Object.fromEntries(tipCounts.map(r => [r.page_slug, r._count]));

    const addFaqTip = (scored) => {
        const faqCount = faqMap[scored.slug] || 0;
        const tipCount = tipMap[scored.slug] || 0;
        let bonus = 0;
        if (faqCount >= 5) bonus += 20;
        else if (faqCount > 0) bonus += 5;
        if (tipCount >= 3) bonus += 15;
        else if (tipCount > 0) bonus += 7;
        return { ...scored, score: Math.min(100, scored.score + bonus), faqCount, tipCount };
    };

    const allScores = [
        ...states.map(s => addFaqTip(scoreItem(s, 'state'))),
        ...cities.map(c => addFaqTip(scoreItem(c, 'city'))),
        ...attractions.map(a => addFaqTip(scoreItem(a, 'attraction'))),
        ...blogs.map(b => addFaqTip(scoreItem(b, 'blog'))),
    ].sort((a, b) => a.score - b.score);

    const avgScore = Math.round(allScores.reduce((sum, s) => sum + s.score, 0) / (allScores.length || 1));
    const needsWork = allScores.filter(s => s.score < 60);
    const excellent = allScores.filter(s => s.score >= 90);

    return {
        average: avgScore,
        total: allScores.length,
        needsWork: needsWork.length,
        excellent: excellent.length,
        items: allScores,
    };
};
