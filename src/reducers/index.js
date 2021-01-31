import { combineReducers } from 'redux';

import products from './products';
import carts from './carts';

export const reducers = combineReducers({ products, carts });
