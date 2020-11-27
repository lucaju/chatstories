import { Grid, MenuItem, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useApp } from 'src/overmind';

const Attributions = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const { state } = useApp();
  const [isAdmin] = useState(state.session.isAdmin);

  return (
    <>
      <Grid item md={3} xs={12}>
        <TextField
          error={Boolean(touched.language && errors.language)}
          fullWidth
          label="Language"
          name="language"
          onBlur={handleBlur}
          onChange={handleChange}
          select
          value={values.language}
          variant="outlined"
        >
          {state.users.languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          error={Boolean(touched.roleType && errors.roleType)}
          fullWidth
          label="Role"
          name="roleType"
          onBlur={handleBlur}
          onChange={handleChange}
          select
          value={values.roleType}
          disabled={!isAdmin}
          variant="outlined"
        >
          {state.users.roleTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item md={5} xs={12}>
        <TextField
          error={Boolean(touched.group && errors.group)}
          fullWidth
          label="Group"
          name="group"
          onBlur={handleBlur}
          onChange={handleChange}
          select
          value={values.group}
          disabled={!isAdmin}
          variant="outlined"
        >
          {state.users.groups.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

Attributions.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
};

export default Attributions;
