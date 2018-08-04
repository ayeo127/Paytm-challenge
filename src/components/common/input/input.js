import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './input.scss';

export const Input = forwardRef(({
  onChange, defaultValue,
}, ref) => (
  <input className="input" onChange={onChange} defaultValue={defaultValue} ref={ref} />
));

Input.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

Input.defaultProps = {
  onChange: () => {},
  defaultValue: null,
};
