import React, { Fragment, createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ButtonContinue, Input, ButtonAdd, Select,
} from 'components/common';
import { actions } from 'store';
import {
  getRandomId,
  renderProfileOptions,
  filterDuplicates,
  renderProfilesToReview,
  getUpdatedProfile,
  createNewReview,
  validateProfile,
  validateReview,
} from '../form-utils';

import './profile-form.scss';

class _ProfileFormNew_ extends Component {
  constructor(props) {
    super(props);

    /*
      profilesToReview: list of profileIds that this profile needs to review
      (In other words, ids of employee this profile needs to do performance review for)
    */
    this.state = { profilesToReview: [], error: '' };
    this.nameRef = createRef();
    this.roleRef = createRef();
    this.profilesToReviewRef = createRef();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleReviewAdd = this.handleReviewAdd.bind(this);
    this.handleReviewRemove = this.handleReviewRemove.bind(this);
  }

  /*
    Method for adding a profileId to profilesToReview.
    filterDuplicates() makes sure that no duplicates are added.
  */
  handleReviewAdd() {
    this.setState({ error: null });
    const { profilesToReview } = this.state;
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
    const { profilesToReview } = this.state;
    this.setState({ profilesToReview: filterDuplicates(profilesToReview, e.target.value) });
    this.profilesToReviewRef.current.focus();
  }

  /*
    Method for adding a profile
    1) make a new id (use id to make new profile and also update reviews)
    2) create new reviews that profile is assigned to
    3) create new profile
    4) save changes in redux store
    4) close the modal
  */
  handleAdd() {
    const { addProfile, closeModal } = this.props;
    const { profilesToReview } = this.state;

    const id = `${getRandomId(99999)}`;
    const newReviews = profilesToReview.map(receiverId => createNewReview(null, id, receiverId, ''));
    if (
      !newReviews.reduce(
        (accumulator, newReview) => (accumulator && validateReview(newReview)),
        true,
      )) {
      this.setState({ error: 'This form has an error' });
      return;
    }
    const newProfile = getUpdatedProfile(
      id,
      this.nameRef.current.value,
      this.roleRef.current.value,
      newReviews.map(review => review.id),
    );
    if (validateProfile(newProfile)) {
      addProfile(newProfile, newReviews);
      closeModal();
    } else {
      this.setState({ error: 'There is an error with this form!' });
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
          {renderProfilesToReview(profiles, profilesToReview, () => (this.handleReviewRemove))}
        </div>
      </Fragment>
    );
  }

  render() {
    const { error } = this.state;
    return (
      <form>
        <div>
          <div className="profile-form__input-label">Name</div>
          <Input ref={this.nameRef} />
          <div className="profile-form__input-label">Role</div>
          <Select ref={this.roleRef}>
            <option key="role-employee" value="Employee">
              Employee
            </option>
            <option key="role-admin" value="Admin">
              Admin
            </option>
          </Select>
          {this.renderReviewAssignments()}
        </div>
        <div className="profile-form__button">
          <ButtonContinue onClick={this.handleAdd}>Add</ButtonContinue>
        </div>
        { error && <div className="profile-form__error">{error}</div>}
      </form>
    );
  }
}

_ProfileFormNew_.propTypes = {
  addProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profiles: state.profiles,
});

const mapDispatchToProps = dispatch => ({
  addProfile: (profile, reviews) => (dispatch(actions.setProfile(profile, reviews))),
});

export const ProfileFormNew = connect(mapStateToProps, mapDispatchToProps)(_ProfileFormNew_);
