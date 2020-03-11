import { combineReducers } from 'redux';
import restaurants from './Restaurants';
import items from './Items';
import orders from './Orders';
import page from './Page';
import tables from './Tables';

export default combineReducers({
  page,
  orders,
  items,
  restaurants,
  tables
});