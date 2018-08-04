import React from 'react';

import isNil from 'lodash/isNil';
import find from 'lodash/find';
import remove from 'lodash/remove';

import { Select, User } from 'components/common';

/*
  Array helpers
*/
export const getRandomId = max => Math.floor(Math.random() * Math.floor(max));

export const filterDuplicates = (arr, value) => arr.filter(id => id !== value);

export const getArrayDifference = (arr1, arr2) => (
  arr2.filter(x => !arr1.includes(x))
);

/*
  Profile helpers
*/
export const getProfileById = (profiles, id) => {
  if (isNil(profiles) || isNil(id)) {
    return null;
  }
  return find(profiles, (profile => profile.id === id));
};

export const getUpdatedProfile = (profileId, name, role, reviewed) => {
  const id = isNil(profileId) ? `${getRandomId(99999)}` : profileId;
  return ({
    id,
    name,
    role,
    reviewed,
  });
};

/*
  Review helpers
*/
export const getUpdatedReview = (reviewId, reviewerId, receiverId, description) => {
  const id = isNil(reviewId) ? `${getRandomId(99999)}` : reviewId;
  return ({
    id,
    reviewerId,
    receiverId,
    description,
  });
};

export const createNewReview = (
  id, reviewerId, receiverId, description,
) => getUpdatedReview(null, reviewerId, receiverId, description);

export const getUpdatedReviewer = (reviewId, reviewer, action) => {
  if (action === 'delete') {
    remove(reviewer.reviewed, n => n === reviewId);
    return ({
      ...reviewer,
      reviewed: reviewer.reviewed,
    });
  }
  if (reviewer.reviewed.includes(reviewId)) { return reviewer; }
  return ({
    ...reviewer,
    reviewed: [...reviewer.reviewed, reviewId],
  });
};

/*
  Validation helpers
*/
export const validateReview = review => (
  review.id
  && review.reviewerId && review.reviewerId !== 'error'
  && review.receiverId && review.receiverId !== 'error'
  && !isNil(review.description)
);

export const validateProfile = profile => (
  profile.id
  && profile.name
  && profile.role
  && profile.reviewed
);

/*
  Rendering helpers
*/
export const renderProfileOptions = (profiles, ref, defaultProfileId) => (
  <Select
    Icon={User}
    defaultValue={defaultProfileId}
    ref={ref}
  >
    {
      Object.values(profiles).map(profile => (
        <option key={profile.id} value={profile.id}>
          {`${profile.role} - ${profile.name}`}
        </option>
      ))
    }
  </Select>
);

/* eslint-disable */
export const renderProfilesToReview = (profiles, profilesToReview, profileOnClick) => (
  profilesToReview.map((profileToReviewId) => {
    const profile = getProfileById(profiles, profileToReviewId);
    return (profile &&
      (<button
        className="profile-form__reviews__profile"
        type="button"
        onClick={event => profileOnClick(event)}
        value={profile.id}
      >
        {`${profile.role} - ${profile.name}`}
      </button>
      )
    );
  })
);
