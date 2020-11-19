import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useApp } from 'src/overmind';
import Logo from './Logo';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbarGutters: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  sideSpace: { width: 250 },
  logo: {
    height: 38,
    marginLeft: theme.spacing(2),
  },
  rightMenu: { marginRight: theme.spacing(2) },
  avatar: {
    cursor: 'pointer',
    width: 32,
    height: 32,
  },
}));

const RightMenu = [
  {
    href: '/',
    title: 'My Stories',
    restricted: false,
  },
  {
    href: '/users',
    title: 'Users',
    restricted: ['Admin', 'Instructor'],
  },
];

const TopBar = ({ className, handleMenuClick, storyEditMode, ...rest }) => {
  const classes = useStyles();
  const { state } = useApp();
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  return (
    <div>
      <AppBar
        color="inherit"
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar
          classes={{
            gutters: classes.toolbarGutters,
          }}
        >
          <Box
            alignItems="center"
            display="flex"
            flexDirection="row"
            className={classes.sideSpace}
          >
            {storyEditMode && (
              <IconButton color="inherit" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
            )}
            <RouterLink to="/">
              <Logo className={classes.logo} />
            </RouterLink>
          </Box>
          <Box flexGrow={1} />
          <Typography component="h1" variant="h5" noWrap>
            {state.ui.title}
          </Typography>
          <Box flexGrow={1} />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            className={clsx(classes.sideSpace, classes.rightMenu)}
          >
            <Box className={classes.rightMenu}>
              {RightMenu.map((item) => {
                if (
                  item.restricted &&
                  !item.restricted.includes(state.session.user.roleType)
                )
                  return;
                return (
                  <Button
                    component={RouterLink}
                    key={item.title}
                    to={item.href}
                  >
                    {item.title}
                  </Button>
                );
              })}
            </Box>
            <Avatar
              className={classes.avatar}
              src={`/assets/users/images/${state.session.user.avatar}`}
              onClick={handleProfileClick}
            />
          </Box>
        </Toolbar>
        <Profile anchor={anchorProfileEl} handleClose={handleProfileClose} />
      </AppBar>
    </div>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  handleMenuClick: PropTypes.func,
  storyEditMode: PropTypes.bool,
};

export default TopBar;