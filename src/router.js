import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';

class Router extends Component {
  static childContextTypes = {
    location: PropTypes.string.isRequired,
    redirectTo: PropTypes.func.isRequired,
    createHref: PropTypes.func.isRequired,
  }

  static propTypes = {
    history: PropTypes.shape({
      getLocation: PropTypes.func.isRequired,
      redirectTo: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired,
      listen: PropTypes.func.isRequired,
      unlisten: PropTypes.func.isRequired,
    }).isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      fallback: PropTypes.bool,
      exact: PropTypes.bool,
      strict: PropTypes.bool,
      sensitive: PropTypes.bool,
    })).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      location: this.props.history.getLocation(),
    };

    const fallbackRoute = props.routes.find(route => route.fallback);
    this._fallbackComponent = fallbackRoute && fallbackRoute.component;
  }

  getChildContext() {
    const { history } = this.props;

    return {
      location: this.state.location,
      redirectTo: history.redirectTo.bind(history),
      createHref: history.createHref.bind(history),
    };
  }

  componentDidMount() {
    const { history } = this.props;

    history.listen(this.handleLocationChanged);
  }

  componentWillUnmount() {
    const { history } = this.props;

    history.unlisten(this.handleLocationChanged);
  }

  computeMatch(path, { exact, sensitive, strict }) {
    const { location } = this.state;

    const params = {};
    let isExact = location === path;
    if (exact && !isExact) {
      return null;
    }

    const keys = [];
    const regexp = pathToRegexp(path, keys, {
      sensitive,
      strict,
    });
    const result = regexp.exec(path);
    if (!result) {
      return null;
    }

    keys.forEach((keyItem, index) => {
      params[keyItem.name] = result[index + 1];
    });

    return {
      params,
      isExact,
    };
  }

  handleLocationChanged = (location) => {
    this.setState({
      location,
    });
  }

  render() {
    const { routes } = this.props;

    let RouteComponent;
    let match = {};
    routes.some((route) => {
      const curMatch = this.computeMatch(route.path, {
        strict: route.strict,
        exact: route.exact,
        sensitive: route.sensitive,
      });
      if (curMatch) {
        match = curMatch;
        RouteComponent = route.component;
        return true;
      }
      return false;
    });

    const { location } = this.state;
    const props = { match, location };
    RouteComponent = RouteComponent || this._fallbackComponent;

    if (RouteComponent) {
      return <RouteComponent {...props} />;
    }

    return null;
  }
}

export default Router;
