import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_CLEAR_ERROR,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        isAutheticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        isAutheticated: true,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        isAutheticated: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
