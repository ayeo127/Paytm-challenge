import { data } from '../local-storage';
import { actionTypes } from '../actions';

export const activeTab = (state = data.activeTab, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_TAB:
      return action.activeTab;
    default:
      return state;
  }
};
