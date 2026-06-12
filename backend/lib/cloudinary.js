// Cloudinary client + helpers for backend-signed uploads.
// All non-blog site images (states, cities, attractions, activities,
// itineraries, media library) are stored here. Configured from env.
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const UPLOAD_FOLDER = process.env.CLOUDINARY_UPLOAD_FOLDER || 'northeastforu';

function isConfigured() {
    return Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
}

// Upload a file buffer to Cloudinary, resolving to { url, public_id }.
function uploadBuffer(buffer, { folder = UPLOAD_FOLDER, filename } = {}) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                ...(filename ? { public_id: filename } : {}),
            },
            (error, result) => {
                if (error) return reject(error);
                resolve({ url: result.secure_url, public_id: result.public_id });
            }
        );
        stream.end(buffer);
    });
}

function destroy(publicId) {
    return cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

module.exports = { cloudinary, uploadBuffer, destroy, isConfigured, UPLOAD_FOLDER };
