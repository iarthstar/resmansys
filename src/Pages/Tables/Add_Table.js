import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { get, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { Grid, Paper, Typography, TextField, Box, Button } from '@material-ui/core';

import { addTable, resetAddTable } from '../../Redux/Actions/Tables';
import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';

import { DEFAULTS } from '../../Config';

const initForm = {
  table_name: {
    label: "Name",
    name: "table_name",
    value: "",
    error: false,
    validation: /[a-zA-Z0-9]{3,}/,
    helperText: "Table name must be 5 letters or more"
  }
};

const Add_Table = (props) => {

  const {
    history,
    addTable,
    addTableResp,
    resetAddTable
  } = props;

  const restaurant_id = get(props, 'user.id', DEFAULTS['localhost'].restaurant_id);

  const redirect = (href) => () => history.push(href);

  //
  // ───────────────────────────────────────────────────── FORM UTILITIES ─────
  //

  const [form, setForm] = useState(initForm);

  const formChange = ({ target: { name, value } }) => {
    const field = { ...form[name] };
    field.value = value
    const newForm = {
      ...form,
      [name]: field
    };
    setForm(newForm);
  };

  const formBlur = ({ target: { name, value } }) => {
    const field = { ...form[name] };
    field.error = !field.validation.test(value);
    const newForm = {
      ...form,
      [name]: field
    };
    setForm(newForm);
  };

  const validateForm = () => {
    const newForm = { ...form };
    Object.values(newForm).forEach(e => {
      e.error = !e.validation.test(e.value);
    });
    setForm(newForm);
    return Object.values(form).every(v => v.error === false);
  };

  //
  // ──────────────────────────────────────────────────────────────────────────
  //

  const onClickSubmit = () => {
    if (validateForm()) {
      const tableDetails = {
        restaurant_id
      };
      Object.values(form).forEach(e => tableDetails[e.name] = e.value);
      addTable(tableDetails);
    }
  };

  useEffect(() => {
    if (!isEmpty(addTableResp)) {
      resetAddTable();
      redirect("/tables")();
    }
  }, [addTableResp]);

  return (
    <Layout role={SUPER_ADMIN} title="Tables">
      <br></br>
      <Grid
        container
        justify="center"
        direction="row"
      >
        <Grid container xs={11} md={6} lg={4}>
          <Paper elevation={2} className="w-100">
            <Box p={2}>
              <Typography gutterBottom variant="h5" component="h2">
                Add Table
              </Typography>
              <br />
              <br />
              <form noValidate autoComplete="off">
                {Object.values(form).map(e => (e.label && (
                  <>
                    <TextField
                      className="w-100"
                      variant="outlined"
                      onChange={formChange}
                      onBlur={formBlur}
                      label={e.label}
                      name={e.name}
                      value={e.value}
                      error={e.error}
                      helperText={e.error ? e.helperText : " "}
                    />
                    <br></br>
                    <br></br>
                  </>
                )))}
                <Button
                  disabled={!Object.values(form).every(e => !isEmpty(e.value)) || !Object.values(form).every(e => e.error === false)}
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={onClickSubmit}>
                  Submit
                </Button>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = state => ({
  addTableResp: state.tables.addTableResp
});

export default connect(mapStateToProps, {
  addTable,
  resetAddTable
})(withRouter(Add_Table));