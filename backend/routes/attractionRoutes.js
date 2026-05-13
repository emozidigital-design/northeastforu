const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', attractionController.getAllAttractions);
router.get('/:slug', attractionController.getAttractionBySlug);
router.post('/', authMiddleware, attractionController.createAttraction);
router.put('/:id', authMiddleware, attractionController.updateAttraction);
router.delete('/:id', authMiddleware, attractionController.deleteAttraction);

module.exports = router;
