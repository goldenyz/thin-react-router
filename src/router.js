import { Component } from 'react';
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
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.node.isRequired,
        fallback: PropTypes.bool,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        sensitive: PropTypes.bool,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      location: this.props.history.getLocation(),
    };
  }

  getChildContext() {
    const history = this.props;

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

  componentWillUnMount() {
    const { history } = this.props;

    history.unlisten(this.handleLocationChanged);
  }

  computeMatch(path, { exact, sensitive, strict }) {
    const location = this.state.location;

    const params = {};
    let isExact = false;
    if (exact) {
      isExact = location === path;
    } else {
      const keys = [];
      const regexp = pathToRegexp(path, keys, {
        sensitive,
        strict,
      });
      const result = regexp.exec(path);
      if (result) {
        keys.forEach((keyItem, index) => {
          params[keyItem.name] = result[index + 1];
        });
      }
    }

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
    let FallBackComponent;
    routes.forEach((route) => {
      if (!RouteComponent) {
        const match = this.computeMatch(route.path, {
          strict: route.strict,
          exact: route.exact,
          sensitive: route.sensitive,
        });
      }

    });

    const { component } = this.props;
    const location = this.state.location;

    const match = this.computeMatch();
    const props = { match, location };

    if (component) {
      return match ? React.createElement(component, props) : null;
    }

  }
}

export default Router;
