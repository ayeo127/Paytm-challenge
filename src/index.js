import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'store';
import { App } from './app';

import 'assets/base.scss';

ReactDOM.render(
  <Provider store={store}>
    <App id="app" />
  </Provider>,
  document.getElementById('app'),
);
