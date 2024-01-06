const express = require('express');
const router = express.Router();
const { otpLogin, otpGetData } = require("../controllers/otpController");
//const { isAuthOrOtpLogin } = require("../middleware/auth");

// Use the middleware function
router.route("/otplogin").post(otpLogin);
router.route('/otplogin/:uid').get(otpGetData);
module.exports = router;