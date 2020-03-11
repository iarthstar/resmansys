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
import { getOrders, editOrder, resetEditOrder, billOrder } from '../../Redux/Actions/Orders';
import OrdersTable from '../../Components/Tables/OrdersTable';
import BillDialog from '../../Components/Dialogs/BillDialog';

import { DEFAULTS } from '../../Config';

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}));

const Items = (props) => {

  const {
    history,
    getOrders,
    ordersResp,
    editOrder,
    editOrderResp,
    billOrder,
    billOrderResp,
  } = props;

  const redirect = (href) => () => history.push(href);

  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState({});
  const [openOrderM, setOpenOrderM] = useState(false);

  const id = get(props, 'user.id', DEFAULTS['localhost'].restaurant_id);

  const updateOrder = (data) => () => {
    switch (data.action) {
      case "ADD_ITEMS": {
        redirect(`/orders/edit/${data.order_id}`)();
      } break;
      case "UPDATE": {
        delete data.action;
        delete data.isUpdated;
        delete data.createdAt;
        delete data.updatedAt;
        console.log(data);
        editOrder(data);
      } break;
      case "BILL": {
        const newRows = [...rows];
        const order = newRows.find(({ order_id }) => order_id === data.order_id);
        setOrder(order);
        console.log(order);
        setOpenOrderM(true);
        // billOrder({ order_id: data.order_id });
      } break;
      default: {
        const newRows = [...rows];
        const order = newRows.find(({ order_id }) => order_id === data.order_id);
        order.isUpdated = true;
        order.order_items = order.order_items.map(item => {
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
        setRows(newRows);
      }
    }
  };

  useEffect(() => {
    getOrders({ id });
  }, []);

  useEffect(() => {
    if (!isEmpty(ordersResp)) {
      setRows(ordersResp.data);
    }
  }, [ordersResp]);

  useEffect(() => {
    if (!isEmpty(editOrderResp)) {
      resetEditOrder();
      getOrders({ id });
    }
  }, [editOrderResp]);

  useEffect(() => {
    console.log("ON CHANGE BILL");
    if (!isEmpty(billOrderResp)) {
      setOrder({});
      console.log("ON BILL RESP");
      getOrders({ id });
    }
  }, [billOrderResp]);

  const classes = useStyles();
  return (
    <Layout role={SUPER_ADMIN} title="Orders">
      <Fab onClick={redirect("/orders/add")} className={classes.fab} size="medium" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
      <BillDialog
        open={openOrderM}
        toggle={setOpenOrderM}
        onClickAction={() => { setOpenOrderM(false); billOrder(order);}}
        items={get(order, 'order_items', [])}
      />
      <Box p={2}>
        <Grid
          container
          direction="row"
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper elevation={2} className="w-100">
              <OrdersTable
                list={rows}
                updateOrder={updateOrder}
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
  ordersResp: state.orders.ordersResp,
  editOrderResp: state.orders.editOrderResp,
  billOrderResp: state.orders.billOrderResp
});

export default connect(mapStateToProps, {
  getOrders,
  editOrder,
  billOrder
})(withRouter(Items));