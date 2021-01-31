/* eslint-disable no-console */
import { commerce } from '../lib/commerce';

import { FETCH_CART, ADD_TO_CART, UPDATE_CART_QTY, REMOVE_FROM_CART, EMPTY_CART } from '../constants/actionTypes';

export const fetchCart = () => async (dispatch) => {
  try {
    const { data } = await commerce.cart.retrieve();

    dispatch({ type: FETCH_CART, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleAddToCart = (productId, quantity) => async (dispatch) => {
  try {
    // we can destructure it directly to { cart }:
    const { cart } = await commerce.cart.add(productId, quantity);
    dispatch({ type: ADD_TO_CART, payload: cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleUpdateCartQty = (lineItemId, quantity) => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.update(lineItemId, { quantity });
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: UPDATE_CART_QTY, payload: cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleRemoveFromCart = (lineItemId) => async (dispatch) => {
  try {
    const { cart } = await commerce.cart.remove(lineItemId);
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: REMOVE_FROM_CART, payload: cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleEmptyCart = () => async (dispatch) => {
  try {
    const { cart } = commerce.cart.empty();
    // we can destructure it directly to { cart } or keep it like this:
    dispatch({ type: EMPTY_CART, payload: cart });
  } catch (error) {
    console.log(error.message);
  }
};
