import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

import {
  ButtonAdd,
  Modal,
  Select,
  Settings,
  Review,
  ReviewFormNew,
  ReviewFormEdit,
  ReviewFormEditAdmin,
  enhanceWithModal,
  formUtils,
} from 'components';

import './reviews.scss';

/* Method for rendering the subheader */
const renderSubHeader = (isAdminView, openModal) => (
  <div className="reviews__header">
    <div>
      <h1>{isAdminView ? 'Here are all the reviews' : 'Here are your reviews'}</h1>
      click on a review to edit
    </div>
    <div className="reviews__options">
      <Select defaultMessage="Select sort by" Icon={Settings}>
        <option value="reviews-latest">Reviews by latest</option>
        <option value="reviews-oldest">Reviews by oldest</option>
      </Select>
      {
        isAdminView && <ButtonAdd onClick={openModal}>Add Review</ButtonAdd>
      }
    </div>
  </div>
);

/*
Method for rendering the reviews.
When isAdminView is true, it renders all the reviews.
When is is false, it renders reviews assigned to the logged in user profile.

Upon clicking on a review, it sets the review object as 'ModalContext' state.
Modal and forms uses this state ('ModalContext') to understand which review it needs to act on.
*/
const renderReviews = (reviews, openModal, isAdminView, activeProfile, profiles) => (
  <div className="reviews__list">
    {
      Object.values(reviews).map(review => (
        (isAdminView || includes(activeProfile.reviewed, review.id, 0))
          ? (
            <Review
              key={review.id}
              review={review}
              onClick={openModal}
              reviewer={formUtils.getProfileById(profiles, review.reviewerId)}
              receiver={formUtils.getProfileById(profiles, review.receiverId)}
            />
          )
          : null
      ))
    }
  </div>
);

/*
Method for rendering the review form inside the modal.
There are three different forms:
  1) ReviewFormNew : form for entering a new review
  2) ReviewFormEditAdmin : form for editing / deleting a review from an Admin's view
  3) ReviewFormEdit : form for editing a review from an employee's view
*/
const renderReviewForm = (isAdminView, review, closeModal) => {
  if (!review) {
    return (<ReviewFormNew closeModal={closeModal} />);
  }
  if (isAdminView) {
    return (<ReviewFormEditAdmin review={review} closeModal={closeModal} />);
  }
  return (<ReviewFormEdit review={review} closeModal={closeModal} />);
};

const renderModal = (
  isModalOpen, closeModal, modalContext, isAdminView,
) => (
  isModalOpen && (
    <Modal onClose={closeModal} title={modalContext ? 'Edit this review' : 'Add new review'}>
      <div className="reviews__modal" />
      {renderReviewForm(isAdminView, modalContext, closeModal)}
    </Modal>
  )
);

const _Reviews_ = ({
  reviews,
  activeProfile,
  isAdminView,
  isModalOpen,
  closeModal,
  modalContext,
  openModal,
  profiles,
}) => (
  <Fragment>
    { renderSubHeader(isAdminView, openModal) }
    { !isEmpty(reviews) && renderReviews(reviews, openModal, isAdminView, activeProfile, profiles) }
    { renderModal(isModalOpen, closeModal, modalContext, isAdminView) }
  </Fragment>
);

_Reviews_.propTypes = {
  reviews: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
  activeProfile: PropTypes.object.isRequired,
  isAdminView: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  modalContext: PropTypes.object,
};

_Reviews_.defaultProps = {
  modalContext: null,
};

const mapStateToProps = state => ({
  reviews: state.reviews,
  profiles: state.profiles,
  activeProfile: state.activeProfile,
  isAdminView: state.activeProfile.role === 'Admin',
});

/*
enhanceWithModal is a hoc that adds the following props:
  isModalOpen: state for modal is opne
  closeModal: callback for closing modal
  openModal: callback for opening modal
  modalContext: state for modal to refer to
    (ex. review object that was clicked on to open the modal)
*/
export const Reviews = connect(mapStateToProps)(enhanceWithModal(_Reviews_));
