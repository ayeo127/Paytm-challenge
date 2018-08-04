import * as ActionTypes from './action-types';

const _setInitialProfiles_ = profiles => ({
  type: ActionTypes.SET_PROFILES,
  profiles,
});

const _setInitialReviews_ = reviews => ({
  type: ActionTypes.SET_REVIEWS,
  reviews,
});

const _setActiveProfile_ = activeProfile => ({
  type: ActionTypes.SET_ACTIVE_PROFILE,
  activeProfile,
});

const _setActiveTab_ = activeTab => ({
  type: ActionTypes.SET_ACTIVE_TAB,
  activeTab,
});

const _setReview_ = review => ({
  type: ActionTypes.SET_REVIEW,
  review,
});

const _setProfile_ = profile => ({
  type: ActionTypes.SET_PROFILE,
  profile,
});

const _deleteReview_ = review => ({
  type: ActionTypes.DELETE_REVIEW,
  review,
});

const _deleteProfile_ = profile => ({
  type: ActionTypes.DELETE_PROFILE,
  profile,
});

export const setInitialProfiles = data => dispatch => dispatch(_setInitialProfiles_(data));
export const setInitialReviews = data => dispatch => dispatch(_setInitialReviews_(data));
export const setActiveProfile = data => dispatch => dispatch(_setActiveProfile_(data));
export const setActiveTab = data => dispatch => dispatch(_setActiveTab_(data));

export const setReview = (review, profiles) => (dispatch) => {
  dispatch(_setReview_(review));
  profiles.forEach((profile) => {
    dispatch(_setProfile_(profile));
  });
};

export const deleteReview = (review, profiles) => (dispatch) => {
  dispatch(_deleteReview_(review));
  profiles.forEach((profile) => {
    dispatch(_setProfile_(profile));
  });
};

export const setProfile = (profile, reviews) => (dispatch) => {
  dispatch(_setProfile_(profile));
  reviews.forEach((review) => {
    dispatch(_setReview_(review));
  });
};

export const deleteProfile = (profile, reviews) => (dispatch) => {
  dispatch(_deleteProfile_(profile));
  reviews.forEach((review) => {
    dispatch(_deleteReview_(review));
  });
};
