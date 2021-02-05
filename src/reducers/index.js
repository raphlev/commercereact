import { combineReducers } from 'redux';

import products from './products';
import carts from './carts';
import swAlert from './swalert';

export const reducers = combineReducers({ products, carts, swAlert });
