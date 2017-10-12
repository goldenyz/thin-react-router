function isExternalUrl(url) {
  return ['http', '//']
    .some(startStr => url.substr(0, startStr.length) === startStr);
}

function listen(listeners, listener) {
  if (listeners.indexOf(listener) === -1) {
    listeners.push(listener);
  }
}

function unlisten(listeners, listener) {
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
}

export function createHashHistory() {
  const listeners = [];

  function getLocation() {
    const { hash } = window.location;
    const path = hash.slice(1) || '/';

    return path;
  }

  function createHref(href) {
    if (isExternalUrl(href)) {
      return href;
    }

    return `#${href}`;
  }

  function redirectTo(to, replace) {
    const href = createHref(to);
    if (replace) {
      window.location.replace(href);
    } else if (isExternalUrl(href)) {
      window.location = href;
    } else {
      window.location.hash = href;
    }
  }

  window.addEventListener('hashchange', () => {
    listeners.forEach(listener => listener(getLocation()));
  }, false);

  return {
    getLocation,
    createHref,
    redirectTo,
    listen: listen.bind(null, listeners),
    unlisten: unlisten.bind(null, listeners),
  };
}

export function createBrowserHistory() {
  const listeners = [];

  function getLocation() {
    const { pathname, search, hash } = window.location;
    const path = `${pathname}${search}${hash}` || '/';

    return path;
  }

  function createHref(href) {
    return href;
  }

  function redirectTo(to, replace) {
    if (to === getLocation()) {
      return;
    }

    if (isExternalUrl(to)) {
      window.location = to;
    } else if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    listeners.forEach(listener => listener(getLocation()));
  }

  window.addEventListener('popstate', () => {
    listeners.forEach(listener => listener(getLocation()));
  });

  return {
    getLocation,
    createHref,
    redirectTo,
    listen: listen.bind(null, listeners),
    unlisten: unlisten.bind(null, listeners),
  };
}
