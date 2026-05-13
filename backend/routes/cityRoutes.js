const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', cityController.getAllCities);
router.get('/:slug', cityController.getCityBySlug);
router.post('/', authMiddleware, cityController.createCity);
router.put('/:id', authMiddleware, cityController.updateCity);
router.delete('/:id', authMiddleware, cityController.deleteCity);

module.exports = router;
