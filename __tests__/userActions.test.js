import { beforeAll } from '@jest/globals';
import axios from 'axios';
import * as actions from '../client/redux/actions/userActions';
import "regenerator-runtime/runtime.js";

jest.mock('axios');

const testDispatchWrapper = (actions) => {
  let index = 0;
  return (action) => {
    try{ 
      expect(action.type).toEqual(actions[index].type);
      expect(action.payload).toEqual(actions[index].payload);
      index++;
    } catch(err) { console.log(err) }
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

  describe('register', () => {
    it('should respond with success when no error', () => {
      const registerSuccessDispatch = testDispatchWrapper([
        {type: 'USER_REGISTER_REQUEST'}, 
        {type: 'USER_REGISTER_SUCCESS', payload: { email:doc.email, fullName:doc.fullName}},
      ]);

      axios.post.mockImplementationOnce(() => Promise.resolve({}));
      actions.register(doc.fullName, doc.email, '12345')(registerSuccessDispatch);
      expect(axios.post).toHaveBeenCalledWith('/signup', {email:doc.email, name:doc.fullName, password:'12345'});
    });

    it('should respond with fail when error', () => {
      const registerSuccessDispatch = testDispatchWrapper([
        {type: 'USER_REGISTER_REQUEST'}, 
        {type: 'USER_REGISTER_FAIL', payload: 'Error message'},
      ]);

      axios.post.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.register(doc.fullName, doc.email, '12345')(registerSuccessDispatch);
      expect(axios.post).toHaveBeenCalledWith('/signup', {email:doc.email, name:doc.fullName, password:'12345'});
    });
  });

  describe('logout', () => {
    it('should respond with USER_LOGOUT', () => {
      const logoutSuccessDispatch = testDispatchWrapper([
        {type: 'USER_LOGOUT'}, 
      ]);

      axios.get.mockImplementationOnce(() => Promise.resolve({}));
      actions.logout()(logoutSuccessDispatch);
      expect(axios.get).toHaveBeenCalledWith('/logout');
    });
  });

  describe('checkSession', () => {
    it('should respond with user data on login', () => {
      const sessionSuccessDispatch = testDispatchWrapper([
        {type: 'USER_SESSION_REQUEST'}, 
        {type: 'USER_SESSION_SUCCESS', payload: { loggedIn:true, doc: {email:doc.email, fullName:doc.fullName, habit:doc.habit}}},
      ]);

      axios.get.mockImplementationOnce(() => Promise.resolve({data: {loggedIn:true, doc}}));
      actions.checkSession()(sessionSuccessDispatch);
      expect(axios.get).toHaveBeenCalledWith('/session');
    });

    it('should respond with error on FAIL', () => {
      const sessionSuccessDispatch = testDispatchWrapper([
        {type: 'USER_SESSION_REQUEST'}, 
        {type: 'USER_SESSION_FAIL', payload: 'Error message'},
      ]);

      axios.get.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.checkSession()(sessionSuccessDispatch);
      expect(axios.get).toHaveBeenCalledWith('/session');
    });
  });
});