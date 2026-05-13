const googleTrends = require('google-trends-api');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SEED_KEYWORDS = [
    'north east india travel',
    'meghalaya tourism',
    'sikkim travel guide',
    'assam tourism',
    'arunachal pradesh travel',
    'nagaland tourism',
    'manipur travel',
    'mizoram tourism',
    'tripura travel'
];

const KEYWORD_BANK = [
    'Best waterfalls in Meghalaya',
    'Kaziranga safari complete guide',
    'Tawang monastery travel guide',
    'Living root bridges how to reach',
    'Shillong cafe culture guide',
    'Best time to visit Sikkim',
    'Ziro Valley festival guide',
    'Dawki river boat experience',
    'Kohima war cemetery history',
    'Gangtok one day itinerary',
    'Mawlynnong cleanest village guide',
    'Loktak lake floating islands',
    'Dzukou valley trek guide',
    'Majuli island satras guide',
    'Aizawl city travel guide',
    'Pasighat adventure travel',
    'Dirang hot springs guide',
    'Nohkalikai falls complete guide',
    'Seven sisters waterfall guide',
    'Unakoti rock carvings guide',
    'North east india budget travel',
    'Solo travel north east india',
    'North east india honeymoon guide',
    'Family trip north east india',
    'North east india photography spots',
    'Hidden waterfalls meghalaya',
    'Offbeat places arunachal pradesh',
    'North east india food guide',
    'Tribal culture nagaland guide',
    'North east india road trip guide'
];

/**
 * Fetches trending topics from Google Trends and saves them to blog_topics table.
 * Falls back to keyword bank if not enough topics are found.
 */
exports.researchTopics = async () => {
    console.log('Starting topic research...');
    let discoveredTopics = [];

    // STEP 1 - FETCH TRENDING TOPICS
    for (const keyword of SEED_KEYWORDS) {
        try {
            const result = await googleTrends.relatedQueries({
                keyword: keyword,
                geo: 'IN',
                startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            });

            const parsed = JSON.parse(result);
            const rising = parsed.default.rankedList[0].rankedKeyword || [];
            const top = parsed.default.rankedList[1].rankedKeyword || [];

            [...rising, ...top].forEach(item => {
                discoveredTopics.push({
                    topic: item.query,
                    trend_score: item.value || 50,
                    source: 'google_trends'
                });
            });
        } catch (error) {
            console.error(`Error fetching trends for ${keyword}:`, error.message);
        }
    }

    // STEP 2 - FILTER AND DEDUPLICATE
    let uniqueTopics = [];
    const seenTopics = new Set();

    for (const t of discoveredTopics) {
        const normalized = t.topic.toLowerCase().trim();
        if (!seenTopics.has(normalized)) {
            // STEP 3 - AVOID DUPLICATES IN BLOGS TABLE
            const exists = await prisma.blog.findFirst({
                where: {
                    title: {
                        contains: normalized,
                        mode: 'insensitive'
                    }
                }
            });

            if (!exists) {
                uniqueTopics.push(t);
                seenTopics.add(normalized);
            }
        }
        if (uniqueTopics.length >= 20) break;
    }

    // STEP 3 - FILL REMAINING TOPICS FROM KEYWORD LIST
    if (uniqueTopics.length < 7) {
        console.log('Not enough trending topics, filling from keyword bank...');
        for (const kw of KEYWORD_BANK) {
            const normalized = kw.toLowerCase().trim();
            if (!seenTopics.has(normalized)) {
                const exists = await prisma.blog.findFirst({
                    where: {
                        title: {
                            contains: normalized,
                            mode: 'insensitive'
                        }
                    }
                });

                if (!exists) {
                    uniqueTopics.push({
                        topic: kw,
                        trend_score: 30,
                        source: 'keyword_bank'
                    });
                    seenTopics.add(normalized);
                }
            }
            if (uniqueTopics.length >= 7) break;
        }
    }

    // SAVE TOPICS TO DB
    const savedTopics = [];
    for (const ut of uniqueTopics) {
        const saved = await prisma.blog_topics.create({
            data: {
                topic: ut.topic,
                trend_score: ut.trend_score,
                source: ut.source,
                is_used: false
            }
        });
        savedTopics.push(saved);
    }

    console.log(`Saved ${savedTopics.length} new topics.`);

    // STEP 4 - SCHEDULE TOPICS FOR THE NEXT 7 DAYS
    await this.scheduleQueue(savedTopics.slice(0, 7));

    return savedTopics;
};

/**
 * Schedules 7 topics into the blog_queue for the coming week at 6am each day.
 */
exports.scheduleQueue = async (topics) => {
    console.log('Scheduling topics into queue...');
    const now = new Date();

    for (let i = 0; i < topics.length; i++) {
        const scheduledDate = new Date();
        scheduledDate.setDate(now.getDate() + (i + 1));
        scheduledDate.setHours(6, 0, 0, 0);

        await prisma.blog_queue.create({
            data: {
                topic_id: topics[i].id,
                title: topics[i].topic,
                status: 'pending',
                scheduled_for: scheduledDate
            }
        });
    }
    console.log(`Scheduled ${topics.length} topics in queue.`);
};
