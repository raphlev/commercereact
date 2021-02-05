import { SW_SETUP, SW_INIT, SW_UPDATE } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SW_INIT:
      return {
        ...state,
        serviceWorkerInitialized: !state.serviceWorkerInitialized,
      };
    case SW_UPDATE:
      return {
        ...state,
        serviceWorkerUpdated: !state.serviceWorkerUpdated,
        serviceWorkerRegistration: action.payload,
      };
    case SW_SETUP:
      return {
        serviceWorkerInitialized: action.payload.serviceWorkerInitialized,
        serviceWorkerUpdated: action.payload.serviceWorkerUpdated,
        serviceWorkerRegistration: action.payload.serviceWorkerRegistration,
      };
    default:
      return state;
  }
};
