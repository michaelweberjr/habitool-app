import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_LOGOUT, USER_SESSION_REQUEST,
  USER_SESSION_SUCCESS, USER_SESSION_FAIL
} from '../constants/userConstants';

const signin =  (email, password, dispatch) => {
  const copyEmail = email;
  // return async (dispatch) => {
  // dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    //const { data }  = 
    Axios.post('/login', { email: copyEmail, password }).then(res => {
      const data = res.data;
      const { email, fullName, habit } = data.doc;
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: {email: copyEmail, fullName, habit} });
    })
    .catch(error => {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    });
    // console.log('query result',data);
    // const { email, fullName, habit } = data.doc;
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: {email: copyEmail, fullName, habit} });
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  // dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post('/signup', { name, email, password });
    console.log(data);
    const actionPayload = { email, fullName: name };
    dispatch({ type: USER_REGISTER_SUCCESS, payload: actionPayload });
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};

const logout = () => async (dispatch) => {
  Cookie.remove('SSID');
  dispatch({ type: USER_LOGOUT });
  try {
    const { data } = await Axios.get('/logout');
    console.log('Received server logout response:', data);
  }
  catch(error) {
    dispatch({ type: USER_SESSION_FAIL, payload: error.message || error });
  }
};

const checkSession = () => async (dispatch) => {
  dispatch({type: USER_SESSION_REQUEST});
  try {
    const { data } = await Axios.get('/session');
    console.log(data);
    const actionPayload = data;
    dispatch({ type: USER_SESSION_SUCCESS, payload: actionPayload});
  }
  catch (error) {
    dispatch({ type: USER_SESSION_FAIL, payload: error.message || error });
  }
};

export { signin, register, logout, checkSession };