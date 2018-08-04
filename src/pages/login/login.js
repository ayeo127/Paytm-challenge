import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import classnames from 'classnames';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { actions } from 'store';
import {
  Card, Select, ButtonContinue, User, withError,
} from 'components';

import './login.scss';

/*
  Login screen is the first screen you land on.
  It has a dropdown where you can select the profile to login as
*/
export const _Login_ = ({
  profiles, handleSelect, handleContinue, hasError,
}) => (
  <div className="container container--flex container--flex--col">
    <div className={classnames('login', { 'login--error': hasError })}>
      <Card>
        <h2>Who are you?</h2>
        <Select
          onChange={handleSelect}
          defaultMessage="Please select your name"
          Icon={User}
        >{
          Object.values(profiles).map(profile => (
            <option key={profile.id} value={profile.id}>
              {`${profile.role} - ${profile.name}`}
            </option>
          ))
        }
        </Select>
        { hasError && <div className="login__error">We have encountered an error!</div>}
        <div className="login__continue">
          <ButtonContinue onClick={handleContinue}>
            Continue
          </ButtonContinue>
        </div>
      </Card>
    </div>
  </div>
);

_Login_.propTypes = {
  profiles: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  profiles: state.profiles,
});

export const mapDispatchToProps = dispatch => ({
  setActiveProfile: selected => dispatch(actions.setActiveProfile(selected)),
});

/*
Methods:
  handleSelect: upon selecting a value from the dropdown, it sets the state for selected profile
  handleContinue:
    upon clicking continue button, you login with the selected profile and navigate to /dashboard
*/
const enhance = compose(
  withError,
  withState('selected', 'select', null),
  withHandlers({
    handleSelect: ({ select, setHasError }) => (event) => {
      select(event.target.value);
      setHasError(false);
    },
    handleContinue: ({
      setActiveProfile, selected, profiles, history, showError,
    }) => () => {
      if (selected && selected !== 'error') {
        setActiveProfile(find(profiles, (profile => profile.id === selected)));
        history.push('./dashboard');
      } else {
        showError();
      }
    },
  }),
);

export const Login = connect(mapStateToProps, mapDispatchToProps)(enhance(_Login_));
