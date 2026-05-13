const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', activityController.getAllActivities);
router.get('/:slug', activityController.getActivityBySlug);
router.post('/', authMiddleware, activityController.createActivity);
router.put('/:id', authMiddleware, activityController.updateActivity);
router.delete('/:id', authMiddleware, activityController.deleteActivity);

module.exports = router;
