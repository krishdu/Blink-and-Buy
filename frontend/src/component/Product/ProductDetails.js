import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../store/actions/productActions";

const ProductDetails = ({ match }) => {
  const { id } = match.params.id;
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      <div className="productDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img key={item.url} src={item.url} alt={`${i}-slide`} />
              ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
