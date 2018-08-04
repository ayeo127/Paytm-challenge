import React from 'react';
import PropTypes from 'prop-types';

import './profile.scss';

export const Profile = ({ profile, onClick }) => {
  if (!profile) {
    return null;
  }
  return (
    <button type="button" className="profile" onClick={() => onClick(profile)}>
      <div className="profile__role-name">
        {`${profile.role} - ${profile.name}`}
      </div>
    </button>
  );
};

/* eslint-disable react/forbid-prop-types */
Profile.propTypes = {
  profile: PropTypes.object,
  onClick: PropTypes.func,
};

Profile.defaultProps = {
  profile: null,
  onClick: () => {},
};
