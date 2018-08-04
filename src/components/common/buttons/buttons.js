import React from 'react';
import PropTypes from 'prop-types';

import { CloseCircle } from '../icons';

import './buttons.scss';

export const ButtonContinue = ({ children, onClick }) => (
  <button type="button" className="button button--continue" onClick={onClick}>
    {children}
  </button>
);

ButtonContinue.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const ButtonAdd = ({ children, onClick }) => (
  <button type="button" className="button button--add" onClick={() => onClick()}>
    {children}
    <div className="button--add__icon"><CloseCircle /></div>
  </button>
);

ButtonAdd.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
