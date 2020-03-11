import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { get, isEmpty, isUndefined } from 'lodash';
import { connect } from 'react-redux';

import { Grid, Paper, Typography, TextField, Box, Button } from '@material-ui/core';

import { getItem, editItem, resetEditItem } from '../../Redux/Actions/Items';
import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';

const initForm = {
  item_name: {
    label: "Name",
    name: "item_name",
    value: "",
    error: false,
    validation: /[a-zA-Z0-9]{3,}/,
    helperText: "Item name must be 5 letters or more"
  },
  item_price: {
    label: "Price",
    name: "item_price",
    value: "",
    error: false,
    validation: /[1-9]{1}[0-9]{0,}/,
    helperText: "Only Numbers allowed",
  },
  item_section: {
    label: "Section",
    name: "item_section",
    value: "",
    error: false,
    validation: /[a-zA-Z0-9]{2,}/,
    helperText: "Item section must be 2 letters or more",
  }
};

const Edit_Item = (props) => {

  const {
    history,
    getItem,
    itemResp,
    editItem,
    editItemResp,
    resetEditItem
  } = props;

  const id = get(props, 'match.params.id', undefined);

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

  useEffect(() => {
    getItem({ id });
  }, []);

  const onClickSubmit = () => {
    if (validateForm()) {
      const newItemDetails = { ...itemResp.data };
      delete newItemDetails.createdAt;
      delete newItemDetails.updatedAt;

      Object.values(form).forEach(e => newItemDetails[e.name] = e.value);
      editItem(newItemDetails);
    }
  };

  useEffect(() => {
    if (!isEmpty(itemResp)) {
      const itemDetails = { ...itemResp.data };
      delete itemDetails.createdAt;
      delete itemDetails.updatedAt;
      
      const newForm = { ...form };
      Object.values(newForm).forEach(e => {
        e.value = itemDetails[e.name]
      });
      setForm(newForm);
    }
  }, [itemResp]);

  useEffect(() => {
    if (!isEmpty(editItemResp)) {
      resetEditItem();
      redirect("/items")();
    }
  }, [editItemResp]);

  return (
    <Layout role={SUPER_ADMIN} title="Items">
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
                Edit Item
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
  editItemResp: state.items.editItemResp,
  itemResp: state.items.itemResp
});

export default connect(mapStateToProps, {
  getItem,
  editItem,
  resetEditItem
})(withRouter(Edit_Item));