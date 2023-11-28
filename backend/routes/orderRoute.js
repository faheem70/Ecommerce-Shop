const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles, isAuthOrOtpLogin } = require("../middleware/auth");

router.route("/order/new").post(isAuthOrOtpLogin, newOrder);

router.route("/order/:id").get(isAuthOrOtpLogin, getSingleOrder);

router.route("/orders/me").get(isAuthOrOtpLogin, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;