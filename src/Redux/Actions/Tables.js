import {
  getTablesAPI,
  getTableAPI,
  addTableAPI,
  editTableAPI,
  deleteTableAPI
} from '../../Api/Tables';
import {
  GET_TABLES_SUCCESS,
  GET_TABLES_FAILURE,
  GET_TABLE_SUCCESS,
  GET_TABLE_FAILURE,
  RESET_ADD_TABLE,
  ADD_TABLE_SUCCESS,
  ADD_TABLE_FAILURE,
  RESET_EDIT_TABLE,
  EDIT_TABLE_SUCCESS,
  EDIT_TABLE_FAILURE,
  RESET_DELETE_TABLE,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE
} from '../Types/Tables';
import { SHOW_BACKDROP, HIDE_BACKDROP } from '../Types/Page';

export const getTables = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await getTablesAPI(queries, pagination);
    dispatch({ type: GET_TABLES_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_TABLES_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const getTable = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const res = await getTableAPI(queries, pagination);
    dispatch({ type: GET_TABLE_SUCCESS, payload: res.data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_TABLE_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const addTable = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data: { data: payload } } = await addTableAPI(queries, pagination);
    dispatch({ type: ADD_TABLE_SUCCESS, payload });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: ADD_TABLE_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const editTable = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await editTableAPI(queries, pagination);
    dispatch({ type: EDIT_TABLE_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: EDIT_TABLE_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const deleteTable = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await deleteTableAPI(queries, pagination);
    dispatch({ type: DELETE_TABLE_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: DELETE_TABLE_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const resetAddTable = () => (dispatch) => {
  dispatch({ type: RESET_ADD_TABLE, payload: {} });
};

export const resetEditTable = () => (dispatch) => {
  dispatch({ type: RESET_EDIT_TABLE, payload: {} });
};

export const resetDeleteTable = () => (dispatch) => {
  dispatch({ type: RESET_DELETE_TABLE, payload: {} });
};

export default {
  getTables,
  getTable,
  addTable,
  editTable,
  deleteTable,
  resetAddTable,
  resetEditTable,
  resetDeleteTable
};