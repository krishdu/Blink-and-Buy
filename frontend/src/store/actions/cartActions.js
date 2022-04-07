import { ADD_TO_CART } from "../constants/cartConstants";
import axios from "axios";

/**
 * @description reducer action to add item to cart
 * @param  {} id
 * @param  {} quantity
 */
export const addItemsToCartAction =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
