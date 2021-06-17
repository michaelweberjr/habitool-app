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


