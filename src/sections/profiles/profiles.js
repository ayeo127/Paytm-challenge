import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {
  ButtonAdd,
  Profile,
  Modal,
  Select,
  Settings,
  ProfileFormNew,
  ProfileFormEdit,
  enhanceWithModal,
} from 'components';

import './profiles.scss';

const renderSubHeader = openModal => (
  <div className="profiles__header">
    <div><h1>Here are all the Employees</h1>click on a employee to edit</div>
    <div className="profiles__options">
      <Select defaultMessage="Select sort by" Icon={Settings}>
        <option value="profiles-latest">Employees by role</option>
        <option value="profiles-oldest">Employees by name</option>
      </Select>
      <ButtonAdd onClick={openModal}>Add Profile</ButtonAdd>
    </div>
  </div>
);

/*
Method for rendering the profiles.

Upon clicking on a review, it sets the profile object as 'ModalContext' state.
Modal and forms uses this state ('ModalContext') to understand which profile it needs to act on.
*/
const renderProfiles = (profiles, openModal) => (
  <div className="profiles__list">
    {
      Object.values(profiles).map(profile => (
        <Profile key={profile.id} profile={profile} onClick={openModal} />
      ))
    }
  </div>
);

/*
Method for rendering the profile form inside the modal.
There are two different forms:
  1) ProfileFormNew : form for entering a new profile
  2) ProfileFormEdit : form for editing / deleting a profile
*/
const renderModal = (isModalOpen, closeModal, modalContext) => (
  isModalOpen && (
    <Modal onClose={closeModal} title="Edit this profile">
      <div className="profiles__modal" />
      { modalContext
        ? <ProfileFormEdit closeModal={closeModal} profile={modalContext} />
        : <ProfileFormNew closeModal={closeModal} />}
    </Modal>
  )
);

const _Profiles_ = ({
  profiles,
  isModalOpen,
  closeModal,
  modalContext,
  openModal,
}) => (
  <Fragment>
    { renderSubHeader(openModal) }
    { !isEmpty(profiles) && renderProfiles(profiles, openModal) }
    { renderModal(isModalOpen, closeModal, modalContext) }
  </Fragment>
);

_Profiles_.propTypes = {
  profiles: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  modalContext: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

_Profiles_.defaultProps = {
  modalContext: null,
};

const mapStateToProps = state => ({
  profiles: state.profiles,
});

/*
enhanceWithModal is a hoc that adds the following props:
  isModalOpen: state for modal is opne
  closeModal: callback for closing modal
  openModal: callback for opening modal
  modalContext: state for modal to refer to
    (ex. profile object that was clicked on to open the modal)
*/
export const Profiles = connect(mapStateToProps)(enhanceWithModal(_Profiles_));
