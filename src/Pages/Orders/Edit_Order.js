import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Box, Button, Fab, IconButton } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { getItems } from '../../Redux/Actions/Items';
import { getTables } from '../../Redux/Actions/Tables';
import { editOrder, resetEditOrder, getOrder } from '../../Redux/Actions/Orders';
import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';

import { DEFAULTS } from '../../Config';
import OrderDialog from '../../Components/Dialogs/OrderDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}));

const Edit_Order = (props) => {

  const {
    history,
    getItems,
    itemsResp,
    getTables,
    tablesResp,
    getOrder,
    orderResp,
    editOrder,
    editOrderResp,
    resetEditOrder
  } = props;

  const [items, setItems] = useState([]);
  const [table, setTable] = useState("");
  const [openOrderM, setOpenOrderM] = useState(false);

  const order_id = get(props, 'match.params.id', undefined);
  const restaurant_id = get(props, 'user.id', DEFAULTS['localhost'].restaurant_id);

  const redirect = (href) => () => history.push(href);

  useEffect(() => {
    getItems({ id: restaurant_id });
    getTables({ id: restaurant_id });
  }, []);

  useEffect(() => {
    if (!isEmpty(itemsResp)) {
      getOrder({ order_id });
    }
  }, [itemsResp]);

  useEffect(() => {
    if (!isEmpty(orderResp)) {
      const orderItems = {};

      orderResp.data.order_items.forEach(o => orderItems[o.item_id] = o);

      const itemsWithQuantity = itemsResp.data.map(e => {

        e.item_quantity = get(orderItems, `${e.item_id}.item_quantity`, 0);
        return e;
      });
      setItems(itemsWithQuantity);
    }
  }, [orderResp])

  useEffect(() => {
    if (!isEmpty(tablesResp)) {
      setTable(tablesResp.data[0].table_id);
    }
  }, [tablesResp]);

  useEffect(() => {
    if (!isEmpty(editOrderResp)) {
      resetEditOrder();
      redirect("/orders")();
    }
  }, [editOrderResp]);

  const updateOrder = (data) => () => {
    const newItems = [...items].map((item) => {
      if (item.item_id !== data.item_id) return item;
      else {
        const { item_quantity } = item;
        switch (data.action) {
          case "MINUS": item.item_quantity = item_quantity - 1 >= 0 ? item_quantity - 1 : item_quantity; break;
          case "PLUS": item.item_quantity = item_quantity + 1; break;
        };
        return item;
      }
    })
    setItems(newItems);
  };

  const placeOrder = () => {
    setOpenOrderM(false);
    const order_items = items.filter(({ item_quantity }) => item_quantity >= 1);

    const orderDetails = {
      restaurant_id,
      order_id,
      table_id: table,
      table_name: tablesResp.data.find(({ table_id }) => table_id === table).table_name,
      order_items
    };
    editOrder(orderDetails);
  }

  const classes = useStyles();

  return (
    <Layout role={SUPER_ADMIN} title="Items">
      <Fab onClick={() => setOpenOrderM(true)} className={classes.fab} size="large" color="secondary" aria-label="add">
        <ArrowForwardIcon />
      </Fab>
      <OrderDialog
        open={openOrderM}
        toggle={setOpenOrderM}
        onClickAction={placeOrder}
        tables={tablesResp}
        table={table}
        setTable={setTable}
        items={items}
      />
      <Box p={2}>
        <Grid
          container
          direction="row"
          spacing={2}
        >
          {items.map(({ item_id, item_name, item_price, item_quantity }) => (
            <Grid item xs={6} sm={3} md={3} lg={2}>
              <Paper className={classes.paper} elevation={4} className="w-100">
                <Box p={2}>
                  <Typography style={{ float: "left" }} variant="h6" component="p">
                    {item_name}
                  </Typography>
                  <Typography style={{ float: "right" }} variant="h6" component="p">
                    &#8377; {item_price}
                  </Typography>
                </Box>
                <Box p={2}>
                  <br></br>
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                    spacing={2}
                  >
                    <IconButton aria-label="minus" onClick={updateOrder({ action: "MINUS", item_id })}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h5" component="p">
                      <strong>{item_quantity}</strong>
                    </Typography>
                    <IconButton aria-label="plus" onClick={updateOrder({ action: "PLUS", item_id })}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

const mapStateToProps = state => ({
  itemsResp: state.items.itemsResp,
  editOrderResp: state.orders.editOrderResp,
  orderResp: state.orders.orderResp,
  tablesResp: state.tables.tablesResp
});

export default connect(mapStateToProps, {
  getItems,
  getTables,
  getOrder,
  editOrder,
  resetEditOrder
})(withRouter(Edit_Order));