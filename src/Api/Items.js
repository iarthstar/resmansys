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

let itemsAPI = axios.create({
  baseURL: HOST + API + SERVICE,
  headers: headers
});

itemsAPI.interceptors.request.use(request => {
  if (process.env.NODE_ENV === "production") return request;

  console.log('-----------------');
  console.log('Starting Request', request.baseURL + request.url);
  console.log(request.params);
  console.log(request.query);
  console.log('-----------------');
  return request;
});

export const getItemsAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return itemsAPI.get(BACKEND_ENDPOINTS.ITEMS, config);
};

export const getItemAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return itemsAPI.get(BACKEND_ENDPOINTS.ITEM, config);
};

export const addItemAPI = (queries = {}, pagination = {}) => {
  const data = { ...queries, ...pagination };
  return itemsAPI.post(BACKEND_ENDPOINTS.ITEM, data);
};

export const editItemAPI = (queries = {}, pagination = {}) => {
  const id = queries.item_id;
  delete queries.item_id;
  
  const data = { ...queries, ...pagination };
  return itemsAPI.put(`${BACKEND_ENDPOINTS.ITEM}/${id}`, data);
};

export const deleteItemAPI = (queries = {}, pagination = {}) => {
  const id = queries.item_id;
  delete queries.item_id;

  return itemsAPI.delete(`${BACKEND_ENDPOINTS.ITEM}/${id}`);
};
