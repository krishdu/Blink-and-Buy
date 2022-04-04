import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginRegister from "./component/User/LoginRegister";
import store from "./store/store";
import { loadUserAction } from "./store/actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";

function App() {
  const { user, isAutheticated } = useSelector((state) => state.user);

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
      {isAutheticated && <UserOptions user={user} />}

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />

      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/updateprofile" component={UpdateProfile} />

      <ProtectedRoute exact path="/updatePassword" component={UpdatePassword} />

      <Route exact path="/forgotpassword" component={ForgotPassword} />

      <Route exact path="/login" component={LoginRegister} />
      <Footer />
    </Router>
  );
}

export default App;
