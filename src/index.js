import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SW_INIT, SW_UPDATE } from './constants/actionTypes';

import { reducers } from './reducers';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

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
