/**
 * @file index.js
 * @description Configuration for App
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */

console.log("PROCESS", process.env);

const DEVELOPMENT = "development";
const LOCALHOST   = "localhost";
const STAGING     = "staging";
const PRODUCTION  = "production";

const Environments = {
  [LOCALHOST]  : LOCALHOST,
  [DEVELOPMENT]: DEVELOPMENT,
  [STAGING]    : STAGING,
  [PRODUCTION] : PRODUCTION
};

const BASE_URL = {
  [LOCALHOST]  : "http://localhost:8080",
  [DEVELOPMENT]: "https://dev-resmansys.herokuapp.com",
  [STAGING]    : "https://stage-resmansys.herokuapp.com",
  [PRODUCTION] : "https://resmansys.herokuapp.com"
};

export const HOST = BASE_URL[process.env.REACT_APP_CURRENT_ENV || Environments[DEVELOPMENT]];

export const API    = "/syoo_api";
export const ORIGIN = "WEB";

export const SERVICE = "";

export const BACKEND_ENDPOINTS = {
  RESTAURANT : "/restaurant",
  RESTAURANTS: "/restaurants",
  ITEM       : "/item",
  ITEMS      : "/items",
  ORDERS     : "/orders",
  ORDER      : "/order",
  TABLES     : "/tables",
  TABLE      : "/table"
};

export const DEFAULTS = {
  localhost: {
    restaurant_id: 'd4b00784-9e7a-4f1a-8d29-82c49fe164c1'
    // restaurant_id: '4503f03f-c5f1-406f-bd97-4ad6b91ab22c'
  }
};