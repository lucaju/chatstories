import { Box, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { FC } from 'react';
import SearchBox from '../../../../components/menubar/SearchBox';
import { HandleFilterType } from '../../../../types';
import { useTranslation } from 'react-i18next';

interface MenuBarProps {
  handleDetailOpen: () => void;
  handleSearch: (value: string) => void;
  updateFilter: ({ type, value, reset }: HandleFilterType) => void;
  disabledFilters?: boolean;
}

const useStyles = makeStyles(({ spacing }) => ({
  marginRight: { marginRight: spacing(2) },
}));

const MenuBar: FC<MenuBarProps> = ({
  handleDetailOpen,
  handleSearch,
  updateFilter,
  disabledFilters = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(['intents']);

  return (
    <Toolbar disableGutters variant="dense">
      <Button color="primary" onClick={handleDetailOpen} startIcon={<AddCircleOutlineIcon />}>
        {t('createIntent')}
      </Button>
      {!disabledFilters && (
        <>
          <Box flexGrow={1} />
          <SearchBox className={classes.marginRight} handleSearch={handleSearch} />
        </>
      )}
    </Toolbar>
  );
};

export default MenuBar;
