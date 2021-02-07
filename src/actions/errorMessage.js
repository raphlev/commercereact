import { SET_ERROR_MESSAGE } from '../constants/actionTypes';

export const setErrorMessage = (message) => (dispatch) => {
  dispatch({ type: SET_ERROR_MESSAGE, payload: message });
};
