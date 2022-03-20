import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_CLEAR_ERROR,
} from "../constants/userConstants";

import axios from "axios";

/**
 * @description reducer action to login user
 * @param  {} email
 * @param  {} password
 */
export const loginUserAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `api/v1/login`,
      { email, password },
      headerConfig
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//clearning errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: LOGIN_CLEAR_ERROR });
};
