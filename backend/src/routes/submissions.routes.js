const router = require('express').Router();
const { asyncHandler } = require('../utils/asyncHandler');
const { auth } = require('../middleware/auth');
const { validateSubmission } = require('../middleware/validate');
const { makeUploader, addFileLocation } = require('../services/local-storage.service');
const { createSubmission } = require('../controllers/submissions.controller');

const upload = makeUploader();

router.post('/', auth, upload.single('image'), addFileLocation, validateSubmission, asyncHandler(createSubmission));

module.exports = router;
