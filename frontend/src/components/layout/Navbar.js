import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, Logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='' onClick={Logout}>
          <i className='fas fa-sign-out-alt'>
            {' '}
            <span className='hide-sm'>Logout</span>
          </i>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <a href='profiles.html'>Developers</a>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fa fa-code-fork'></i>DevCamp
        </Link>
      </h1>
      {!loading ? (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      ) : null}
    </nav>
  );
};

Navbar.propTypes = {
  Logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { Logout })(Navbar);
