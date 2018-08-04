import omit from 'lodash/omit';
import { data } from '../local-storage';
import { actionTypes } from '../actions';

export const reviews = (state = data.reviews, action) => {
  switch (action.type) {
    case actionTypes.SET_REVIEWS:
      return action.reviews;
    case actionTypes.SET_REVIEW:
      return {
        ...state,
        [action.review.id]: action.review,
      };
    case actionTypes.DELETE_REVIEW:
      return omit(state, action.review.id);
    default:
      return state;
  }
};
