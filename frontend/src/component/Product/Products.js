import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { clearErrors, getProducts } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard.js";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import { categories } from "../../utils/productCategory";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    error,
    loading,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);

  const { keyword } = match.params;

  const setCurrentPageNoHandler = (e) => {
    setCurrentPage(e);
  };

  const selectPriceHandler = (event, newPrice) => {
    setPriceFilter(newPrice);
  };

  const setCategoryHandler = (category) => {
    setCategory(category);
  };

  const selectRatingsHandler = (e, newRatings) => {
    setRatings(newRatings);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, priceFilter, category, ratings));
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    priceFilter,
    category,
    ratings,
  ]);

  //let newProductcount = filteredProductCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products -- Blink-Buy" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filtersBlock">
            <Typography> Price </Typography>
            <Slider
              value={priceFilter}
              onChange={selectPriceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={250000}
            />

            <Typography> Categories </Typography>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategoryHandler(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend"> Rating Above </Typography>
              <Slider
                value={ratings}
                onChange={selectRatingsHandler}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductCount && (
            <div className="paginationBlock">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNoHandler}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
