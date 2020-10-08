import axios from 'axios';
import { setAlert } from './alert';
import { FETCH_PROFILE, PROFILE_ERROR } from '../actions/actionTypes';

// get profile action

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: FETCH_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create profile action

export const createProfile = (inputData, history, edit = false) => async dispatch => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', inputData, config);
    dispatch({
      type: FETCH_PROFILE,
      payload: res.data,
    });
    dispatch(
      setAlert(edit ? 'Profile Successfully Updated' : 'Profile Created')
    );
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
