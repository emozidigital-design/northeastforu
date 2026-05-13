const googleTrends = require('google-trends-api');

exports.getTrendingKeywords = async () => {
    try {
        const results = await googleTrends.dailyTrends({
            geo: 'IN',
            trendDate: new Date(),
        });

        const parsed = JSON.parse(results);
        const dayResults = parsed.default.trendingSearchesDays[0].trendingSearches;

        // Filter for North East India related keywords if possible, or just return top results
        return dayResults.map(item => ({
            keyword: item.title.query,
            score: parseInt(item.formattedTraffic.replace(/[^0-9]/g, '')) || 0,
            category: 'Travel'
        }));
    } catch (error) {
        console.error('Google Trends Error:', error);
        return [];
    }
};
