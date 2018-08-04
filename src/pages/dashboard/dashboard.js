import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import isEmpty from 'lodash/isEmpty';

import { actions } from 'store';
import { Header } from 'components';
import { Reviews, Profiles } from 'sections';

import './dashboard.scss';

/*
  Dashboard screen is where you can see the reviews / profiles (employees).
  It renders a header for the tabs.
  It renders either Reviews or Profiles based on the active Tab.
*/
export const _Dashboard_ = ({
  activeTab, setActiveTab, isAdminView, history,
}) => (
  <Fragment>
    <Header
      tabOnClick={setActiveTab}
      profileOnClick={() => { history.push('./'); setActiveTab('0'); }}
      isAdminView={isAdminView}
      activeTab={activeTab}
    />
    <div className="dashboard--container">
      {
        // based on which tab is active, render accordingly
        activeTab === '0'
          ? <Reviews />
          : <Profiles />
      }
    </div>
  </Fragment>
);

_Dashboard_.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  isAdminView: PropTypes.bool.isRequired,
  history: PropTypes.any.isRequired,
};

const enhance = compose(
  lifecycle({
    componentWillMount() {
      if (isEmpty(this.props.activeProfile)) {
        this.props.setActiveTab('0');
        this.props.history.push('/');
      }
    },
    componentWillUnmount() {
      this.props.setActiveTab('0');
    },
  }),
);

export const mapStateToProps = state => ({
  activeProfile: state.activeProfile,
  isAdminView: (state.activeProfile.role ? state.activeProfile.role === 'Admin' : false),
  activeTab: state.activeTab,
});

export const mapDispatchToProps = dispatch => ({
  setActiveTab: tab => dispatch(actions.setActiveTab(tab)),
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(enhance(_Dashboard_));
