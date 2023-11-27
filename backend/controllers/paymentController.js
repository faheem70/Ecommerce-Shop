const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel');
const Purchase = require('../models/purchaseModel'); // Import your Purchase model
const Order = require("../models/orderModel");
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  const { amount, productId } = req.body;

  // Create a payment intent
  const myPayment = await stripe.paymentIntents.create({
    amount,
    currency: "inr",
    metadata: {
      company: "ARF MART",
    },
  });

  // Assuming req.user contains information about the logged-in user
  const userId = req.user._id;

  // Store the purchase information
  await Purchase.create({
    user: userId,
    product: productId,
    amount,
  });

  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

exports.processPaymentCod = catchAsyncErrors(async (req, res, next) => {
  const { amount, productId } = req.body;
  const userId = req.user._id;
  await Purchase.create({
    user: userId,
    product: productId,
    amount,
  });
});