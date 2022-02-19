const express = require('express');
const { getAllProductsAsync, createProductAsync, updateProductAsync, deleteProductAsync, getProductDetailsByIdAsync} = require('../controllers/productController');
 
const router = express.Router();

router.route('/products')
    .get(getAllProductsAsync);

// Create Product  - Only Admin
router.route('/product/new')    
    .post(createProductAsync);

//update and delete product - Only Admin
router.route('/product/:id')    
    .get(getProductDetailsByIdAsync)
    .put(updateProductAsync)
    .delete(deleteProductAsync);    

module.exports = router;
