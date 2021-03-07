import { Box, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { MuuriComponent } from 'muuri-react';
import PropTypes from 'prop-types';
import React from 'react';
import NoMatch from 'src/components/NoMatch';
import { useApp } from 'src/overmind';
import StoryCard from './StoryCard';

const useStyles = makeStyles(({ spacing }) => ({
  card: { margin: spacing(2.5) },
  container: {
    maxHeight: '83vh',
    overflowY: 'scroll',
  },
}));

const Collection = ({
  filters,
  // groupId,
  isLoading,
  searchQuery,
  triggerEditStory,
}) => {
  const classes = useStyles();
  const { state } = useApp();

  const fileredItems = () => {
    return state.story.stories
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of filters.entries()) {
          match = item[prop] === value;
          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const ownerFullName = `${item.owner.firstName} ${item.owner.lastName}`;
        const match =
          item.title.toLowerCase().match(searchQuery.toLowerCase()) ||
          ownerFullName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    const skels = new Array(qty).fill(0);
    return skels.map((sk, i) => (
      <Skeleton
        key={i}
        className={classes.card}
        width={300}
        height={200}
        variant="rect"
      />
    ));
  };

  return (
    <Box className={classes.container}>
      {isLoading ? (
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {showSkeleton(4)}
        </Box>
      ) : fileredItems().length === 0 ? (
        <NoMatch />
      ) : (
        <MuuriComponent>
          {fileredItems().map((story) => (
            <StoryCard
              key={story.id}
              className={classes.card}
              story={story}
              triggerEditStory={triggerEditStory}
            />
          ))}
        </MuuriComponent>
      )}
    </Box>
  );
};

Collection.propTypes = {
  filters: PropTypes.object,
  groupId: PropTypes.any,
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string,
  triggerEditStory: PropTypes.func,
};

export default Collection;
