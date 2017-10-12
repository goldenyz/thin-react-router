# thin-react-router [![Build Status](https://travis-ci.org/goldenyz/thin-react-router.svg?branch=master)](https://travis-ci.org/goldenyz/thin-react-router) [![npm](https://img.shields.io/npm/v/thin-react-router.svg?style=flat-square)](https://www.npmjs.com/package/thin-react-router) [![npm downloads](https://img.shields.io/npm/dm/thin-react-router.svg)](https://www.npmjs.com/package/thin-react-router)

A thin react router which is just 9KB(gzip:3KB). It is especially suitable for small websites.
If you want a more powerful router, please refer to [react-router](https://github.com/ReactTraining/react-router).

## usage
Install the package `npm install -S thin-react-router`
Import the component you want to use, just like react-router

## Components
It contains the following components:
### &lt;HashRouter&gt;
A hash router.
The following props are accepted:
#### routes
A route array to configure the routes.
A route config can accept the following props:
| name      | type   | comment                                                                                                                                           |
|-----------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| path      | string | route path                                                                                                                                        |
| component | func   | component to render when matches                                                                                                                  |
| fallback  | bool   | when true, the route is a fallback route. Note that only the first fallback route will be respect.                                                |
| exact     | bool   | when true, the route path should match exactly                                                                                                    |
| strict    | bool   | when true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL. |
| sensitive | bool   | when true, the matching is case-sensitive                                                                                                         |
Note that the route matching will stop if any of the route matches. The matching order is aligned with the routes array.
### &lt;BrowserRouter&gt;
A browser router based on [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API).
Its props are same as [HashRouter](#hashrouter).

### &lt;Link&gt;
Provides declarative, accessible navigation around your application.
The following props are accepted:
#### to: string
The pathname or location to link to.
#### target: string
Target attributes which is same as &lt;a&gt;.
#### replace: bool
When true, the current history entry will be replaced.
#### innerRef: function
Returns the inner component ref.
#### children: node
&lt;Link&gt; can accept inner children, just like &lt;a&gt;.
#### onClick: function
Will be called when user click the link, before jump to the new path. Call evt.preventDefault() can prevent the navigation.

## Example
The following code defined a hash router:
```
...
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

```
The Main component can be defined as follows:
```
...
import { Link } from 'thin-react-router';

export default () => {
  return (
    <div>
      This is an example of thin-react-router.
      <Link to="/about">Go to About</Link>
    </div>
  );
}
```
