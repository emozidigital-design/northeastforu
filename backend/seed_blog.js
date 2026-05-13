const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    try {
        const topic = await prisma.blog_topics.create({
            data: {
                topic: "The Ultimate Guide to Exploring Meghalaya",
                keyword: "Meghalaya travel guide",
                source: "manual",
                trend_score: 95
            }
        });

        await prisma.blog_queue.create({
            data: {
                topic_id: topic.id,
                title: topic.topic,
                status: 'pending',
                scheduled_for: new Date()
            }
        });

        console.log('✅ Seeded test topic and queue item.');
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
