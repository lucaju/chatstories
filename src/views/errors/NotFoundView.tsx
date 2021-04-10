import React, { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from '../../components/Page';
import Logo from '../../components/Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginBottom: theme.spacing(8),
    width: 300,
  },
}));

const NotFoundView: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation(['notFound']);

  return (
    <Page className={classes.root} title={t('pageNotFound')}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md" className={classes.container}>
          <RouterLink to="/">
            <Logo type="full" className={classes.logo} />
          </RouterLink>
          <Typography align="center" color="textPrimary" variant="h4">
            {t('title404')}
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            <Trans i18nKey="notFound:message404">
              You either tried some shady route or you came here by mistake. Go
              back to the <RouterLink to="/">main page.</RouterLink>
            </Trans>
          </Typography>
          <Box textAlign="center">
            <img
              alt="Under development"
              className={classes.image}
              src="/assets/images/undraw_not_found_60pq.svg"
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;