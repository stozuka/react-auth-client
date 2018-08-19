import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3030/signup',
      formProps
    );
    const token = response.data.token;

    dispatch({ type: AUTH_USER, payload: token });

    localStorage.setItem('token', token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3030/signin',
      formProps
    );
    const token = response.data.token;

    dispatch({ type: AUTH_USER, payload: token });

    localStorage.setItem('token', token);
    callback();
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: 'invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
