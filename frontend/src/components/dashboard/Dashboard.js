import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';

const Dashboard = ({ getProfile, auth, profile }) => {
  useEffect(() => {
    getProfile();
  }, []);

  return <div>Dashboard</div>;
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
