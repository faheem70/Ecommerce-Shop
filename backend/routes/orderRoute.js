const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOrderDetails,
  loadCartItem,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const isAuthenticatedOrOtpLogin = (req, res, next) => {
  // Check if the user is authenticated using either method
  if (req.isAuthenticatedUser || req.isAuthOrOtpLogin) {
    // If authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // If not authenticated, return an error or redirect to a login page
    console.log("error");
    res.status(401).send('Unauthorized');
  }
};

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);




module.exports = router;
