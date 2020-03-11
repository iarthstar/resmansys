import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles2 = makeStyles({
  table: {},
});

const RestaurantsTable = (props) => {
  const classes = useStyles2();
  const { list, onClickEdit, onClickDelete } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Restaurant ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.restaurant_id}
              </TableCell>
              <TableCell>{row.restaurant_name}</TableCell>
              <TableCell>{row.restaurant_phone}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={onClickEdit(`/restaurants/edit/${row.restaurant_id}`)}
                >
                  <EditIcon />
                </Button>
                <Button
                  style={{ float: 'right' }}
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={onClickDelete({restaurant_id: row.restaurant_id})}
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

export default RestaurantsTable;