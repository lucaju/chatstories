import { Grid, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../overmind';
import { User, UserGroup } from '../../../types';

interface AttributionsProps {
  errors: FormikErrors<User>;
  handleBlur: (e: FocusEvent<any>) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  touched: FormikTouched<User>;
  values: Partial<User>;
}

const useStyles = makeStyles(() => ({
  capitalize: { textTransform: 'capitalize' },
}));

const Attributions: FC<AttributionsProps> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  const classes = useStyles();
  const { state } = useApp();
  const { t } = useTranslation(['users', 'common']);
  const [isAdmin] = useState(state.session.isAdmin);
  const [groupsOptions, setGroupsOptions] = useState<UserGroup[] | undefined>();

  useEffect(() => {
    setGroupsOptions(state.users.groups);
    return () => {};
  }, [state.users.groups]);

  return (
    <>
      <Grid item md={state.session.isAdmin ? 5 : 3} xs={12}>
        {state.session.isAdmin && (
          <TextField
            className={classes.capitalize}
            error={Boolean(touched.roleTypeId && errors.roleTypeId)}
            fullWidth
            label={t('role')}
            name="roleTypeId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.roleTypeId}
            disabled={!isAdmin ? true : false}
            variant="outlined"
          >
            {state.users.roleTypes.map(({ name, value }) => (
              <MenuItem
                key={value}
                className={classes.capitalize}
                value={value}
              >
                {t(name)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
      <Grid item md={state.session.isAdmin ? 7 : 9} xs={12}>
        {groupsOptions && (
          <TextField
            className={classes.capitalize}
            error={Boolean(touched.groupId && errors.groupId)}
            fullWidth
            label={t('common:group')}
            name="groupId"
            onBlur={handleBlur}
            onChange={handleChange}
            select
            value={values.groupId}
            disabled={!isAdmin ? true : false}
            variant="outlined"
          >
            {state.users.groups.map(({ id, name }) => (
              <MenuItem key={id} className={classes.capitalize} value={id}>
                {t(name)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid>
    </>
  );
};

export default Attributions;
