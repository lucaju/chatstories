import { Context } from 'overmind';
import { isError } from '../../util/utilities';
import type { ErrorMessage, Intent, Entity } from '../../types';

export const getIntents = async ({
  state,
  effects,
}: Context): Promise<Intent[] | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntents(
    storyId,
    authUser.token
  );

  if (isError(response)) return response;

  state.intents.collection = response;
  return state.intents.collection;
};

export const getIntent = async (
  { state, effects }: Context,
  intentName: string
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getIntent(
    storyId,
    intentName,
    authUser.token
  );
  if (isError(response)) return response;

  state.intents.currentIntent = response;
  return response;
};

export const createIntent = async (
  { state, effects }: Context,
  intent: Intent
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.createIntent(
    storyId,
    intent,
    authUser.token
  );
  if (isError(response)) return response;

  state.intents.collection = [intent, ...state.intents.collection];

  return response;
};

export const updateIntent = async (
  { state, effects }: Context,
  intent: Intent
): Promise<Intent | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.updateIntent(
    storyId,
    intent,
    authUser.token
  );
  if (isError(response)) return response;

  state.intents.collection = state.intents.collection.map((itt) => {
    if (response.name === itt.name) return response;
    return intent;
  });

  return response;
};

export const deleteIntent = async (
  { state, effects }: Context,
  intentName: string
): Promise<boolean | ErrorMessage> => {
  const storyId = state.story.currentStory?.id;
  if (!storyId) return { errorMessage: 'No Story' };

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.deleteIntent(
    storyId,
    intentName,
    authUser.token
  );
  if (isError(response)) return response;

  state.intents.currentIntent = undefined;
  state.intents.collection = state.intents.collection.filter(
    (itt) => itt.name !== intentName
  );
  return true;
};

//** Entity */

export const getEntities = async ({
  state,
  effects,
}: Context): Promise<Entity[] | ErrorMessage> => {
  if (state.intents.entities.length > 0) return state.intents.entities;

  const authUser = state.session.user;
  if (!authUser || !authUser.token) return { errorMessage: 'Not authorized' };

  const response = await effects.intents.api.getEntities(authUser.token);
  if (isError(response)) return response;

  state.intents.entities = response;
  return response;
};