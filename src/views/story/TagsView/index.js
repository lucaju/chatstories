import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoMatch from 'src/components/NoMatch';
import Page from 'src/components/Page';
import { useApp } from 'src/overmind';
import Collection from './Collection';
import Details from './details';
import MenuBar from './menubar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingTop: spacing(3),
  },
}));

const title = 'Juno Chatbot';

const TagsView = () => {
  const classes = useStyles();
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasTags, setHasTags] = useState(true);
  const [currentTag, setCurrentTag] = useState(undefined);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [filters, setFilters] = useState(new Map());
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (!state.story.currentStory.id) navigate('/app', { replace: true });
    const getCollection = async () => {
      await actions.videos.getTags();
      setIsLoading(false);
      setHasTags(state.videos.tagCollection.length > 0);
    };
    getCollection();
    return () => {};
  }, []);

  const handleDetailOpen = (tag = {}) => {
    setCurrentTag(tag);
    setDetailsOpen(true);
  };

  const handleDetailClose = () => {
    setCurrentTag(undefined);
    setDetailsOpen(false);
  };

  const updateFilters = ({ type, value, reset }) => {
    reset ? filters.delete(type) : filters.set(type, value);
    setFilters(new Map(filters));
  };

  const handleSearch = async (value) => {
    if (value === '') value = null;
    setSearchQuery(value);
  };

  return (
    <Page className={classes.root} title={title}>
      <Container maxWidth={false}>
        <Details
          handleDetailClose={handleDetailClose}
          open={detailsOpen}
          tag={currentTag}
        />
        {!isLoading && (
          <MenuBar
            disabledFilters={!hasTags}
            handleDetailOpen={handleDetailOpen}
            handleSearch={handleSearch}
            updateFilter={updateFilters}
          />
        )}
        {!hasTags ? (
          <NoMatch heading="No tags yet" />
        ) : (
          <Box mt={3}>
            <Collection
              filters={filters}
              handleDetailOpen={handleDetailOpen}
              isLoading={isLoading}
              searchQuery={searchQuery}
            />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default TagsView;
