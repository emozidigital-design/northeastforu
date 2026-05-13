const axios = require('axios');
const sharp = require('sharp');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

/**
 * Generates and uploads a featured image for a blog post.
 */
exports.generateFeaturedImage = async (blogId, keyword) => {
    console.log(`Generating image for blog ${blogId} with keyword: ${keyword}`);

    try {
        // STEP 1 - FETCH FROM UNSPLASH
        let imageUrl = await exports.getUnsplashImage(keyword);

        if (!imageUrl) {
            console.log('Unsplash failed, trying fallback...');
            imageUrl = 'https://images.unsplash.com/photo-1582650007812-7f7220088cb0?q=80&w=2070'; // Placeholder
        }

        // STEP 2 - DOWNLOAD AND PROCESS
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        const optimizedBuffer = await sharp(buffer)
            .resize(1200, 630, { fit: 'cover' })
            .webp({ quality: 85 })
            .toBuffer();

        // STEP 3 - UPLOAD TO R2
        const fileName = `blogs/featured-${blogId}-${Date.now()}.webp`;
        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
            Body: optimizedBuffer,
            ContentType: 'image/webp',
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

        // STEP 4 - UPDATE BLOG AND MEDIA TABLE
        await prisma.blog.update({
            where: { id: blogId },
            data: { featured_image: publicUrl }
        });

        await prisma.media.create({
            data: {
                file_name: fileName,
                file_url: publicUrl,
                alt_text: `${keyword} - NorthEastForU Travel Guide`,
                uploaded_by: 'Automation Service'
            }
        });

        console.log(`Image generated and uploaded: ${publicUrl}`);
        return publicUrl;

    } catch (error) {
        console.error('Error in image generator service:', error);
        return null;
    }
};

/**
 * Search Unsplash API for a relevant image.
 */
exports.getUnsplashImage = async (keyword) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: `${keyword} north east india`,
                orientation: 'landscape',
                per_page: 1,
                client_id: process.env.UNSPLASH_ACCESS_KEY
            }
        });

        if (response.data.results.length > 0) {
            return response.data.results[0].urls.regular;
        }
        return null;
    } catch (error) {
        console.error('Unsplash API Error:', error.message);
        return null;
    }
};
