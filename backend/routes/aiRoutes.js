const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate-meta', authMiddleware, aiController.generateMeta);
router.post('/generate-blog', authMiddleware, aiController.generateBlog);

module.exports = router;
