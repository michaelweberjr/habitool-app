/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginScreen from '../client/screens/LoginScreen.js';
import '@testing-library/jest-dom/';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { store } from '../client/redux/store.js';
import { userReducer } from '../client/redux/reducers/userReducers';

test('makes a login request', () => {
  const { container, getByText } = render(
    <Provider store={store}>
      <Router>
        <LoginScreen />
      </Router>
    </Provider>
  );
  expect(getByText('Sign Up')).toBeInTheDocument();
});

test('sign in: sets signinLoading:true on user state branch in redux store', () => {
  const state = {
    email: '',
    // password: '',
    fullName: '',
    habit: [], //array of objects
    signupLoading: false,
    signinLoading: false,
    error: false,
    habitIndex: null,
  };
  const action = {
    type: 'USER_SIGNIN_REQUEST',
  };
  const newState = userReducer(state, action);

  expect(newState.signinLoading).toBe(true);
});
