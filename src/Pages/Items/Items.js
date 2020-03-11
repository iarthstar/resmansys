import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Paper, Box } from '@material-ui/core';

import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';
import { getItems, deleteItem, resetDeleteItem } from '../../Redux/Actions/Items';
import ItemsTable from '../../Components/Tables/ItemsTable';

import { DEFAULTS } from '../../Config';

const useStyles = makeStyles(theme => ({
  fab: {
    zIndex: "1200",
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}));

const Items = (props) => {

  const {
    history,
    getItems,
    itemsResp,
    deleteItem,
    deleteItemResp,
    resetDeleteItem
  } = props;

  const redirect = (href) => () => history.push(href);

  const [rows, setRows] = useState([]);

  const id = get(props, 'user.id', DEFAULTS['localhost'].restaurant_id);

  const onClickDelete = ({ item_id }) => () => {
    deleteItem({ item_id });
  }

  useEffect(() => {
    getItems({ id });
  }, []);

  useEffect(() => {
    if (!isEmpty(itemsResp)) {
      setRows(itemsResp.data);
    }
  }, [itemsResp]);

  useEffect(() => {
    if (!isEmpty(deleteItemResp)) {
      resetDeleteItem();
      getItems({ id });
    }
  }, [deleteItemResp]);

  const classes = useStyles();
  return (
    <Layout role={SUPER_ADMIN} title="Items">
      <Fab onClick={redirect("/items/add")} className={classes.fab} size="large" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={8} lg={6}>
          <Paper elevation={2} className="w-100">
            <ItemsTable
              list={rows}
              onClickEdit={redirect}
              onClickDelete={onClickDelete}
              pageSize={5}
            />
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </Layout>
  );
};

const mapStateToProps = state => ({
  itemsResp: state.items.itemsResp,
  deleteItemResp: state.items.deleteItemResp
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  resetDeleteItem
})(withRouter(Items));