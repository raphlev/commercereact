import { FETCH_PRODUCTS } from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload;
    default:
      return products;
  }
};
