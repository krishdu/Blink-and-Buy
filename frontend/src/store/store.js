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

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPasswordReducer,
});

let initialSate = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialSate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
