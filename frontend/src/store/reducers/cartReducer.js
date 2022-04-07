import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const isItemInBag = state.cartItems.find(
        (i) => i.product === newItem.product
      );
      if (isItemInBag) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === newItem.product ? newItem : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    default:
      return state;
  }
};
