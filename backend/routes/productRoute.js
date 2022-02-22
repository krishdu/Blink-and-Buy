const express = require("express");
const {
  getAllProductsAsync,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
  getProductDetailsByIdAsync,
} = require("../controllers/productController");

const {
  isAuthenticated,
  isAuthorizeRoles,
} = require("../middleware/authetication");

const router = express.Router();

router.route("/products").get(getAllProductsAsync);

// Create Product  - Only Admin
router
  .route("/product/new")
  .post(isAuthenticated, isAuthorizeRoles("admin"), createProductAsync);

//update and delete product - Only Admin
router
  .route("/product/:id")
  .get(getProductDetailsByIdAsync)
  .put(isAuthenticated, isAuthorizeRoles("admin"), updateProductAsync)
  .delete(isAuthenticated, isAuthorizeRoles("admin"), deleteProductAsync);

module.exports = router;
