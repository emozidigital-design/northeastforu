const express = require('express');
const router = express.Router();
const weatherService = require('../services/weather.service');

/**
 * GET /api/weather/:cityName
 * Returns current weather and 7-day forecast for a city.
 */
router.get('/:cityName', async (req, res, next) => {
    try {
        const { cityName } = req.params;
        const weatherData = await weatherService.getWeather(cityName);
        res.status(200).json({ success: true, data: weatherData });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
