import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import AddStoryCard from './AddStoryCard';

const useStyles = makeStyles(({ palette }) => ({
  heading: {
    marginTop: 50,
    textTransform: 'uppercase',
    fontWeight: 700,
    color: palette.grey[700],
  },
  image: {
    marginBottom: 50,
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 400,
    opacity: 0.7,
  },
}));

const NoStories = ({ openDialog }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      textAlign="center"
      alignItems="center"
    >
      <Typography className={classes.heading} gutterBottom variant="h4">
        No stories yet
      </Typography>
      <img
        alt="No stories yet"
        className={classes.image}
        src="/assets/images/undraw_chat_bot_kli5.svg"
      />
      <AddStoryCard openDialog={openDialog} />
    </Box>
  );
};

NoStories.propTypes = {
  openDialog: PropTypes.func,
};

export default NoStories;
