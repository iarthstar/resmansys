import {
  GET_ORDERS_SUCCESS,
  GET_ORDER_SUCCESS,
  ADD_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  BILL_ORDER_SUCCESS,
  RESET_ADD_ORDER,
  RESET_EDIT_ORDER
} from "../Types/Orders";

const initialState = {
  ordersResp: {},
  orderResp: {},
  addOrderResp: {},
  editOrderResp: {},
  billOrderResp: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_ORDERS_SUCCESS:
      return { ...state, ordersResp: payload };

    case GET_ORDER_SUCCESS:
      return { ...state, orderResp: payload };

    case EDIT_ORDER_SUCCESS:
      return { ...state, editOrderResp: payload };

    case RESET_EDIT_ORDER:
      return { ...state, editOrderResp: payload };

    case BILL_ORDER_SUCCESS:
      return { ...state, billOrderResp: payload };

    case ADD_ORDER_SUCCESS:
      return { ...state, addOrderResp: payload };

    case RESET_ADD_ORDER:
      return { ...state, addOrderResp: payload };

    default:
      return state;
  }
};