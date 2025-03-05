import { PRODUCT_LIST ,PRODUCT_LIST_HOMEPAGE, } from "./constant";

export const productList = () => {
  return {
    type: PRODUCT_LIST,
  };
};

export const productListHome = () => {
  return {
    type: PRODUCT_LIST_HOMEPAGE,
  };
};



export const productSearch = (query) => {
  return {
    type: 'PRODUCT_SEARCH',
    payload: query,
  };
};



