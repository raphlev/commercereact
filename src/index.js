import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware/* , compose */ } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SW_INIT, SW_UPDATE } from './constants/actionTypes';

import { reducers } from './reducers';
import App from './App';

// add redux extension with composeEnhancers instead of compose
// https://stackoverflow.com/questions/50385592/how-to-apply-redux-developer-tools-with-reduxthunk
// https://github.com/zalmoxisus/redux-devtools-extension
// 2 methods, either with window variable (commented below) or using redux-devtools-extension (implementred here below)
// For prod, see github extension documentation

// const cartItemsInLocalStorage = localStorage.getItem('react05Cart')
//   ? JSON.parse(localStorage.getItem('react05Cart'))
//   : [];

// const INITIAL_STATE = {
//   cart: cartItemsInLocalStorage,
// };

// eslint-disable-next-line no-underscore-dangle
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* INITIAL_STATE, */ /* preloadedState, */ composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: () => store.dispatch({ type: SW_INIT }),
  onUpdate: (registration) => store.dispatch({ type: SW_UPDATE, payload: registration }),
});
