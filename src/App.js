import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import { Provider } from 'react-redux'
import { store } from './Redux';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

import Restaurants from './Pages/Restaurants/Restaurants';
import Add_Restaurant from './Pages/Restaurants/Add_Restaurant';
import Edit_Restaurant from './Pages/Restaurants/Edit_Restaurant';

import Items from './Pages/Items/Items';
import Add_Item from './Pages/Items/Add_Item';
import Edit_Item from './Pages/Items/Edit_Item';

import Tables from './Pages/Tables/Tables';
import Add_Table from './Pages/Tables/Add_Table';
import Edit_Table from './Pages/Tables/Edit_Table';

import Orders from './Pages/Orders/Orders';
import Add_Order from './Pages/Orders/Add_Order';
import Edit_Order from './Pages/Orders/Edit_Order';

import ErrorPage from './Pages/ErrorPage';

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/dashboard" children={<Dashboard />} />

          <Route exact path="/restaurants" children={<Restaurants />} />
          <Route exact path="/restaurants/add" children={<Add_Restaurant />} />
          <Route exact path="/restaurants/edit/:id" children={<Edit_Restaurant />} />

          <Route exact path="/items" children={<Items />} />
          <Route exact path="/items/add" children={<Add_Item />} />
          <Route exact path="/items/edit/:id" children={<Edit_Item />} />

          <Route exact path="/tables" children={<Tables />} />
          <Route exact path="/tables/add" children={<Add_Table />} />
          <Route exact path="/tables/edit/:id" children={<Edit_Table />} />

          <Route exact path="/orders" children={<Orders />} />
          <Route exact path="/orders/add" children={<Add_Order />} />
          <Route exact path="/orders/edit/:id" children={<Edit_Order />} />

          <Route exact path="/" children={<Login />} />
          <Route children={<ErrorPage />} />
        </Switch>
      </Router>
    </Provider>
  )
};

export default App;
