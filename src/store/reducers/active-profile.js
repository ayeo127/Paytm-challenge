import { data } from '../local-storage';
import { actionTypes } from '../actions';

export const activeProfile = (state = data.activeProfile, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_PROFILE:
      return action.activeProfile;
    default:
      return state;
  }
};
