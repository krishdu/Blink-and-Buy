const Product = require("../models/productModel");
const { createCustomError } = require("../utils/errorHandler");
const asyncWrapper = require("../middleware/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

/**
 * @description controller method to get all products
 * @param  {} req
 * @param  {} res
 * @returns array of products
 */
const getAllProductsAsync = asyncWrapper(async (req, res) => {
  const resultPerPage = 8;
  const totalProductCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    totalProductCount,
    resultPerPage,
    filteredProductCount,
    products,
  });
});

/**
 * @description controller method to get all products for admin
 * @param  {} req
 * @param  {} res
 * @returns array of products
 */
const getAdminProductsAsync = asyncWrapper(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
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
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
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
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
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
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
  }

  //images config
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    //delete images from cloud
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  //delete images from cloud
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

/**
 * @description create/adjust product reviews
 * @param  {} req
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

/**
 * @description get all reviews of a product
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const getProductReviewsAsync = asyncWrapper(async (req, res, next) => {
  const { id: productId } = req.query;
  let product = await Product.findById(productId);

  if (!product) {
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

/**
 * @description delete product review, re-calculate ratings
 * @param  {} async(req
 * @param  {} res
 * @param  {} next
 */
const deleteReviewsAsync = asyncWrapper(async (req, res, next) => {
  const { reviewId, productId } = req.query;
  let product = await Product.findById(productId);

  if (!product) {
    return next(
      createCustomError(`No product found with Id ${productId}`, 404)
    );
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== reviewId.toString()
  );

  let avgRatings = 0;

  reviews.forEach((rev) => {
    avgRatings += rev.rating;
  });

  const numOfReviews = reviews.length;
  const ratings = avgRatings / numOfReviews;
  await Product.findByIdAndUpdate(
    productId,
    {
      ratings,
      reviews,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

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
  getProductReviewsAsync,
  deleteReviewsAsync,
  getAdminProductsAsync,
};
