const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function reset() {
    try {
        await prisma.blog_queue.updateMany({
            where: { status: 'failed' },
            data: { status: 'pending', error_message: null }
        });
        console.log('✅ Reset failed queue items to pending.');
    } catch (err) {
        console.error('❌ Reset failed:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

reset();
