import { Box, Skeleton } from '@material-ui/core';
import { useActions, useAppState } from '@src/overmind';
import { Story } from '@src/types';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
//@ts-ignore
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import NoStories from './NoStories';
import StoryCard from './StoryCard';

interface CollectionProps {
  filters: Map<string, number>;
  isLoading: boolean;
  handleAddDialogOpen: () => void;
  searchQuery: string | undefined;
  triggerEditStory: (value: number) => void;
  groupId?: number;
}

const Collection: FC<CollectionProps> = ({
  filters,
  groupId,
  handleAddDialogOpen,
  isLoading,
  searchQuery,
  triggerEditStory,
}) => {
  const { story } = useAppState();
  const actions = useActions();
  const [filteredItems, setFilteredItems] = useState<Story[]>([]);

  useEffect(() => {
    setFilteredItems(items());
    return () => {};
  }, [filters, searchQuery, groupId, story.stories]);

  useEffect(() => {
    fetchStories();
    return () => {};
  }, [groupId]);

  const fetchStories = async () => {
    isLoading = true;
    groupId ? await actions.story.getStoriesByGroup(groupId) : await actions.story.getStories();
    isLoading = false;
  };

  const items = () => {
    return story.stories
      .filter((item) => {
        if (filters.size === 0) return true;
        let match = true;
        for (const [prop, value] of Array.from(filters.entries())) {
          switch (prop) {
            case 'user.id': {
              if (!item.user) {
                match = false;
                break;
              }
              match = item.user.id === value;
              break;
            }
            case 'published': {
              const valueAPublished: boolean = value === 1 ? true : false;
              match = !!item.publishedDate === valueAPublished;
              break;
            }
            default: {
              match = item[prop as keyof Story] === value;
              break;
            }
          }

          if (match === false) break;
        }
        return match;
      })
      .filter((item) => {
        if (!searchQuery) return item;
        const userFullName = item.user ? `${item.user.firstName} ${item.user.lastName}` : '';
        const match =
          item.title.toLowerCase().match(searchQuery.toLowerCase()) ||
          userFullName.toLowerCase().match(searchQuery.toLowerCase());
        return match;
      });
  };

  const showSkeleton = (qty = 5) => {
    return new Array(qty)
      .fill(0)
      .map((sk, i) => (
        <Skeleton key={i} height={200} sx={{ m: 2.5 }} variant="rectangular" />
      ));
  };

  return (
    <Box>
      {!isLoading && filteredItems.length == 0 && <NoStories openDialog={handleAddDialogOpen} />}
      <AnimatePresence initial={false}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1400: 3, 1800: 4 }}>
          <Masonry>
            {isLoading
              ? showSkeleton(4)
              : filteredItems.map((story) => (
                  <Box
                    key={story.id}
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <StoryCard showEdit={true} story={story} triggerEditStory={triggerEditStory} />
                  </Box>
                ))}
          </Masonry>
        </ResponsiveMasonry>
      </AnimatePresence>
    </Box>
  );
};

export default Collection;
