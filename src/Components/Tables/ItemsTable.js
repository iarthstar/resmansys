import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';


const useStyles2 = makeStyles({
  table: {},
});

const ItemsTable = (props) => {
  const classes = useStyles2();
  const { list, onClickEdit, onClickDelete } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Item ID</TableCell> */}
            <TableCell>Name</TableCell>
            <TableCell>Section</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow>
              {/* <TableCell component="th" scope="row">
                {row.item_id}
              </TableCell> */}
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.item_section}</TableCell>
              <TableCell align="right">&#8377; {row.item_price}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={onClickEdit(`/items/edit/${row.item_id}`)}
                >
                  <EditIcon />
                </Button>
                <Button
                  style={{ float: 'right' }}
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={onClickDelete({item_id: row.item_id})}
                >
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;