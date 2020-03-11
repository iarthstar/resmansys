import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Paper } from '@material-ui/core';

import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';
import { getTables, deleteTable, resetDeleteTable } from '../../Redux/Actions/Tables';
import TablesTable from '../../Components/Tables/TablesTable';

import { DEFAULTS } from '../../Config';

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  }
}));

const Tables = (props) => {

  const {
    history,
    getTables,
    tablesResp,
    deleteTable,
    deleteTableResp,
    resetDeleteTable
  } = props;

  const redirect = (href) => () => history.push(href);

  const [rows, setRows] = useState([]);

  const id = get(props, 'user.id', DEFAULTS['localhost'].restaurant_id);

  const onClickDelete = ({ table_id }) => () => {
    deleteTable({ table_id });
  }

  useEffect(() => {
    getTables({ id });
  }, []);

  useEffect(() => {
    if (!isEmpty(tablesResp)) {
      setRows(tablesResp.data);
    }
  }, [tablesResp]);

  useEffect(() => {
    if (!isEmpty(deleteTableResp)) {
      resetDeleteTable();
      getTables({ id });
    }
  }, [deleteTableResp]);

  const classes = useStyles();
  return (
    <Layout role={SUPER_ADMIN} title="Tables">
      <Fab onClick={redirect("/tables/add")} className={classes.fab} size="medium" color="secondary" aria-label="add">
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
            <TablesTable
              list={rows}
              onClickEdit={redirect}
              onClickDelete={onClickDelete}
              pageSize={5}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = state => ({
  tablesResp: state.tables.tablesResp,
  deleteTableResp: state.tables.deleteTableResp,
});

export default connect(mapStateToProps, {
  getTables,
  deleteTable,
  resetDeleteTable
})(withRouter(Tables));