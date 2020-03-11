import {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_BACKDROP,
  HIDE_BACKDROP
} from "../Types/Page";

const initialState = {
  snackbar: undefined,
  backdrop: { count: 0 }
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case SHOW_SNACKBAR:
      return { ...state, snackbar: payload };

    case HIDE_SNACKBAR:
      return { ...state, backdrop: payload };

    case SHOW_BACKDROP:
      return { ...state, backdrop: payload };

    case HIDE_BACKDROP:
      return { ...state, backdrop: payload };

    default:
      return state;
  }
};