import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../store/actions/productActions";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCartAction } from "../../store/actions/cartActions";

const ProductDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
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

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "rgb(20,20,20,0.1)",
    activeColor: "coral",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  const [quantity, setQuantity] = useState(1);

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
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1> {`₹${product.price}`} </h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantityHandler}> - </button>
                    <input value={quantity} type="number" readOnly />
                    <button onClick={increaseQuantityHandler}> + </button>
                  </div>
                  <button onClick={addItemsToBagHandler}>Add to Bag</button>
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

              <button className="submitReview"> Submit Review </button>
            </div>
          </div>

          <div className="reviewsHeading">Reviews</div>
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
