import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Credentials = ({ errors, handleBlur, handleChange, touched, values }) => (
  <Grid item md={12} xs={12}>
    <TextField
      error={Boolean(touched.userName && errors.userName)}
      disabled={!!values.id}
      fullWidth
      helperText={touched.userName && errors.userName}
      label="Email"
      name="userName"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.userName}
    />
  </Grid>
);

Credentials.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Credentials;
