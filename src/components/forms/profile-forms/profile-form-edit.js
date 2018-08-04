import React, { Fragment, createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ButtonContinue, Input, ButtonAdd, Select,
} from 'components/common';
import { actions } from 'store';
import {
  renderProfileOptions,
  filterDuplicates,
  renderProfilesToReview,
  getUpdatedProfile,
  createNewReview,
  getArrayDifference,
  validateProfile,
  validateReview,
} from '../form-utils';
import './profile-form.scss';

class _ProfileFormEdit_ extends Component {
  constructor(props) {
    super(props);

    /*
      profilesToReview: list of profileIds that this profile needs to review
      (In other words, ids of employee this profile needs to do performance review for)

      initialReviews: List of reviews that this profile initially was linked to.
    */
    this.state = {
      profilesToReview: [],
      initialReviews: [],
      error: null,
    };
    this.nameRef = createRef();
    this.roleRef = createRef();
    this.profilesToReviewRef = createRef();
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
    this.handleReviewRemove = this.handleReviewRemove.bind(this);
  }

  componentDidMount() {
    const { profile, reviews } = this.props;
    if (profile.reviewed && profile.reviewed.length > 0) {
      const initialReviews = profile.reviewed.map(reviewId => (
        reviews[reviewId]
      ));
      this.setState({ initialReviews });
      if (initialReviews) {
        this.setState({ profilesToReview: initialReviews.map(review => review.receiverId) });
      }
    }
  }

  /*
    Method for adding a profileId to profilesToReview.
    filterDuplicates() makes sure that no duplicates are added.
  */
  handleReviewAdd() {
    this.setState({ error: null });
    const { profile } = this.props;
    const { profilesToReview } = this.state;
    if (this.profilesToReviewRef.current.value === profile.id) {
      this.setState({ error: 'a reviewer cannot review oneself!' });
      return;
    }
    if (profilesToReview.includes(this.profilesToReviewRef.current.value)) {
      this.setState({ error: 'such review assignment already exists!' });
      return;
    }
    this.setState({
      profilesToReview: [
        ...profilesToReview,
        this.profilesToReviewRef.current.value,
      ],
    });
  }

  /*
    Method for removing a profileId from profilesToReview.
    filterDuplicates() makes sure that a matching profileId is removed.
  */
  handleReviewRemove(e) {
    this.setState({ error: null });
    const { profilesToReview } = this.state;
    this.setState({ profilesToReview: filterDuplicates(profilesToReview, e.target.value) });
    this.profilesToReviewRef.current.focus();
  }

  /*
    Method for editing a profile
    1) delete profile
    2) delete profile's reviews
    3) save changes in redux store
    4) close the modal
  */
  handleDelete() {
    const {
      deleteProfile, closeModal, profile, activeProfile,
    } = this.props;
    this.setState({ error: null });
    if (profile.id === activeProfile.id) {
      this.setState({ error: 'you cannot delete yourself!' });
      return;
    }
    deleteProfile(profile, [profile.reviewed.map(id => ({ id }))]);
    closeModal();
  }

  /*
    Method for editing a profile
    1) recall initial profile ids
    2) compare with initial profile ids, find which profile ids were newly added
    3) compare with initial profile ids, find which profile ids were deleted
    4) for every newly added profile id, create a new review
    5) for every deleted profil id, we need to delete the corresponding review
    6) update the current profile with the new profileIds mapped to its corresponding reviews
    7) save changes in redux store
    8) close the modal
  */
  handleEdit() {
    const {
      editProfile, closeModal, profile, deleteReview,
    } = this.props;
    const { profilesToReview, initialReviews } = this.state;
    this.setState({ error: null });

    const initialProfilesToReview = initialReviews.map(review => review.receiverId);
    const newlyAddedReviewProfiles = getArrayDifference(initialProfilesToReview, profilesToReview);

    const newReviews = newlyAddedReviewProfiles.map(
      receiverId => createNewReview(null, profile.id, receiverId, ''),
    );

    if (
      !newReviews.reduce(
        (accumulator, newReview) => (accumulator && validateReview(newReview)),
        true,
      )) {
      this.setState({ error: 'This form has an error' });
      return;
    }

    const deletedReviewProfiles = getArrayDifference(profilesToReview, initialProfilesToReview);
    const matchKey = deletedId => initialReviews.find(review => review.receiverId === deletedId).id;
    const deletedReviews = deletedReviewProfiles.map(deletedId => matchKey(deletedId));

    const updatedProfile = getUpdatedProfile(
      profile.id,
      this.nameRef.current.value,
      this.roleRef.current.value,
      [
        ...(initialReviews.map(review => review.id)
          .filter(initialReviewId => !deletedReviews.includes(initialReviewId))),
        ...newReviews.map(review => review.id),
      ],
    );

    if (validateProfile(updatedProfile)) {
      editProfile(updatedProfile, newReviews);
      deletedReviews.forEach(reviewId => deleteReview({ id: reviewId }, []));
      closeModal();
    } else {
      this.setState({ error: 'This form has an error' });
    }
  }

  /*
    renders the select dropdown for selecting profiles to review on.
    Upon hovering a profile, a 'remove' button shows up.
    Clicking on the profile will remove the item from the review array.
  */
  renderReviewAssignments() {
    const { profiles } = this.props;
    const { profilesToReview } = this.state;
    return (
      <Fragment>
        <div className="profile-form__select-label">Assigned to review:</div>
        { renderProfileOptions(profiles, this.profilesToReviewRef) }

        <div className="profile-form__reviews">
          <div className="profile-form__reviews__button">
            <ButtonAdd onClick={this.handleReviewAdd}>add</ButtonAdd>
          </div>
          {renderProfilesToReview(profiles, profilesToReview, this.handleReviewRemove)}
        </div>
      </Fragment>
    );
  }

  render() {
    const { profile } = this.props;
    const { error } = this.state;
    return (
      <form>
        <div>
          <div className="profile-form__input-label">Name</div>
          <Input ref={this.nameRef} defaultValue={profile.name} />
          <div className="profile-form__input-label">Role</div>
          <Select ref={this.roleRef} defaultValue={profile.role}>
            <option key="role-employee" value="Employee">
              Employee
            </option>
            <option key="role-admin" value="Admin">
              Admin
            </option>
          </Select>
          {this.renderReviewAssignments()}
        </div>
        <div className="profile-form__button profile-form__button--space-between">
          <ButtonContinue onClick={this.handleDelete}>Delete This Review</ButtonContinue>
          <ButtonContinue onClick={this.handleEdit}>Save</ButtonContinue>
        </div>
        { error && <div className="profile-form__error">{error}</div>}
      </form>
    );
  }
}

_ProfileFormEdit_.propTypes = {
  profile: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  deleteReview: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  reviews: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  activeProfile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  activeProfile: state.activeProfile,
  profiles: state.profiles,
  reviews: state.reviews,
});

const mapDispatchToProps = dispatch => ({
  editProfile: (profile, reviews) => (dispatch(actions.setProfile(profile, reviews))),
  deleteProfile: (profile, reviews) => (dispatch(actions.deleteProfile(profile, reviews))),
  deleteReview: (review, profiles) => (dispatch(actions.deleteReview(review, profiles))),
});

export const ProfileFormEdit = connect(mapStateToProps, mapDispatchToProps)(_ProfileFormEdit_);
