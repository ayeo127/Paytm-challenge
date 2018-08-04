/* eslint-disable quote-props */
export const data = {
  activeProfile: {},
  activeTab: '0',
  profiles: {
    '98659': {
      id: '98659',
      name: 'Snowflake The Cat',
      role: 'Admin',
      reviewed: [],
    },
    '24124': {
      id: '24124',
      name: 'Andrea The Human',
      role: 'Employee',
      reviewed: [
        '7782',
        '6644',
      ],
    },
    '0924': {
      id: '0924',
      name: 'Mocha The Dog',
      role: 'Employee',
      reviewed: [
        '4312',
        '1234',
      ],
    },
    '19285': {
      id: '19285',
      name: 'Piper the Raccoon',
      role: 'Employee',
      reviewed: [
        '1239',
      ],
    },
  },
  reviews: {
    '1239': {
      id: '1239',
      reviewerId: '19285',
      receiverId: '0924',
      description: 'Mocha is a dumb dog. I steal treats from his bowl all the time.',
    },
    '7782': {
      id: '7782',
      reviewerId: '24124',
      receiverId: '19285',
      description: '',
    },
    '1234': {
      id: '1234',
      reviewerId: '0924',
      receiverId: '19285',
      description: 'Woof Woof Woof Woof. I do not like Racoons. They are the worst. Woof Woof Woof Woof.',
    },
    '4312': {
      id: '4312',
      reviewerId: '0924',
      receiverId: '24124',
      description: 'Andrea gives too much treats woof woof woof. She made me fat woof woof.',
    },
    '6644': {
      id: '6644',
      reviewerId: '24124',
      receiverId: '0924',
      description: 'Mocha is a poodle that uses his wits to hide snacks.',
    },
  },
};
