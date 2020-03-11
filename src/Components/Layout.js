import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Grow, Backdrop, CircularProgress } from '@material-ui/core';

import NavBar from './NavBar';
import { hideSnackbar } from '../Redux/Actions/Page';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const { role, title, snackbar, hideSnackbar, backdrop } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className={classes.root}>
      {snackbar && <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.msg}
        TransitionComponent={(props) => <Grow {...props} />}
      />}
      {backdrop && <Backdrop className={classes.backdrop} open={backdrop.count > 0 ? true : false}>
        <CircularProgress color="inherit" />
      </Backdrop>}
      <NavBar role={role} title={title} />
      {props.children}
    </div>
  );
};

const mapStateToProps = state => ({
  snackbar: state.page.snackbar,
  backdrop: state.page.backdrop
});

export default connect(mapStateToProps, {
  hideSnackbar
})(Layout);