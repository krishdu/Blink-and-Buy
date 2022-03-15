import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../constants/productConstants";

/**
 * @description getProduct action
 * @param  {} dispatch
 * @returns async function handler
 */
export const getProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let generatedLink = `/api/v1/products?keyword=${keyword}`;

      const { data } = await axios.get(generatedLink);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

/**
 * @description get product details action
 * @param {} id
 * @param  {} dispatch
 * @returns async function handler
 */
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description clear all error
 * @param  {} dispatch
 */
export const clearErrors = async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
