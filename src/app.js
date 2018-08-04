import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Login } from 'pages/login';
import { Dashboard } from 'pages/dashboard';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
];

export const App = () => (
  <BrowserRouter>
    <Fragment>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Fragment>
  </BrowserRouter>
);
