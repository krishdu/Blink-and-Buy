import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginRegister from "./component/User/LoginRegister";
import store from "./store/store";
import { loadUserAction } from "./store/actions/userActions";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanks"],
      },
    });

    store.dispatch(loadUserAction());
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginRegister} />
      <Footer />
    </Router>
  );
}

export default App;
