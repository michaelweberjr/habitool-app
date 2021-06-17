/**
 * @jest-environment jsdom
 */

 import "regenerator-runtime/runtime.js";
 import React from 'react';
 import { render, fireEvent } from '@testing-library/react';
 import { screen } from "@testing-library/dom";
 import '@testing-library/jest-dom/';
 import { Provider } from 'react-redux';
 import { BrowserRouter as Router } from 'react-router-dom';
 import { store } from '../client/redux/store.js';
 import axios from 'axios';
 
 import StarterTile from '../client/components/StarterTile.js';

 jest.mock('axios');

 test('makes a signup request', () => {
    const renderObj = render(
      <Provider store={store}>
        <Router>
          <StarterTile test={true}/>
        </Router>
      </Provider>
    );

    fireEvent.change(document.querySelector('#habitTitle'), { target: { value: 'Write code'}});
    expect(document.querySelector('#habitTitle').value).toEqual('Write code');
    fireEvent.change(document.querySelector('#cadence-selector'), { target: { value: '3'}});
    expect(document.querySelector('#cadence-selector').value).toEqual('3');
    fireEvent.change(document.querySelector('#start-date'), { target: { value: '2021-06-17' }});
    expect(document.querySelector('#start-date').value).toEqual('2021-06-17');
    fireEvent.change(document.querySelector('#end-date'), { target: { value: '2021-06-17' }});
    expect(document.querySelector('#end-date').value).toEqual('2021-06-17');
    fireEvent.change(document.querySelector('#habit-description'), { target: { value: 'Testing' }});
  
    axios.post.mockImplementationOnce(() => Promise.resolve({}));
    fireEvent.click(document.querySelector('button'));
    expect(axios.post).toHaveBeenCalledWith('/habit/addHabit', {
        email: screen.getByTestId('emailProps').innerHTML,
        habit: 'Write code',
        description: 'Testing',
        startDate: '2021-06-17',
        endDate: '2021-06-17',
        weeklyGoal: 3,
    });
  });