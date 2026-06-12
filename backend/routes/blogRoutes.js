const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// NOTE: Blogs are authored in the external Emozi CMS (admin.emozidigital.com).
// These local endpoints are legacy/fallback only. GETs stay public so the
// static fallback keeps working; writes are auth-protected.
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', authMiddleware, blogController.createBlog);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;
