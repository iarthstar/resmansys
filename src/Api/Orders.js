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

let ordersAPI = axios.create({
  baseURL: HOST + API + SERVICE,
  headers: headers
});

ordersAPI.interceptors.request.use(request => {
  if (process.env.NODE_ENV === "production") return request;

  console.log('-----------------');
  console.log('Starting Request', request.baseURL + request.url);
  console.log(request.params);
  console.log(request.query);
  console.log('-----------------');
  return request;
});

export const getOrdersAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return ordersAPI.get(BACKEND_ENDPOINTS.ORDERS, config);
};

export const getOrderAPI = (queries = {}, pagination = {}) => {
  const id = queries.order_id;
  return ordersAPI.get(`${BACKEND_ENDPOINTS.ORDER}/${id}`);
};

export const editOrderAPI = (queries = {}) => {
  const id = queries.order_id;
  delete queries.order_id;

  const data = { ...queries };
  return ordersAPI.put(`${BACKEND_ENDPOINTS.ORDER}/${id}`, data);
};

export const billOrderAPI = (queries = {}) => {
  const id = queries.order_id;
  delete queries.order_id;

  return ordersAPI.patch(`${BACKEND_ENDPOINTS.ORDER}/${id}`, { status: "BILLED" });
};

export const addOrderAPI = (queries = {}) => {
  const data = { ...queries };
  return ordersAPI.post(BACKEND_ENDPOINTS.ORDER, data);
};