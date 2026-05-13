const express = require('express');
const router = express.Router();

const stateRoutes = require('./stateRoutes');
const cityRoutes = require('./cityRoutes');
const attractionRoutes = require('./attractionRoutes');
const activityRoutes = require('./activityRoutes');
const blogRoutes = require('./blogRoutes');
const leadRoutes = require('./leadRoutes');
const authRoutes = require('./authRoutes');
const aiRoutes = require('./aiRoutes');
const adminRoutes = require('./adminRoutes');
const searchRoutes = require('./searchRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const reviewRoutes = require('./reviewRoutes');
const weatherRoutes = require('./weatherRoutes');
const faqRoutes = require('./faqRoutes');
const contentRoutes = require('./contentRoutes');
const itineraryRoutes = require('./itineraryRoutes');

router.use('/states', stateRoutes);
router.use('/cities', cityRoutes);
router.use('/attractions', attractionRoutes);
router.use('/activities', activityRoutes);
router.use('/blogs', blogRoutes);
router.use('/leads', leadRoutes);
router.use('/auth', authRoutes);
router.use('/ai', aiRoutes);
router.use('/search', searchRoutes);
router.use('/admin', adminRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/reviews', reviewRoutes);
router.use('/weather', weatherRoutes);
router.use('/faq', faqRoutes);
router.use('/content', contentRoutes);
router.use('/itineraries', itineraryRoutes);

module.exports = router;
