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

exports.processPaymentCod = catchAsyncErrors(async (req, res) => {
  try {
    const { amount, productId, shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    // Create a new order
    const newOrder = new Order({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save the order to the database
    await newOrder.save();

    // You can also handle other order-related operations here (e.g., sending confirmation emails, etc.).

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Order placed successfully.' });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ success: false, error: 'Failed to place Cash on Delivery order.' });
  }
});