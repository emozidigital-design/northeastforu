const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', itineraryController.getAllItineraries);
router.get('/:slug', itineraryController.getItineraryBySlug);
router.post('/', authMiddleware, itineraryController.createItinerary);
router.put('/:id', authMiddleware, itineraryController.updateItinerary);
router.delete('/:id', authMiddleware, itineraryController.deleteItinerary);

module.exports = router;
