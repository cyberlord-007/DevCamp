import axios from 'axios';
import { setAlert } from './alert';
import { FETCH_PROFILE, PROFILE_ERROR } from '../actions/actionTypes';

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
