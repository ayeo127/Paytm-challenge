import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './header.scss';

// set className based on whether the tab is active or inactive
const tabClassNames = (activeIndex, thisIndex) => (
  classnames(
    'header__section',
    'header__section--tab',
    { 'header__section--tab--active': activeIndex === thisIndex },
  )
);

export const Header = ({
  activeTab, tabOnClick, profileOnClick, isAdminView,
}) => (
  <div className="header header--row">
    <button type="button" className={tabClassNames(activeTab, '0')} onClick={() => tabOnClick('0')}>
      Reviews
    </button>
    {
      isAdminView && (
        <button type="button" className={tabClassNames(activeTab, '1')} onClick={() => tabOnClick('1')}>
          Employees
        </button>)
    }
    <button type="button" className="header__section header__section--profile" onClick={profileOnClick}>
      Sign out
    </button>
  </div>
);

Header.propTypes = {
  activeTab: PropTypes.string,
  tabOnClick: PropTypes.func.isRequired,
  profileOnClick: PropTypes.func.isRequired,
  isAdminView: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  activeTab: 0,
};
