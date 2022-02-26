const express = require("express");
const {
  getAllProductsAsync,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
  getProductDetailsByIdAsync,
  createProductReviewAsync,
  getProductReviewsAsync,
  deleteReviewsAsync,
} = require("../controllers/productController");

const {
  isAuthenticated,
  isAuthorizeRoles,
} = require("../middleware/authetication");

const router = express.Router();

router.route("/products").get(getAllProductsAsync);

// Create Product  - Only Admin
router
  .route("/admin/product/new")
  .post(isAuthenticated, isAuthorizeRoles("admin"), createProductAsync);

//update and delete product - Only Admin
router
  .route("/admin/product/:id")
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateProductAsync)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteProductAsync);

router.route("/product/:id").get(getProductDetailsByIdAsync);

router.route("/review").put(isAuthenticated, createProductReviewAsync);

router
  .route("/reviews")
  .get(getProductReviewsAsync)
  .delete(isAuthenticated, deleteReviewsAsync);

module.exports = router;
