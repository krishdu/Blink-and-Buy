const Product = require("../models/productModel");
const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");

/**
 * @description controller method to get all products
 * @param  {} req
 * @param  {} res
 * @returns array of products
 */
const getAllProductsAsync = asyncWrapper(async (req, res) => {
  const resultPerPage = 5;
  const totalProductCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    totalProductCount,
    products,
  });
});

/**
 * @description get a single product by Id
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns product model
 */
const getProductDetailsByIdAsync = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);

  if (!product) {
    return next(createCustomError(`No product fond with Id ${productId}`, 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

/**
 * @description controller method to add product - admin access
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns created {sucess : true, produsct}
 */
const createProductAsync = asyncWrapper(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

/**
 * @description controller method to update product by Id - admin access
 * @param  {} res
 * @param  {} res
 * @param  {} next
 * @returns updated product
 */
const updateProductAsync = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);

  if (!product) {
    return next(createCustomError(`No product fond with Id ${productId}`, 404));
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

/**
 * @description controller method to delete a product by id - admin access
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @returns {} { success:true, message: ''}
 */
const deleteProductAsync = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.params;
  let product = await Product.findById(productId);

  if (!product) {
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/**
 * @description create/adjust product reviews
 * @param  {} async(req
 * @param  {} res
 * @param  {} next
 * @returns success: true
 */
const createProductReviewAsync = asyncWrapper(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avgRatings = 0;

  product.reviews.forEach((rev) => {
    avgRatings += rev.rating;
  });

  product.ratings = avgRatings / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getAllProductsAsync,
  getProductDetailsByIdAsync,
  createProductAsync,
  updateProductAsync,
  deleteProductAsync,
  createProductReviewAsync,
};
