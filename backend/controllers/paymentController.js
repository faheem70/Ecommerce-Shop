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
  try {
    const { shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const userId = req.user ? req.user._id : null;
    // Create a new order
    console.log(shippingInfo);
    const newOrder = new Purchase({
      shippingInfo,
      orderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo: {
        status: 'Cash On Delivery',
        id: 'COD-' + Date.now(), // Generate a unique identifier for COD payments
      },
      user: userId, // Assuming you have user information in the request
      paidAt: new Date(),
    });

    // Save the order to the database
    await newOrder.save();


    // You can also handle other order-related operations here (e.g., sending confirmation emails, etc.).

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Order placed successfully.' });
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing COD payment:', error);

    // Handle errors and send an error response
    res.status(500).json({ success: false, error: 'Failed to place Cash on Delivery order.' });
  }
});
