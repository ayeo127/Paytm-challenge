import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './card.scss';

export const Card = ({ children, flex, flexCol }) => (
  <div className={classnames('card', { 'card--flex': flex, 'card--flex--col': flexCol })}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  flex: PropTypes.bool,
  flexCol: PropTypes.bool,
};

Card.defaultProps = {
  flex: true,
  flexCol: true,
};
