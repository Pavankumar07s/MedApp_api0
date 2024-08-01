const express = require('express');
const { requestPasswordReset, resetPassword } = require('../controllers/passwordResetController');
const router = express.Router();

router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
