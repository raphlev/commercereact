import { commerce } from '../lib/commerce';

import { CAPTURE_CHECKOUT } from '../constants/actionTypes';
import { refreshCart } from './carts';
import { setErrorMessage } from './errorMessage';

export const handleCaptureCheckout = (checkoutTokenId, newOrder) => async (dispatch) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

    dispatch({ type: CAPTURE_CHECKOUT, payload: incomingOrder });

    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message);
  }
};
