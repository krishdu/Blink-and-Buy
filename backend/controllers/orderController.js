const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

/**
 * create new order
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const createNewOrderAsync = asyncWrapper(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

/**
 * @description get a single order details by id
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getOrderDetailsAsync = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      createCustomError(`no order found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

/**
 * @description get all orders of logged-in user
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getMyOrdersAsync = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

/**
 * @description get all orders --admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getAllOrdersAsync = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

/**
 * @description update order status --admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const updateOrderStatusAsync = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      createCustomError(`no order found with id ${req.params.id}`, 404)
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(
      createCustomError("You have already delivered this order", 400)
    );
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

/**
 * @description delete order by id --admin
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const deleteOrderAsync = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      createCustomError(`no order found with id ${req.params.id}`, 404)
    );
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

/**
 * @description helper method to update stock quantity
 * @param  {} productId
 * @param  {} quantity
 */
const updateStock = async (productId, quantity) => {
  const product = await Product.findById(productId);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
};

module.exports = {
  createNewOrderAsync,
  getOrderDetailsAsync,
  getMyOrdersAsync,
  getAllOrdersAsync,
  updateOrderStatusAsync,
  deleteOrderAsync,
};
