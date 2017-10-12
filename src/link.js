import React from 'react';
import PropTypes from 'prop-types';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

function handleClick(evt, props, context) {
  if (props.onClick) {
    props.onClick(evt);
  }

  if (
    !evt.defaultPrevented && // onClick prevented default
    evt.button === 0 && // ignore everything but left clicks
    !props.target && // let browser handle "target=_blank" etc.
    !isModifiedEvent(evt) // ignore clicks with modifier keys
  ) {
    evt.preventDefault();

    const { redirectTo } = context;
    const { replace, to } = props;

    redirectTo(to, replace);
  }
}

const Link = (props, context) => {
  const {
    replace, to, innerRef,
    children, ...remainProps
  } = props;

  const href = context.createHref(to);
  const onClick = evt => handleClick(evt, props, context);

  return (
    <a {...remainProps} onClick={onClick} href={href} ref={innerRef}>
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
