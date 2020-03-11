import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Grid, Paper, Box, Typography } from '@material-ui/core';

import Layout from '../Components/Layout';
import { SUPER_ADMIN } from '../Constants/roles';

const ErrorPage = (props) => {

  const { history } = props;

  const redirect = (href) => () => history.push(href);

  return (
    <Layout role={SUPER_ADMIN} title="Dashboard">
      <br/>
      <br/>
      <Grid
        container
        justify="center"
        direction="row"
      >
        <Grid container xs={11} md={6} lg={4}>
          <Paper elevation={2} className="w-100">
            <Box p={2}>
            <Typography gutterBottom variant="h5" component="h2">
              404 Not Found...
            </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default (withRouter(ErrorPage));