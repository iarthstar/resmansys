import axios from 'axios'
import { API, HOST, ORIGIN, SERVICE, BACKEND_ENDPOINTS } from '../Config';
import { version } from '../../package.json';

let headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'X-UA-Source': ORIGIN,
  'X-UA-Version': version
};

// if (process.browser && getCookie('token')) {
//   headers['authorization'] = JSON.parse(getCookie('token')).authToken;
// }

let restaurantsAPI = axios.create({
  baseURL: HOST + API + SERVICE,
  headers: headers
});

restaurantsAPI.interceptors.request.use(request => {
  if (process.env.NODE_ENV === "production") return request;

  console.log('-----------------');
  console.log('Starting Request', request.baseURL + request.url);
  console.log(request.params);
  console.log(request.query);
  console.log('-----------------');
  return request;
});

export const getRestaurantsAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return restaurantsAPI.get(BACKEND_ENDPOINTS.RESTAURANTS, config);
};

export const getRestaurantAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return restaurantsAPI.get(BACKEND_ENDPOINTS.RESTAURANT, config);
};

export const addRestaurantAPI = (queries = {}, pagination = {}) => {
  const data = { ...queries, ...pagination };
  return restaurantsAPI.post(BACKEND_ENDPOINTS.RESTAURANT, data);
};

export const editRestaurantAPI = (queries = {}, pagination = {}) => {
  const id = queries.restaurant_id;
  delete queries.restaurant_id;
  
  const data = { ...queries, ...pagination };
  return restaurantsAPI.put(`${BACKEND_ENDPOINTS.RESTAURANT}/${id}`, data);
};

export const deleteRestaurantAPI = (queries = {}, pagination = {}) => {
  const id = queries.restaurant_id;
  delete queries.restaurant_id;
  
  return restaurantsAPI.delete(`${BACKEND_ENDPOINTS.RESTAURANT}/${id}`);
};
