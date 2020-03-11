import {
  getOrdersAPI,
  getOrderAPI,
  addOrderAPI,
  editOrderAPI,
  billOrderAPI
} from '../../Api/Orders';
import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  EDIT_ORDER_FAILURE,
  BILL_ORDER_SUCCESS,
  BILL_ORDER_FAILURE,
  RESET_ADD_ORDER,
  RESET_EDIT_ORDER
} from '../Types/Orders';
import { SHOW_BACKDROP, HIDE_BACKDROP } from '../Types/Page';

export const getOrders = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count } });
  try {
    const { data } = await getOrdersAPI(queries, pagination);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
  catch (err) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
};

export const getOrder = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count } });
  try {
    const { data } = await getOrderAPI(queries, pagination);
    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
  catch (err) {
    dispatch({ type: GET_ORDER_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
};

export const addOrder = (queries) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count } });
  try {
    const { data } = await addOrderAPI(queries);
    dispatch({ type: ADD_ORDER_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
  catch (err) {
    dispatch({ type: ADD_ORDER_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
};

export const editOrder = (queries) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count } });
  try {
    const { data } = await editOrderAPI(queries);
    dispatch({ type: EDIT_ORDER_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
  catch (err) {
    dispatch({ type: EDIT_ORDER_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
};

export const billOrder = (queries) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count } });
  try {
    const { data } = await billOrderAPI(queries);
    dispatch({ type: BILL_ORDER_SUCCESS, payload: data });
    dispatch({ type: BILL_ORDER_SUCCESS, payload: {} });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
  catch (err) {
    dispatch({ type: BILL_ORDER_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count } });
  }
};

export const resetEditOrder = () => (dispatch) => {
  dispatch({ type: RESET_EDIT_ORDER, payload: {} });
}

export const resetAddOrder = () => (dispatch) => {
  dispatch({ type: RESET_ADD_ORDER, payload: {} });
}

export default {
  getOrders,
  editOrder,
  addOrder,
  getOrder,
  billOrder
};