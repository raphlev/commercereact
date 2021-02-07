import { CAPTURE_CHECKOUT } from '../constants/actionTypes';

export default (order = {}, action) => {
  switch (action.type) {
    case CAPTURE_CHECKOUT:
      return action.payload;
    default:
      return order;
  }
};
