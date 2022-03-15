import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { clearErrors, getProducts } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { products, error, loading, productsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = match.params;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
