import { SW_SETUP } from '../constants/actionTypes';

export const swInit = () => (dispatch) => {
  dispatch({ type: SW_SETUP,
    payload: {
      serviceWorkerInitialized: false,
      serviceWorkerUpdated: false,
      serviceWorkerRegistration: null,
    } });
};
