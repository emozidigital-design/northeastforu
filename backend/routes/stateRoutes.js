const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', stateController.getAllStates);
router.get('/:slug', stateController.getStateBySlug);
router.put('/:id', authMiddleware, stateController.updateState);

module.exports = router;
