/* eslint-disable no-console */
import { commerce } from '../lib/commerce';

import { FETCH_CART, ADD_TO_CART, UPDATE_CART_QTY, REMOVE_FROM_CART, EMPTY_CART, REFRESH_CART } from '../constants/actionTypes';

export const fetchCart = () => async (dispatch) => {
  try {
    const cart = await commerce.cart.retrieve();

    dispatch({ type: FETCH_CART, payload: cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleAddToCart = (productId, quantity) => async (dispatch) => {
  try {
    // we can destructure it directly to { cart }:
    const item = await commerce.cart.add(productId, quantity);
    dispatch({ type: ADD_TO_CART, payload: item.cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleUpdateCartQty = (lineItemId, quantity) => async (dispatch) => {
  try {
    const response = await commerce.cart.update(lineItemId, { quantity });
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: UPDATE_CART_QTY, payload: response.cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleRemoveFromCart = (lineItemId) => async (dispatch) => {
  try {
    const response = await commerce.cart.remove(lineItemId);
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: REMOVE_FROM_CART, payload: response.cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleEmptyCart = () => async (dispatch) => {
  try {
    const response = await commerce.cart.empty();
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: EMPTY_CART, payload: response.cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const refreshCart = () => async (dispatch) => {
  const newCart = await commerce.cart.refresh();

  dispatch({ type: REFRESH_CART, payload: newCart });
};
