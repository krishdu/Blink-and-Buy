const express = require("express");
const router = express.Router();

const {
  isAuthenticated,
  isAuthorizeRoles,
} = require("../middleware/authetication");

const {
  createNewOrderAsync,
  getOrderDetailsAsync,
  getMyOrdersAsync,
  getAllOrdersAsync,
  updateOrderStatusAsync,
  deleteOrderAsync,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticated, createNewOrderAsync);

router.route("/order/:id").get(isAuthenticated, getOrderDetailsAsync);

router.route("/orders/me").get(isAuthenticated, getMyOrdersAsync);

router
  .route("/admin/orders")
  .get(isAuthenticated, isAuthorizeRoles("admin"), getAllOrdersAsync);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateOrderStatusAsync)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteOrderAsync);

module.exports = router;
