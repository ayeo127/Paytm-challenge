import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './local-storage';
import { combinedReducers } from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedProfiles = loadState('profiles');
const persistedReviews = loadState('reviews');
const persistedActiveProfile = loadState('activeProfile');
const persistedActiveTab = loadState('activeTab');

const store = createStore(
  combinedReducers,
  {
    profiles: persistedProfiles,
    reviews: persistedReviews,
    activeProfile: persistedActiveProfile,
    activeTab: persistedActiveTab,
  },
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
  saveState('profiles', store.getState().profiles);
  saveState('reviews', store.getState().reviews);
  saveState('activeProfile', store.getState().activeProfile);
  saveState('activeTab', store.getState().activeTab);
}, 1000));

export { store };
