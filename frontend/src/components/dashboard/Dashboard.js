import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getProfile, auth, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfile();
  }, []);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>Dashboard</Fragment>
  );
};

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  profile: state.profileReducer,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
