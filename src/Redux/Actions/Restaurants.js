import {
  getRestaurantsAPI,
  getRestaurantAPI,
  addRestaurantAPI,
  editRestaurantAPI,
  deleteRestaurantAPI
} from '../../Api/Restaurants';
import {
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_FAILURE,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  EDIT_RESTAURANT_SUCCESS,
  EDIT_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  RESET_ADD_RESTAURANT,
  RESET_EDIT_RESTAURANT,
  RESET_DELETE_RESTAURANT
} from '../Types/Restaurants';
import { SHOW_BACKDROP, HIDE_BACKDROP } from '../Types/Page';

export const getRestaurants = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await getRestaurantsAPI(queries, pagination);
    dispatch({ type: GET_RESTAURANTS_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_RESTAURANTS_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const getRestaurant = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const res = await getRestaurantAPI(queries, pagination);
    dispatch({ type: GET_RESTAURANT_SUCCESS, payload: res.data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: GET_RESTAURANT_FAILURE, payload: err, error: true });
  }
};

export const addRestaurant = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data: { data: payload } } = await addRestaurantAPI(queries, pagination);
    dispatch({ type: ADD_RESTAURANT_SUCCESS, payload });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: ADD_RESTAURANT_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const editRestaurant = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await editRestaurantAPI(queries, pagination);
    dispatch({ type: EDIT_RESTAURANT_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: EDIT_RESTAURANT_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const deleteRestaurant = (queries, pagination) => async (dispatch, getState) => {
  dispatch({ type: SHOW_BACKDROP, payload: { count: ++getState().page.backdrop.count }});
  try {
    const { data } = await deleteRestaurantAPI(queries, pagination);
    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: data });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
  catch (err) {
    dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: err, error: true });
    dispatch({ type: HIDE_BACKDROP, payload: { count: --getState().page.backdrop.count }});
  }
};

export const resetAddRestaurant = () => (dispatch) => {
  dispatch({ type: RESET_ADD_RESTAURANT, payload: {} });
};

export const resetEditRestaurant = () => (dispatch) => {
  dispatch({ type: RESET_EDIT_RESTAURANT, payload: {} });
};

export const resetDeleteRestaurant = () => (dispatch) => {
  dispatch({ type: RESET_DELETE_RESTAURANT, payload: {} });
};

export default {
  getRestaurants,
  getRestaurant,
  addRestaurant,
  editRestaurant,
  deleteRestaurant,
  resetAddRestaurant,
  resetEditRestaurant,
  resetDeleteRestaurant
};