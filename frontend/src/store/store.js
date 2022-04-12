import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  ProfileReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
});

let initialSate = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
