import React from 'react';
import PropTypes from 'prop-types';
import Router from './router';
import { createBrowserHistory, createHashHistory } from './createhistory';

function createHistoryRouter(createHistory) {
  const history = createHistory();
  const HistoryRouter = () => (
    <Router history={history}>
      {this.props.children}
    </Router>
  );

  HistoryRouter.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return HistoryRouter;
}

export const HashRouter = createHistoryRouter(createHashHistory);
export const BrowerRouter = createHistoryRouter(createBrowserHistory);
