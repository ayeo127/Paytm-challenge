import React from 'react';
import PropTypes from 'prop-types';
import { User } from 'components';

import './review.scss';

export const Review = ({
  review, onClick, reviewer, receiver,
}) => {
  if (!review || !reviewer || !receiver) {
    return null;
  }
  return (
    <button type="button" className="review" onClick={() => onClick(review)}>
      <div className="review__receiver">
        <div className="review__icon"><User /></div>
        {`${receiver.role} - ${receiver.name}`}
      </div>
      <div className="review__description">
        {`"${review.description}"`}
      </div>
      <div className="review__reviewer">
        {`Reviewed by: ${reviewer.name}`}
      </div>
    </button>
  );
};

/* eslint-disable react/forbid-prop-types */
Review.propTypes = {
  review: PropTypes.object,
  reviewer: PropTypes.object,
  receiver: PropTypes.object,
  onClick: PropTypes.func,
};

Review.defaultProps = {
  review: null,
  reviewer: null,
  receiver: null,
  onClick: () => {},
};
