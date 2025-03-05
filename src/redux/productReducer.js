import { SET_PRODUCT_LIST, SET_PRODUCT_LIST_HOME } from "./constant";

export const productData = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return action.payload;
    case SET_PRODUCT_LIST_HOME:
      return action.payload;
    default:
      return state;
  }
};
