import React from 'react';
import PropTypes from 'prop-types';
import Router from './router';
import { createBrowserHistory, createHashHistory } from './createhistory';

function createHistoryRouter(createHistory) {
  const history = createHistory();
  const HistoryRouter = props => (
    <Router history={history} routes={props.routes} />
  );

  HistoryRouter.propTypes = {
    routes: PropTypes.array.isRequired,
  };

  return HistoryRouter;
}

export const HashRouter = createHistoryRouter(createHashHistory);
export const BrowerRouter = createHistoryRouter(createBrowserHistory);
