const express = require('express');
const router = express.Router();
const searchService = require('../services/searchService');
const searchController = require('../controllers/searchController');

router.get('/', searchController.search);

module.exports = router;
