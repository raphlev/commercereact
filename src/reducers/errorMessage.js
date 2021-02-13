import { SET_ERROR_MESSAGE } from '../constants/actionTypes';

export default (errorMessage = '', action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.payload;
    default:
      return errorMessage;
  }
};
