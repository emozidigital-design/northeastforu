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
 * Sends a newsletter for a new blog post to all active subscribers.
 */
exports.sendNewBlogNewsletter = async (blog) => {
    console.log(`Sending newsletter for blog: ${blog.title}`);

    const subscribers = await prisma.newsletter.findMany({
        where: { is_active: true }
    });

    if (subscribers.length === 0) {
        console.log('No active subscribers to send to.');
        return;
    }

    let sentCount = 0;
    let failedCount = 0;
    const batchSize = 50;

    // STEP 2 - BUILD EMAIL TEMPLATE (Simplified inline for this phase)
    const getEmailHtml = (subscriber) => {
        const unsubLink = `https://northeastforu.com/unsubscribe?token=${subscriber.unsubscribe_token}`;
        return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #2e7d32;">NorthEastForU</h1>
        </div>
        <img src="${blog.featured_image}" alt="${blog.title}" style="width: 100%; border-radius: 10px;" />
        <h2 style="margin-top: 25px;">${blog.title}</h2>
        <p style="line-height: 1.6; font-size: 16px;">${blog.seo_description || 'Check out our latest travel guide to North East India!'}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://northeastforu.com/blog/${blog.slug}" 
             style="background: #2e7d32; color: white; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: bold;">
             Read Full Article
          </a>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          You are receiving this because you subscribed at northeastforu.com. <br/>
          <a href="${unsubLink}" style="color: #666;">Unsubscribe here</a>
        </p>
      </div>
    `;
    };

    // STEP 3 - SEND IN BATCHES
    for (let i = 0; i < subscribers.length; i += batchSize) {
        const batch = subscribers.slice(i, i + batchSize);

        await Promise.all(batch.map(async (sub) => {
            try {
                if (!sub.unsubscribe_token) {
                    // Generate token if missing
                    const token = Math.random().toString(36).substring(2, 15);
                    await prisma.newsletter.update({ where: { id: sub.id }, data: { unsubscribe_token: token } });
                    sub.unsubscribe_token = token;
                }

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || '"NorthEastForU" <hello@northeastforu.com>',
                    to: sub.email,
                    subject: `New Article: ${blog.title} 🌿`,
                    html: getEmailHtml(sub),
                });
                sentCount++;
            } catch (err) {
                console.error(`Failed to send to ${sub.email}:`, err.message);
                failedCount++;
            }
        }));

        // Rate limiting delay between batches
        if (i + batchSize < subscribers.length) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // STEP 4 - TRACK RESULTS
    await prisma.newsletter_sends.create({
        data: {
            blog_id: blog.id,
            total_subscribers: subscribers.length,
            sent_count: sentCount,
            failed_count: failedCount,
            sent_at: new Date(),
            status: failedCount === 0 ? 'completed' : 'partial'
        }
    });

    console.log(`Newsletter campaign finished. Sent: ${sentCount}, Failed: ${failedCount}`);
};
