import { derived } from 'overmind';

export const state = {
  user: null,
  isSignedIn: derived((state) => state.user !== null),
  isAdmin: derived((state) => state.user?.roleType === 'Admin'),
  stories: null,
  story: null,
};
