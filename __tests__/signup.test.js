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
 
 import SignupScreen from '../client/screens/SignupScreen.js';

 jest.mock('axios');

 test('makes a signup request', () => {
    const renderObj= render(
      <Provider store={store}>
        <Router>
          <SignupScreen />
        </Router>
      </Provider>
    );
  
    fireEvent.change(document.querySelector('#email'), { target: { value: 'test@email.com'}});
    expect(document.querySelector('#email').value).toEqual('test@email.com');
    fireEvent.change(document.querySelector('#password'), { target: { value: '12345'}});
    expect(document.querySelector('#password').value).toEqual('12345');
    fireEvent.change(document.querySelector('#userName'), { target: { value: 'Michael' }});
    expect(document.querySelector('#userName').value).toEqual('Michael');
  
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    fireEvent.click(document.querySelector('button'));
    expect(axios.post).toHaveBeenCalledWith('/signup', {email:'test@email.com', password:'12345', name:'Michael'});
  });