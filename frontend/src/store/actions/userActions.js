import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERROR,
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

/**
 * @description reducer action to register user
 * @param  {} object : userData
 */
export const registerUserAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `api/v1/register`,
      userData,
      headerConfig
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description reducer action to load user
 */
export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

/**
 * @description reducer action to logout user
 */
export const logoutAction = () => async (dispatch) => {
  try {
    await axios.get(`api/v1/logout`);
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

/**
 * @description reducer action to update user profile
 * @param  {} object : userData
 */
export const updateProfileAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `api/v1/me/update`,
      userData,
      headerConfig
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearning errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
