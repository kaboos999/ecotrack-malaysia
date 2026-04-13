const router = require('express').Router();
const { asyncHandler } = require('../utils/asyncHandler');
const { auth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { listUsers, listSubmissions, systemStats, usageSummary } = require('../controllers/admin.controller');

router.get('/users', auth, requireRole('admin'), asyncHandler(listUsers));
router.get('/submissions', auth, requireRole('admin'), asyncHandler(listSubmissions));
router.get('/stats', auth, requireRole('admin'), asyncHandler(systemStats));
router.get('/usage', auth, requireRole('admin'), asyncHandler(usageSummary));

module.exports = router;
