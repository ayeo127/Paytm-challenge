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

class _ReviewFormEdit_ extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.receiverRef = createRef();
    this.descriptionRef = createRef();
    this.reviewerRef = createRef();
    this.handleSave = this.handleSave.bind(this);
  }

  /*
    Method of saving changes to a review.
    1) update current review
    2) update reviewer profile
    3) validate review and reviewer
    4) save changes in redux store
    5) close the modal
  */
  handleSave() {
    const {
      editReview, closeModal, review, reviewReceiver, reviewReviewer,
    } = this.props;

    const description = this.descriptionRef.current.value;

    if (description === '') { this.setState({ error: 'you need to add comments to your review!' }); return; }

    const updatedReview = getUpdatedReview(
      review.id, reviewReviewer.id, reviewReceiver.id, description,
    );
    const updatedReviewer = getUpdatedReviewer(updatedReview.id, reviewReviewer);

    if (validateReview(updatedReview) && validateProfile(updatedReviewer)) {
      editReview(updatedReview, [updatedReviewer]);
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
        <textarea className="review-form__description" defaultValue={review.description} ref={this.descriptionRef} />

        <div>Reviewer</div>
        <Select Icon={User} defaultValue={reviewReviewer.id} ref={this.reviewerRef}>
          <option key={reviewReviewer.id} value={reviewReviewer.id}>
            {`${reviewReviewer.role} - ${reviewReviewer.name}`}
          </option>
        </Select>

        <div className="review-form__button">
          <ButtonContinue onClick={this.handleSave}>Save</ButtonContinue>
        </div>
        { error && <div className="review-form__error">{error}</div>}
      </Fragment>
    );
  }
}

_ReviewFormEdit_.propTypes = {
  review: PropTypes.object.isRequired,
  reviewReceiver: PropTypes.object.isRequired,
  reviewReviewer: PropTypes.object.isRequired,
  editReview: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  reviewReceiver: getProfileById(state.profiles, ownProps.review.receiverId),
  reviewReviewer: getProfileById(state.profiles, ownProps.review.reviewerId),
});

const mapDispatchToProps = dispatch => ({
  editReview: (review, profiles) => (
    dispatch(actions.setReview(review, profiles))
  ),
});

export const ReviewFormEdit = connect(mapStateToProps, mapDispatchToProps)(_ReviewFormEdit_);
