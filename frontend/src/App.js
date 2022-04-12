import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginRegister from "./component/User/LoginRegister";
import store from "./store/store";
import { loadUserAction } from "./store/actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";

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
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/login" component={LoginRegister} />
      <Route exact path="/cart" component={Cart} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <Footer />
    </Router>
  );
}

export default App;
