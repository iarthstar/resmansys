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

const TablesTable = (props) => {
  const classes = useStyles2();
  const { list, onClickEdit, onClickDelete } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Table No</TableCell>
            <TableCell>Table Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, index) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.table_name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={onClickEdit(`/tables/edit/${row.table_id}`)}
                >
                  <EditIcon />
                </Button>
                <Button
                  style={{ float: 'right' }}
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={onClickDelete({table_id: row.table_id})}
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

export default TablesTable;