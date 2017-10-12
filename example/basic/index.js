import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import { HashRouter } from 'thin-react-router';
import Main from './main';
import About from './about';

ReactDOM.render(
  <HashRouter
    routes={[
      {
        path: '/',
        component: Main,
        exact: true,
        fallback: true,
      },
      { path: '/about', component: About },
    ]}
  />,
  document.getElementById('root'),
);
