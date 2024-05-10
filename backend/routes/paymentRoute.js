const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  processPaymentCod,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { otpLogin } = require("../controllers/otpController");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
router.route("/payment/cod").post(otpLogin, processPaymentCod);
module.exports = router;
