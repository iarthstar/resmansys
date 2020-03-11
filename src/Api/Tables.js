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

let tablesAPI = axios.create({
  baseURL: HOST + API + SERVICE,
  headers: headers
});

tablesAPI.interceptors.request.use(request => {
  if (process.env.NODE_ENV === "production") return request;

  console.log('-----------------');
  console.log('Starting Request', request.baseURL + request.url);
  console.log(request.params);
  console.log(request.query);
  console.log('-----------------');
  return request;
});

export const getTablesAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return tablesAPI.get(BACKEND_ENDPOINTS.TABLES, config);
};

export const getTableAPI = (queries = {}, pagination = {}) => {
  const config = {};
  config.params = { ...queries, ...pagination };
  return tablesAPI.get(BACKEND_ENDPOINTS.TABLE, config);
};

export const addTableAPI = (queries = {}, pagination = {}) => {
  const data = { ...queries, ...pagination };
  return tablesAPI.post(BACKEND_ENDPOINTS.TABLE, data);
};

export const editTableAPI = (queries = {}, pagination = {}) => {
  const id = queries.table_id;
  delete queries.table_id;
  
  const data = { ...queries, ...pagination };
  return tablesAPI.put(`${BACKEND_ENDPOINTS.TABLE}/${id}`, data);
};

export const deleteTableAPI = (queries = {}, pagination = {}) => {
  const id = queries.table_id;
  delete queries.table_id;

  return tablesAPI.delete(`${BACKEND_ENDPOINTS.TABLE}/${id}`);
};
