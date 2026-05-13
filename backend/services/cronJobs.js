const cron = require('node-cron');
const trendsService = require('./googleTrendsService');

exports.initCronJobs = () => {
    // Morning 6am cron job
    cron.schedule('0 6 * * *', async () => {
        console.log('Running daily Google Trends sync...');
        const trends = await trendsService.getTrendingKeywords();

        // In real app, save to DB
        // for (const trend of trends.slice(0, 10)) {
        //   await prisma.trend.create({ data: trend });
        // }
        console.log(`Synced ${trends.length} trending topics.`);
    });
};
