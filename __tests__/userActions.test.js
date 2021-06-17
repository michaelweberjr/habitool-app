import { beforeAll } from '@jest/globals';
import axios from 'axios';
import * as actions from '../client/redux/actions/userActions';

jest.mock('axios');

const testDispatchWrapper = (actions) => {
  let index = 0;
  return (action) => {
    expect(action.type).toEqual(actions[index].type);
    expect(action.payload).toEqual(actions[index].payload);
    index++;
  };
};

describe('testing userActions', () => {
  let doc;

  beforeAll(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    doc = {
      email:'test@email.com',
      fullName:'Michael',
      habit: [{
        name: 'Write code',
        description: 'Test case description',
        weekly: [[false, false, false, false, false, false, false]],
        startDate: todayStr,
        endDate: todayStr,
        weeklyGoal: 3,
      }],
    }
  })

  describe('signin', () => {
    it('should respond with user data when logging in', () => {
      const signinSuccessDispatch = testDispatchWrapper([
        {type: 'USER_SIGNIN_REQUEST'}, 
        {type: 'USER_SIGNIN_SUCCESS', payload: { email:doc.email, fullName:doc.fullName, habit:doc.habit}},
      ]);

      axios.post.mockImplementationOnce(() => Promise.resolve({data: {loggedIn:true, doc}}));
      actions.signin(doc.email, '12345', signinSuccessDispatch);
      expect(axios.post).toHaveBeenCalledWith('/login', {email:doc.email, password:'12345'});
    });

    it('should respond with error when getting a bad login request', () => {
      const signinFailDispatch = testDispatchWrapper([
        {type: 'USER_SIGNIN_REQUEST'}, 
        {type: 'USER_SIGNIN_FAIL', payload: 'Error message'},
      ]);

      axios.post.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.signin(doc.email, '12345', signinFailDispatch);
      expect(axios.post).toHaveBeenCalledWith('/login', {email:doc.email, password:'12345'});
    });
  });

});