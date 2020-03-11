import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Paper } from '@material-ui/core';

import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';
import { getRestaurants, deleteRestaurant, resetDeleteRestaurant } from '../../Redux/Actions/Restaurants';
import RestaurantsTable from '../../Components/Tables/RestaurantsTable';

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}));

const Restaurants = (props) => {

  const {
    history,
    getRestaurants,
    restaurantsResp,
    deleteRestaurant,
    deleteRestaurantResp,
    resetDeleteRestaurant
  } = props;

  const redirect = (href) => () => history.push(href);

  const [rows, setRows] = useState([]);

  const onClickDelete = ({ restaurant_id }) => () => {
    deleteRestaurant({ restaurant_id });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    if (!isEmpty(restaurantsResp)) {
      setRows(restaurantsResp.data);
    }
  }, [restaurantsResp]);

  useEffect(() => {
    if (!isEmpty(deleteRestaurantResp)) {
      resetDeleteRestaurant();
      getRestaurants();
    }
  }, [deleteRestaurantResp]);

  const classes = useStyles();
  return (
    <Layout role={SUPER_ADMIN} title="Restaurants">
      <Fab onClick={redirect("/restaurants/add")} className={classes.fab} size="medium" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <br></br>
      <Grid
        container
        justify="center"
        direction="row"
      >
        <Grid container xs={11} md={8} lg={6}>
          <Paper elevation={2} className="w-100">
            <RestaurantsTable
              list={rows}
              onClickEdit={redirect}
              onClickDelete={onClickDelete}
              pageSize={5}
              count={rows.length}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = state => ({
  restaurantsResp: state.restaurants.restaurantsResp,
  deleteRestaurantResp: state.restaurants.deleteRestaurantResp
});

export default connect(mapStateToProps, {
  getRestaurants,
  deleteRestaurant,
  resetDeleteRestaurant
})(withRouter(Restaurants));