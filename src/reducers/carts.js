import { FETCH_CART, ADD_TO_CART, UPDATE_CART_QTY, REMOVE_FROM_CART, EMPTY_CART, REFRESH_CART } from '../constants/actionTypes';

export default (carts = {}, action) => {
  switch (action.type) {
    // case LIKE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    // case CREATE:
    //   return [...posts, action.payload];
    // case UPDATE:
    //   return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    // case DELETE:
    //   return posts.filter((post) => post._id !== action.payload);
    // default:
    //   return posts;
    case FETCH_CART:
      return action.payload;
    case ADD_TO_CART:
      return action.payload;
    case UPDATE_CART_QTY:
      return action.payload;
    case REMOVE_FROM_CART:
      return action.payload;
    case EMPTY_CART:
      return action.payload;
    case REFRESH_CART:
      return action.payload;
    default:
      return carts;
  }
};
