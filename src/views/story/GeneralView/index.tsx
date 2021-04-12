import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from '@material-ui/core';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Page from '../../../components/Page';
import { useApp } from '../../../overmind';
import { NotificationType, Story } from '../../../types';
import { isError } from '../../../util/utilities';
import BottomBar from './BottomBar';
import Main from './main';
import SideBar from './sidebar';

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    minHeight: '100%',
    paddingBottom: spacing(3),
    paddingTop: spacing(3),
  },
  container: { height: 'calc(100vh - 64px - 68px - 36px)' },
}));

const title = 'Juno Chatbot';

const GeneralView: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { storyId } = useParams();
  const { state, actions } = useApp();
  const { t } = useTranslation([
    'storyGeneral',
    'common',
    'errorMessages, deleteDialog',
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState<Story | undefined>(
    state.story.currentStory
  );

  useEffect(() => {
    if (!storyId) return navigate('/app', { replace: true });

    const getStory = async () => {
      setIsLoading(true);
      const story = await actions.story.getStory(Number(storyId));
      if (isError(story)) return navigate('/app', { replace: true });

      setStoryData(story);
      actions.ui.setPageTitle(story.title);

      setIsLoading(false);
    };

    !state.story.currentStory
      ? getStory()
      : actions.ui.setPageTitle(state.story.currentStory.title);

    return () => {};
  }, []);

  const formValidation = Yup.object().shape({
    id: Yup.number(),
    title: Yup.string().trim().max(125).required(t('common:required')),
    languageCode: Yup.string(),
    synopsis: Yup.string(),
    imageUrl: Yup.mixed(),
    publishedDate: Yup.mixed(),
    botAvatar: Yup.string(),
    botName: Yup.string(),
    botPersona: Yup.string(),
    botDelay: Yup.number(),
  });

  const submit = async (values: Story) => {
    if (!storyData) return;
    const response = actions.story.updateStory({ storyData, values });

    const type = isError(response)
      ? NotificationType.ERROR
      : NotificationType.SUCCESS;

    const message = isError(response)
      ? 'errorMessages:somethingWentWrong'
      : t('storyUpdated');

    actions.ui.showNotification({ message, type });
  };

  return (
    <Page className={classes.root} title={state.ui.pageTitle}>
      {isLoading ? (
        <Box
          display="flex"
          height="100%"
          justifyContent="center"
          alignItems="flex-start"
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : storyData ? (
        <>
          <Formik
            enableReinitialize={true}
            initialValues={storyData}
            onSubmit={submit}
            validationSchema={formValidation}
          >
            {({
              dirty,
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box height="100%">
                  <Container className={classes.container} maxWidth={false}>
                    <Box
                      alignItems="flex-start"
                      display="flex"
                      flexDirection="row"
                    >
                      <Box flexGrow={1} maxWidth="770px" pr={2}>
                        <Main
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          touched={touched}
                          values={values}
                        />
                      </Box>
                      <Box width="330px">
                        <SideBar values={values} />
                      </Box>
                    </Box>
                  </Container>
                </Box>
                <Box ml={3} mr={3} maxWidth="1100px">
                  <BottomBar
                    dirty={dirty}
                    isSubmitting={isSubmitting}
                    name={'publishedDate'}
                  />
                </Box>
              </form>
            )}
          </Formik>
        </>
      ) : (
        ''
      )}
    </Page>
  );
};

export default GeneralView;
