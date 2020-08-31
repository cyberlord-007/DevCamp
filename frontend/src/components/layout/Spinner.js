import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';
const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '50px',
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex',
      }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
