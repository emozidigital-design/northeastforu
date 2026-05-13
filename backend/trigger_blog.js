const blogWriter = require('./services/blogWriter.service');
require('dotenv').config();

async function trigger() {
    console.log('🚀 Manually triggering blog writing process...');
    try {
        const blog = await blogWriter.writeDailyBlog();
        if (blog) {
            console.log('✅ Blog generated successfully:', blog.title);
            console.log('🔗 Slug:', blog.slug);
        } else {
            console.log('ℹ️ No pending topics found in queue.');
        }
    } catch (err) {
        console.error('❌ Blog generation failed:', err.message);
    }
}

trigger();
