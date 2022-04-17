import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReviewAction,
} from "../../store/actions/productActions";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCartAction } from "../../store/actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../store/constants/productConstants";

const ProductDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { success: reviewSubmitSuccess, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const addItemsToBagHandler = () => {
    dispatch(addItemsToCartAction(id, quantity));
    alert.success("Item Add To Bag");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (reviewSubmitSuccess) {
      alert.success("Review successfully submitted:)");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, reviewSubmitSuccess]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [quantity, setQuantity] = useState(1);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuantityHandler = () => {
    if (quantity <= 1) return;

    const tempQty = quantity - 1;
    setQuantity(tempQty);
  };

  const increaseQuantityHandler = () => {
    if (product.stock <= quantity) return;

    const tempQty = quantity + 1;
    setQuantity(tempQty);
  };

  const submitReviewToggleHandler = () => {
    isReviewDialogOpen
      ? setIsReviewDialogOpen(false)
      : setIsReviewDialogOpen(true);
  };

  const reviewSubmitHandler = () => {
    const reviewForm = new FormData();

    reviewForm.set("rating", rating);
    reviewForm.set("comment", comment);
    reviewForm.set("productId", match.params.id);
    dispatch(newReviewAction(reviewForm));
    setIsReviewDialogOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- Blink-Buy`} />
          <div className="productDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carousel-image"
                      key={item.url}
                      src={item.url}
                      alt={`${i}-slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1> {`₹${product.price}`} </h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantityHandler}> - </button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantityHandler}> + </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addItemsToBagHandler}
                  >
                    Add to Bag
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "out Of Stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p> {product.description} </p>
              </div>

              <button
                onClick={submitReviewToggleHandler}
                className="submitReview"
              >
                Submit Review
              </button>
            </div>
          </div>

          <div className="reviewsHeading">Reviews</div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={isReviewDialogOpen}
            onClose={submitReviewToggleHandler}
          >
            <DialogTitle> Submit Review </DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggleHandler} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                {" "}
                Submit{" "}
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReview">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
