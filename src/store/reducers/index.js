import { combineReducers } from 'redux';

import { profiles } from './profile';
import { reviews } from './review';
import { activeProfile } from './active-profile';
import { activeTab } from './active-tab';

export const combinedReducers = combineReducers({
  activeProfile,
  activeTab,
  profiles,
  reviews,
});
