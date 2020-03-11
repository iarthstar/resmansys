import React, { useRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography, InputLabel, Select, MenuItem, FormControl, makeStyles } from '@material-ui/core';

import { get } from 'lodash';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "90%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const OrderDialog = (props) => {
  const classes = useStyles();

  const { open, toggle, items, onClickAction, table, setTable } = props;

  const tables = get(props, 'tables.data', []);

  const onSelect = ({ target: { name, value } }) => {
    setTable(value);
  }

  const billAmount = items.reduce((acc, { item_quantity, item_price }) => ((item_quantity * item_price) + acc), 0);

  const handleClose = () => {
    toggle(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Order Comfirmation</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label">
              Table
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="table"
              value={table}
              onChange={onSelect}
            >
              {tables.map(({ table_name, table_id }) => (
                <MenuItem value={table_id}>{table_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br></br>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell aligh="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(({ item_name, item_quantity, item_price }) => {
                  if (item_quantity <= 0) return <></>;
                  return (
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" component="p">
                          {item_name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" component="p">
                          {item_quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" component="p">
                          &#8377; {item_quantity * item_price}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5" component="h5">
                      <strong>Total Amount</strong>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h5" component="p">
                      <strong>&#8377; {billAmount}</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickAction} color="primary" size="large" variant="contained">
          PLACE ORDER
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;