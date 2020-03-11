// import React, { useState, useEffect } from 'react';
// import { withRouter } from 'react-router';
// import { get, isEmpty, isUndefined } from 'lodash';
// import { connect } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
// import { Grid, Paper, Typography, TextField, Box, Button } from '@material-ui/core';

// import { getRestaurant, editRestaurant, resetEditRestaurant } from '../../Redux/Actions/Restaurants';
// import Layout from '../../Components/Layout';
// import { SUPER_ADMIN } from '../../Constants/roles';

// const useStyles = makeStyles(theme => ({

// }));

// const initValues = {
//   restaurant_id: "",
//   restaurant_name: "",
//   restaurant_phone: ""
// };

// const initErrors = {
//   restaurant_id: false,
//   restaurant_name: false,
//   restaurant_phone: false
// };

// const Edit_Restaurant = (props) => {

//   const {
//     history,
//     getRestaurant,
//     restaurantResp,
//     editRestaurant,
//     editRestaurantResp,
//     resetEditRestaurant
//   } = props;

//   const redirect = (href) => () => history.push(href);

//   const id = get(props, 'match.params.id', undefined);

//   const [values, setValues] = useState(initValues);
//   const [errors, setErrors] = useState(initErrors);

//   const handleChange = ({ target: { name, value } }) => {
//     const v = { ...values };
//     v[name] = value;
//     setValues(v);
//   };

//   const onClickSubmit = () => {
//     editRestaurant(values);
//   };

//   useEffect(() => {
//     getRestaurant({id});
//   }, []);

//   useEffect(() => {
//     if (!isEmpty(restaurantResp)) {
//       const data = { ...restaurantResp.data };
//       delete data.createdAt;
//       delete data.updatedAt;
//       setValues(data);
//       // redirect("/restaurants")();
//     }
//   }, [restaurantResp]);

//   useEffect(() => {
//     if (!isEmpty(editRestaurantResp)) {
//       resetEditRestaurant();
//       redirect("/restaurants")();
//     }
//   }, [editRestaurantResp]);

//   const classes = useStyles();
//   return (
//     <Layout role={SUPER_ADMIN} title="Restaurants">
//       <br></br>
//       <Grid
//         container
//         justify="center"
//         direction="row"
//       >
//         <Grid container xs={11} md={6} lg={4}>
//           <Paper elevation={2} className="w-100">
//             <Box p={2}>
//               <Typography gutterBottom variant="h5" component="h2">
//                 Edit Restaurant
//               </Typography>
//               <br />
//               <br />
//               <form noValidate autoComplete="off">
//                 <TextField
//                   className="w-100"
//                   label="Restaurant ID"
//                   name="restaurant_id"
//                   variant="outlined"
//                   disabled
//                   value={values.restaurant_id}
//                   onChange={handleChange}
//                   error={errors.restaurant_id}
//                 />
//                 <br />
//                 <br />
//                 <TextField
//                   className="w-100"
//                   label="Name"
//                   name="restaurant_name"
//                   variant="outlined"
//                   value={values.restaurant_name}
//                   onChange={handleChange}
//                   error={errors.restaurant_name}
//                 />
//                 <br />
//                 <br />
//                 <TextField
//                   className="w-100"
//                   label="Phone"
//                   name="restaurant_phone"
//                   variant="outlined"
//                   value={values.restaurant_phone}
//                   onChange={handleChange}
//                   error={errors.restaurant_phone}
//                 />
//                 <br />
//                 <br />
//                 <Button
//                   variant="contained"
//                   size="large"
//                   color="primary"
//                   onClick={onClickSubmit}>
//                   Submit
//                 </Button>
//               </form>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Layout>
//   );
// };

// const mapStateToProps = state => ({
//   editRestaurantResp: state.restaurants.editRestaurantResp,
//   restaurantResp: state.restaurants.restaurantResp
// });

// export default connect(mapStateToProps, {
//   getRestaurant,
//   editRestaurant,
//   resetEditRestaurant
// })(withRouter(Edit_Restaurant));


import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { get, isEmpty, isUndefined } from 'lodash';
import { connect } from 'react-redux';

import { Grid, Paper, Typography, TextField, Box, Button } from '@material-ui/core';

import { getRestaurant, editRestaurant, resetEditRestaurant } from '../../Redux/Actions/Restaurants';
import Layout from '../../Components/Layout';
import { SUPER_ADMIN } from '../../Constants/roles';

const initForm = {
  restaurant_name: {
    label: "Name",
    name: "restaurant_name",
    value: "",
    error: false,
    validation: /[a-zA-Z0-9]{3,}/,
    helperText: "Restaurant name must be 5 letters or more"
  },
  restaurant_phone: {
    label: "Phone",
    name: "restaurant_phone",
    value: "",
    error: false,
    validation: /9[0-9]{9}/,
    helperText: "Only Numbers allowed",
  }
};

const Edit_Restaurant = (props) => {

  const {
    history,
    getRestaurant,
    restaurantResp,
    editRestaurant,
    editRestaurantResp,
    resetEditRestaurant
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
    getRestaurant({ id });
  }, []);

  const onClickSubmit = () => {
    if (validateForm()) {
      const newRestaurantDetails = { ...restaurantResp.data };
      delete newRestaurantDetails.createdAt;
      delete newRestaurantDetails.updatedAt;

      Object.values(form).forEach(e => newRestaurantDetails[e.name] = e.value);
      editRestaurant(newRestaurantDetails);
    }
  };

  useEffect(() => {
    if (!isEmpty(restaurantResp)) {
      const restaurantDetails = { ...restaurantResp.data };
      delete restaurantDetails.createdAt;
      delete restaurantDetails.updatedAt;
      
      const newForm = { ...form };
      Object.values(newForm).forEach(e => {
        e.value = restaurantDetails[e.name]
      });
      setForm(newForm);
    }
  }, [restaurantResp]);

  useEffect(() => {
    if (!isEmpty(editRestaurantResp)) {
      resetEditRestaurant();
      redirect("/restaurants")();
    }
  }, [editRestaurantResp]);

  return (
    <Layout role={SUPER_ADMIN} title="Restaurants">
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
                Edit Restaurant
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
  editRestaurantResp: state.restaurants.editRestaurantResp,
  restaurantResp: state.restaurants.restaurantResp
});

export default connect(mapStateToProps, {
  getRestaurant,
  editRestaurant,
  resetEditRestaurant
})(withRouter(Edit_Restaurant));