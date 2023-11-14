const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
  processPaymentCod,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);
router.route("/payment/cod").post(async (req, res) => {
  try {
    await processPaymentCod(req, res);
  } catch (error) {
    console.error('Error in /payment/cod route:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error.' });
  }
});
module.exports = router;
