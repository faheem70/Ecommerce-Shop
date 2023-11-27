const express = require('express');
const router = express.Router();
const { otpLogin } = require("../controllers/otpController");
const { isAuthOrOtpLogin } = require("../middleware/auth");

// Use the middleware function
router.route("/otplogin").post(otpLogin);

module.exports = router;