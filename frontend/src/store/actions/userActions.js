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
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
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
      `/api/v1/login`,
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
      `/api/v1/register`,
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

    const { data } = await axios.get(`/api/v1/me`);

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
    await axios.get(`/api/v1/logout`);
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
      "/api/v1/me/update",
      userData,
      headerConfig
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description reducer action to update password
 * @param  {} object : passwords (old password, new password)
 */
export const updatePasswordAction = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      passwords,
      headerConfig
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description reducer action for forgot password
 * @param  {} email
 */
export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/password/forgot`,
      email,
      headerConfig
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description reducer action for reset password
 * @param  {} passwords
 */
export const resetPasswordAction = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const headerConfig = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      headerConfig
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description get all users action --admin
 * @returns users list
 */
export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

/**
 * @description get user details action --admin
 * @param  {} userID
 */
export const getUserDetailsAction = (userID) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${userID}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

/**
 * @description update user action --admin
 * @param  {} id
 * @param  {} userData
 */
export const updateUserAction = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description delete user action --admin
 * @param  {} id
 */
export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearning errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
