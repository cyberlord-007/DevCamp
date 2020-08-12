import { REG_SUCCESS, REG_FAIL } from '../actions/actionTypes';
import { setAlert } from './alert';
// for requesting to our api
import axios from 'axios';

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  // making request to backend through axios

  try {
    const res = await axios.post('/api/users', body, config);
    // dispatch action
    dispatch({
      type: REG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REG_FAIL,
    });
  }
};
