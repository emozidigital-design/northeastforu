const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', leadController.createLead);
router.get('/', authMiddleware, leadController.getAllLeads);
router.get('/export', authMiddleware, leadController.exportLeads);
router.put('/:id/status', authMiddleware, leadController.updateLeadStatus);
router.put('/:id', authMiddleware, leadController.updateLead);
router.delete('/:id', authMiddleware, leadController.deleteLead);

module.exports = router;
