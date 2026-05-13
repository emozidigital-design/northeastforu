const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends a daily health report summarising the last 24 hours of automation.
 */
exports.generateDailyReport = async () => {
    try {
        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const blogsPublished = await prisma.blog.count({
            where: { created_at: { gte: last24h }, ai_draft: true }
        });

        const shares = await prisma.social_shares.groupBy({
            by: ['platform', 'status'],
            _count: true,
            where: { shared_at: { gte: last24h } }
        });

        const queuesRemaining = await prisma.blog_queue.count({
            where: { status: 'pending' }
        });

        const reportHtml = `
            <h2>NorthEastForU Daily Automation Report</h2>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <ul>
                <li><strong>Blogs Published:</strong> ${blogsPublished}</li>
                <li><strong>Remaining in Queue:</strong> ${queuesRemaining}</li>
                <li><strong>Social Activity:</strong> ${JSON.stringify(shares)}</li>
            </ul>
            <p>Check the admin dashboard for full details.</p>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"Automation Monitor" <hello@northeastforu-platform.com>',
            to: process.env.ADMIN_EMAIL,
            subject: `NorthEastForU Daily Report - ${new Date().toLocaleDateString()}`,
            html: reportHtml
        });

        console.log('Daily report sent successfully.');
    } catch (error) {
        console.error('Failed to generate daily report:', error.message);
    }
};

/**
 * Sends an immediate alert to the admin when a critical failure occurs.
 */
exports.sendImmediateAlert = async (type, message) => {
    try {
        await transporter.sendMail({
            from: '"CRITICAL ALERT" <hello@northeastforu-platform.com>',
            to: process.env.ADMIN_EMAIL,
            subject: `⚠️ Automation Alert: ${type}`,
            text: `A critical error occurred in the NorthEastForU automation system:\n\n${message}\n\nPlease check the server logs immediately.`
        });
        console.log('Failure alert sent to admin.');
    } catch (error) {
        console.error('Failed to send failure alert:', error.message);
    }
};
