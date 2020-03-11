import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_BACKDROP,
  HIDE_BACKDROP
} from '../Types/Page';

export const showLoading = (queries) => (dispatch) => {
  dispatch({ type: SHOW_BACKDROP, payload: queries });
};

export const hideLoading = (queries) => (dispatch) => {
  dispatch({ type: HIDE_BACKDROP, payload: queries });
};

export const showSnackbar = (queries) => (dispatch) => {
  dispatch({ type: SHOW_SNACKBAR, payload: queries });
};

export const hideSnackbar = (queries) => (dispatch) => {
  dispatch({ type: HIDE_SNACKBAR, payload: { ...queries, open: false } });
};

export default {
  showSnackbar,
  hideSnackbar,
  showLoading,
  hideLoading
};