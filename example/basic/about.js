import React from 'react';
// eslint-disable-next-line
import { Link } from 'thin-react-router';

export default () => {
  return (
    <div>
      This is the about page of the example.
      <Link to="/">Go back to homepage</Link>
    </div>
  );
}
