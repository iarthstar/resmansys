import {
  getItemsAPI,
  getItemAPI,
  addItemAPI,
  editItemAPI,
  deleteItemAPI
} from '../../Api/Items';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAILURE,
  RESET_ADD_ITEM,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  RESET_EDIT_ITEM,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILURE,
  RESET_DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE
} from '../Types/Items';
import { SHOW_BACKDROP, HIDE_BACKDROP } from '../Types/Page';

export const getItems = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await getItemsAPI(queries, pagination);
    dispatch({ type: GET_ITEMS_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_ITEMS_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const getItem = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const res = await getItemAPI(queries, pagination);
    dispatch({ type: GET_ITEM_SUCCESS, payload: res.data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_ITEM_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const addItem = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data: { data: payload } } = await addItemAPI(queries, pagination);
    dispatch({ type: ADD_ITEM_SUCCESS, payload });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: ADD_ITEM_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const editItem = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await editItemAPI(queries, pagination);
    dispatch({ type: EDIT_ITEM_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: EDIT_ITEM_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const deleteItem = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await deleteItemAPI(queries, pagination);
    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: DELETE_ITEM_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const resetAddItem = () => (dispatch) => {
  dispatch({ type: RESET_ADD_ITEM, payload: {} });
};

export const resetEditItem = () => (dispatch) => {
  dispatch({ type: RESET_EDIT_ITEM, payload: {} });
};

export const resetDeleteItem = () => (dispatch) => {
  dispatch({ type: RESET_DELETE_ITEM, payload: {} });
};

export default {
  getItems,
  getItem,
  addItem,
  editItem,
  deleteItem,
  resetAddItem,
  resetEditItem,
  resetDeleteItem
};