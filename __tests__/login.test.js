/**
 * @jest-environment jsdom
 */

import "regenerator-runtime/runtime.js";
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { store } from '../client/redux/store.js';
import axios from 'axios';

import LoginScreen from '../client/screens/LoginScreen.js';

jest.mock('axios');

test('makes a login request', () => {
  const renderObj= render(
    <Provider store={store}>
      <Router>
        <LoginScreen />
      </Router>
    </Provider>
  );

  fireEvent.change(document.querySelector('#email'), { target: { value: 'test@email.com'}});
  expect(document.querySelector('#email').value).toEqual('test@email.com');
  fireEvent.change(document.querySelector('#password'), { target: { value: '12345'}});
  expect(document.querySelector('#password').value).toEqual('12345');

  axios.post.mockImplementationOnce(() => Promise.resolve({}));
  fireEvent.click(document.querySelector('#login__btn'));
  expect(axios.post).toHaveBeenCalledWith('/login', {email:'test@email.com', password:'12345'});
});


