import omit from 'lodash/omit';
import { data } from '../local-storage';
import { actionTypes } from '../actions';

export const profiles = (state = data.profiles, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILES:
      return action.profiles;
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        [action.profile.id]: action.profile,
      };
    case actionTypes.DELETE_PROFILE:
      return omit(state, action.profile.id);
    default:
      return state;
  }
};
