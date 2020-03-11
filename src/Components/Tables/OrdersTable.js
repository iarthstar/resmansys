import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography, IconButton, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles2 = makeStyles({
  table: {},
});

const ItemsTable = (props) => {
  const classes = useStyles2();
  const { list, updateOrder } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Order No</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.order_no}
              </TableCell>
              <TableCell>
                {row.table_name}
              </TableCell>
              <TableCell>

                <TableContainer component={Paper} elevation={4}>
                  <Table className={classes.table} aria-label="custom pagination table">
                    <TableBody>
                      {row.order_items.map(({ item_id, item_name, item_quantity }) => (
                        <TableRow>
                          <TableCell align="left">
                            <IconButton aria-label="minus" onClick={updateOrder({ action: "MINUS", order_id: row.order_id, item_id })}>
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5" component="p">
                              <strong>{item_quantity}</strong>
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton aria-label="plus" onClick={updateOrder({ action: "PLUS", order_id: row.order_id, item_id })}>
                              <AddIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="h6" component="p">

                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" component="p">
                              {item_name}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={updateOrder({ action: "ADD_ITEMS", ...row })}
                  >
                    ADD MORE ITEMS
                </Button>
                </Box>
              </TableCell>
              <TableCell>
                {row.isUpdated ?
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ width: "100%", height: "100%" }}
                    onClick={updateOrder({ action: "UPDATE", ...row })}
                  >
                    UPDATE ORDER
                  </Button> :
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{ width: "100%", height: "100%" }}
                    onClick={updateOrder({ action: "BILL", ...row })}
                  >
                    BILL KARDO
                </Button>}
                {/* {row.status} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;