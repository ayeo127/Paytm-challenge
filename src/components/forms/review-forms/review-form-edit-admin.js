import React, { Fragment, createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Select, User, ButtonContinue } from 'components/common';
import { actions } from 'store';
import {
  validateReview,
  validateProfile,
  getUpdatedReview,
  getUpdatedReviewer,
  getProfileById,
} from '../form-utils';
import './review-form.scss';

class _ReviewFormEditAdmin_ extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.receiverRef = createRef();
    this.descriptionRef = createRef();
    this.reviewerRef = createRef();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  /*
    Method for deleting a review
    1) update reviewer profile
    2) validate reviewer
    3) save changes in redux store
      - delete review, update reviewer profile
    4) close the modal
  */
  handleDelete() {
    const {
      deleteReview, closeModal, profiles, review,
    } = this.props;

    const updatedReviewer = getUpdatedReviewer(review.id, getProfileById(profiles, review.reviewerId), 'delete');
    if (validateProfile(updatedReviewer)) {
      deleteReview(review, [updatedReviewer]);
      closeModal();
    }
  }

  /*
    Method of saving changes to a review.
    1) update current review
    2) update old reviewer profile (remove this review from old reviewer's reviews list)
    3) update new reviewer profile
    4) validate review and reviewer
    5) save changes in redux store
    6) close the modal
  */
  handleSave() {
    const {
      editReview, closeModal, profiles, review,
    } = this.props;
    const reviewerId = this.reviewerRef.current.value;
    const receiverId = this.receiverRef.current.value;
    const description = this.descriptionRef.current.value;

    if (reviewerId === receiverId) { this.setState({ error: 'one cannot review oneself!' }); return; }

    const newReview = getUpdatedReview(review.id, reviewerId, receiverId, description);
    const oldReviewer = getUpdatedReviewer(newReview.id, getProfileById(profiles, review.reviewerId), 'delete');
    const updatedReviewer = getUpdatedReviewer(newReview.id, getProfileById(profiles, reviewerId));

    // validate
    if (validateReview(newReview)
    && validateProfile(oldReviewer)
    && validateProfile(updatedReviewer)) {
      editReview(newReview, [oldReviewer, updatedReviewer]);
      closeModal();
    } else {
      this.receiverRef.current.focus();
    }
  }

  render() {
    const { review, reviewReceiver, reviewReviewer } = this.props;
    const { error } = this.state;
    return (
      <Fragment>
        <div>Receiver</div>
        <Select Icon={User} defaultValue={reviewReceiver.id} ref={this.receiverRef}>
          <option key={reviewReceiver.id} value={reviewReceiver.id}>
            {`${reviewReceiver.role} - ${reviewReceiver.name}`}
          </option>
        </Select>

        <div className="review-form__description-label">Feedback</div>
        <textarea className="review-form__description" ref={this.descriptionRef} defaultValue={review.description} />

        <div>Reviewer</div>
        <Select Icon={User} defaultValue={reviewReviewer.id} ref={this.reviewerRef}>
          <option key={reviewReviewer.id} value={reviewReviewer.id}>
            {`${reviewReviewer.role} - ${reviewReviewer.name}`}
          </option>
        </Select>

        <div className="review-form__button review-form__button--space-between">
          <ButtonContinue onClick={this.handleDelete}>Delete This Review</ButtonContinue>
          <ButtonContinue onClick={this.handleSave}>Save</ButtonContinue>
        </div>
        { error && <div className="review-form__error">{error}</div>}
      </Fragment>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
_ReviewFormEditAdmin_.propTypes = {
  review: PropTypes.object.isRequired,
  reviewReceiver: PropTypes.object.isRequired,
  reviewReviewer: PropTypes.object.isRequired,
  editReview: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  profiles: state.profiles,
  reviewReceiver: getProfileById(state.profiles, ownProps.review.receiverId),
  reviewReviewer: getProfileById(state.profiles, ownProps.review.reviewerId),
});

const mapDispatchToProps = dispatch => ({
  editReview: (review, profiles) => (
    dispatch(actions.setReview(review, profiles))
  ),
  deleteReview: (review, profiles) => (
    dispatch(actions.deleteReview(review, profiles))
  ),
});

export const ReviewFormEditAdmin = connect(
  mapStateToProps, mapDispatchToProps,
)(_ReviewFormEditAdmin_);
