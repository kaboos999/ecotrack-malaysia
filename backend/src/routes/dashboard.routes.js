const router = require('express').Router();
const { asyncHandler } = require('../utils/asyncHandler');
const { auth } = require('../middleware/auth');
const { getMyDashboard } = require('../controllers/dashboard.controller');

router.get('/me', auth, asyncHandler(getMyDashboard));

module.exports = router;
