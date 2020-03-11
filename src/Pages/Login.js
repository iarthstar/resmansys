import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Box, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
// import { authenticate } from '../Redux/Actions/User';

const initForm = {
  username: {
    label: "Username",
    name: "username",
    value: "",
    error: false,
    validation: /[a-zA-Z0-9]{5,}/,
    helperText: "Username must be 5 letters or more"
  },
  password: {
    label: "Password",
    name: "password",
    value: "",
    error: false,
    validation: /.{8,}/,
    helperText: "Password must be 8 letters or more",
    type: "password"
  }
};

const Login = (props) => {
  const {
    history,
    user
  } = props;

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
    if(!isEmpty(user)){
      history.push("/dashboard");
    }
  }, [user]);

  const onClickLogin = () => {
    if (validateForm()) {
      console.log("GO TO DASHBOARD");
      // Todo : Login API
      // authenticate(values);
      history.push("/dashboard");
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid container xs={11} md={6} lg={4}>
        <Paper elevation={4} className="w-100">
          <Box p={2}>
            <Typography gutterBottom variant="h4" component="h1">
              {/* ResManSys */}
            </Typography>
            <br></br>
            <br></br>
            {Object.values(form).map(e => (
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
                  type={e.type}
                />
                <br></br>
                <br></br>
              </>
            ))}
            <Button
              disabled={!Object.values(form).every(e => !isEmpty(e.value)) || !Object.values(form).every(e => e.error === false)}
              className="w-100"
              variant="contained"
              size="large"
              color="primary"
              onClick={onClickLogin}
            >
              <Box p={1}>
                <Typography variant="h6" component="h2">
                  LOGIN
                </Typography>
              </Box>
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps,{
  // authenticate
})(withRouter(Login));