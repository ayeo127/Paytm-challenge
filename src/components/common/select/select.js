import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './select.scss';

export const Select = forwardRef(({
  children, onChange, Icon, defaultMessage, defaultValue,
}, ref) => (
  <div className="select">
    <select className="select__input" onChange={onChange} defaultValue={defaultValue} ref={ref}>
      {defaultMessage && <option defaultValue value="error">{defaultMessage}</option>}
      {children}
    </select>
    {Icon && <div className="select__icon"><Icon /></div>}
  </div>
));

Select.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  Icon: PropTypes.func,
  defaultMessage: PropTypes.string,
  defaultValue: PropTypes.string,
};

Select.defaultProps = {
  onChange: () => {},
  Icon: null,
  defaultMessage: null,
  defaultValue: null,
};
