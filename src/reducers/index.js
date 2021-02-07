import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import swAlert from './swalert';
import order from './order';
import errorMessage from './errorMessage';

export const reducers = combineReducers({ products, cart, swAlert, order, errorMessage });
