import { combineReducers } from 'redux';

import products from './products';
import carts from './carts';
import swAlert from './swalert';
import order from './order';
import errorMessage from './errorMessage';

export const reducers = combineReducers({ products, carts, swAlert, order, errorMessage });
