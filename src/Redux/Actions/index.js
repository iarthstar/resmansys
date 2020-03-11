import Restaurants from './Restaurants';
import Items from './Items';
import Orders from './Orders';
import Page from './Page';
import Tables from './Tables';

const actions = {
  ...Page,
  ...Orders,
  ...Items,
  ...Restaurants,
  ...Tables
};

export default actions;