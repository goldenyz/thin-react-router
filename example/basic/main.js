import React from 'react';
// eslint-disable-next-line
import { Link } from 'thin-react-router';

export default () => {
  return (
    <div>
      This is an example of thin-react-router.
      <Link to="/about">Go to About</Link>
    </div>
  );
}
