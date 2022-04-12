import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHOPPING_INOFRMATION,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
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

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case SAVE_SHOPPING_INOFRMATION:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
