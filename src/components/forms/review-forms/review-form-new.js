import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import findKey from 'lodash/findKey';

import { ButtonContinue } from 'components/common';
import { actions } from 'store';
import {
  validateReview,
  validateProfile,
  getUpdatedReviewer,
  getProfileById,
  createNewReview,
  renderProfileOptions,
} from '../form-utils';

import './review-form.scss';

class _ReviewFormNew_ extends Component {
  constructor(props) {
    super(props);
    this.receiverRef = createRef();
    this.descriptionRef = createRef();
    this.reviewerRef = createRef();
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      error: null,
    };
  }

  /*
    Method of adding a new review.
    1) create new review
    2) update reviewer profile
    3) validate review and reviewer
    4) save changes in redux store
    5) close the modal
  */
  handleAdd() {
    const {
      addReview, closeModal, profiles, reviews,
    } = this.props;
    const reviewerId = this.reviewerRef.current.value;
    const receiverId = this.receiverRef.current.value;
    const description = this.descriptionRef.current.value;

    if (reviewerId === receiverId) {
      this.setState({ error: 'one cannot review oneself !' });
      return;
    }
    if (findKey(reviews, { receiverId, reviewerId })) {
      this.setState({ error: 'looks like such assignment already exists!' });
      return;
    }
    const newReview = createNewReview(null, reviewerId, receiverId, description);
    const updatedReviewer = getUpdatedReviewer(newReview.id, getProfileById(profiles, reviewerId));

    if (validateReview(newReview) && validateProfile(updatedReviewer)) {
      addReview(newReview, [updatedReviewer]);
      closeModal();
    } else {
      this.setState({ error: 'looks like there is an error with the form!' });
      this.receiverRef.current.focus();
    }
  }

  render() {
    const { profiles } = this.props;
    const { error } = this.state;
    return (
      <form>
        <div>
          <div>Receiver</div>
          {renderProfileOptions(profiles, this.receiverRef, 'error')}

          <div className="review-form__description-label">Feedback</div>
          <textarea className="review-form__description" ref={this.descriptionRef} id="description" />

          <div>Reviewer</div>
          {renderProfileOptions(profiles, this.reviewerRef, 'error')}
        </div>
        <div className="review-form__button">
          <ButtonContinue onClick={this.handleAdd}>Add</ButtonContinue>
        </div>
        { error && <div className="review-form__error">{error}</div> }
      </form>
    );
  }
}

_ReviewFormNew_.propTypes = {
  reviews: PropTypes.object.isRequired,
  addReview: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  reviews: state.reviews,
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => ({
  addReview: (review, profiles) => (
    dispatch(actions.setReview(review, profiles))
  ),
});

export const ReviewFormNew = connect(mapStateToProps, mapDispatchToProps)(_ReviewFormNew_);
