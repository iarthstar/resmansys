
const BASE_URL = {
  production : "https://grandeur-internal.herokuapp.com",
  staging    : "https://stage-syoo-dash-client.now.sh",
  development: "https://dev-dash-client.now.sh",
  localhost  : "http://localhost:8080"
};

export const HOST = BASE_URL[process.env.CURRENT_ENV || 'localhost'];

export const API = "/syoo_api"; //"/api/v1";
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
  }
};