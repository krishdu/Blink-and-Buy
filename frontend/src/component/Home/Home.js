import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "../Product/Product.js";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../store/actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const DUMMY_PRODUCTS = {
  name: "Blue T-Shirt",
  images: [
    {
      url: "https://5.imimg.com/data5/BG/UM/MY-23375112/61-500x500.jpg",
    },
  ],
  price: "$1800",
  _id: "sbfdksb",
};

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="Home Page" />

      <div className="banner">
        <h3>Welcome to Blink&amp;Buy</h3>
        <h1>PRODUCTS ARE WAITING FOR YoU</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading"> Featured Products </h2>

      <div className="container" id="container">
        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />

        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />
        <Product product={DUMMY_PRODUCTS} />
      </div>
    </Fragment>
  );
};

export default Home;
