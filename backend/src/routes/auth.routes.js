const router = require('express').Router();
const { asyncHandler } = require('../utils/asyncHandler');
const { validateRegister, validateLogin } = require('../middleware/validate');
const { register, login } = require('../controllers/auth.controller');

router.post('/register', validateRegister, asyncHandler(register));
router.post('/login', validateLogin, asyncHandler(login));

module.exports = router;
