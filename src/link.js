import React from 'react';
import PropTypes from 'prop-types';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

function handleClick(evt) {
  if (this.props.onClick) {
    this.props.onClick(evt);
  }

  if (
    !evt.defaultPrevented && // onClick prevented default
    evt.button === 0 && // ignore everything but left clicks
    !this.props.target && // let browser handle "target=_blank" etc.
    !isModifiedEvent(evt) // ignore clicks with modifier keys
  ) {
    evt.preventDefault();

    const { redirectTo } = this.context.router;
    const { replace, to } = this.props;

    redirectTo(to, replace);
  }
}

const Link = () => {
  const { replace, to, innerRef, children, ...props } = this.props;

  const href = this.context.createHref(to);
  const onClick = handleClick.bind(this);

  return (
    <a {...props} onClick={onClick} href={href} ref={innerRef}>
      {children}
    </a>
  );
};

Link.contextTypes = {
  createHref: PropTypes.func.isRequired,
  redirectTo: PropTypes.func.isRequired,
};

Link.propTypes = {
  onClick: PropTypes.func,
  target: PropTypes.string, // eslint-disable-line react/require-default-props
  replace: PropTypes.bool,
  to: PropTypes.string.isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  children: PropTypes.node,
};

Link.defaultProps = {
  replace: false,
  onClick: undefined,
  innerRef: undefined,
  children: undefined,
};

export default Link;
