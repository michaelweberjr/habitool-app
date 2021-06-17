import { userReducer } from '../client/redux/reducers/userReducers';

describe('testing the userReducer', () =>{
  let state;

  beforeEach(() => {
    state = {
      email: '',
      fullName: '',
      habit: [],
      signupLoading: false, 
      signinLoading: false,
      sessionLoading: 'start',
      error: false,
      habitIndex: null,
      route: '/',
    };
  })

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(userReducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('session actions', () => {
    it('should set sessionLoading to waiting on USER_SESSION_REQUEST', () => {
      const action = {
        type: 'USER_SESSION_REQUEST',
      }
      const newState = userReducer(state, action);
      expect(newState.sessionLoading).toEqual('waiting');
    });

    it('should set sessionLoading to ready on USER_SESSION_FAIL', () => {
      const action = {
        type: 'USER_SESSION_FAIL',
        payload: 'Test error',
      }
      const newState = userReducer(state, action);

      expect(newState.sessionLoading).toEqual('ready');
      expect(newState.route).toEqual('/login');
      expect(newState.error).toEqual(action.payload);
    });

    it('should set route to dashboard on USER_SESSION_SUCCESS and loggedIn', () => {
      const action = {
        type: 'USER_SESSION_SUCCESS',
        payload: { loggedIn:true, doc:{email:'test@email.com', fullName:'Joe', habit:[]}},
      }
      const newState = userReducer(state, action);

      expect(newState.sessionLoading).toEqual('ready');
      expect(newState.route).toEqual('/dashboard');
      expect(newState.email).toEqual(action.payload.doc.email);
      expect(newState.fullName).toEqual(action.payload.doc.fullName);
      expect(newState.habit).toEqual(action.payload.doc.habit);
    });

    it('should set route to login on USER_SESSION_SUCCESS and not loggedIn', () => {
      const action = {
        type: 'USER_SESSION_SUCCESS',
        payload: { loggedIn:false, doc:{}},
      }
      const newState = userReducer(state, action);

      expect(newState.sessionLoading).toEqual('ready');
      expect(newState.route).toEqual('/login');
      expect(newState.email).toEqual(state.email);
      expect(newState.fullName).toEqual(state.fullName);
      expect(newState.habit).toEqual(state.habit);
    });
  });

  describe('signin actions', () => {
    it('sets signinLoading:true on USER_SIGNIN_REQUEST', () => {
      const action = {
        type: 'USER_SIGNIN_REQUEST',
      };
      const newState = userReducer(state, action);
    
      expect(newState.signinLoading).toBe(true);
    });

    it('should set route to dashboard on USER_SIGNIN_SUCCESS', () => {
      const action = {
        type: 'USER_SIGNIN_SUCCESS',
        payload: {email:'test@email.com', fullName:'Joe', habit:[]},
      }
      const newState = userReducer(state, action);

      expect(newState.signinLoading).toEqual(false);
      expect(newState.route).toEqual('/dashboard');
      expect(newState.email).toEqual(action.payload.email);
      expect(newState.fullName).toEqual(action.payload.fullName);
      expect(newState.habit).toEqual(action.payload.habit);
    });

    it('should set error on USER_SIGNIN_FAIL', () => {
      const action = {
        type: 'USER_SIGNIN_FAIL',
        payload: 'Test error message',
      }
      const newState = userReducer(state, action);

      expect(newState.signinLoading).toEqual(false);
      expect(newState.error).toEqual(action.payload);
    });
  });

  describe('register actions', () => {
    it('should set signupLoading on USER_REGISTER_REQUEST', () => {
      const action = {
        type: 'USER_REGISTER_REQUEST',
      }
      const newState = userReducer(state, action);
    });

    it('should set route to dashboard on USER_REGISTER_SUCCESS', () => {
      const action = {
        type: 'USER_REGISTER_SUCCESS',
        payload: {email:'test@email.com', fullName:'Joe'},
      }
      const newState = userReducer(state, action);

      expect(newState.signupLoading).toEqual(false);
      expect(newState.route).toEqual('/dashboard');
      expect(newState.email).toEqual(action.payload.email);
      expect(newState.fullName).toEqual(action.payload.fullName);
    });
  });

  describe('logout actions', () => {
    it('should set the state to the initial state', () => {
      const testState = {...state};
      testState.email = 'test@email.com';
      testState.fullName = 'Joe';
      testState.route = '/dashboard';
      testState.habit = [{data:'not valid data'}];

      const action = {
        type: 'USER_LOGOUT',
      }
      const newState = userReducer(testState, action);

      expect(newState).toEqual(state);
    });
  });

  describe('habit actions', () => {
    it('should modify the habit state on creation', () => {
      const action = {
        type: 'CREATE_HABIT_SUCCESS',
        payload: 'Blank data',
      }
      const newState = userReducer(state, action);

      expect(newState.habit).toEqual(action.payload);
    });

    it('should modify the habit state on deletion', () => {
      const action = {
        type: 'DELETE_HABIT_SUCCESS',
        payload: 'Blank data',
      }
      const newState = userReducer(state, action);

      expect(newState.habit).toEqual(action.payload);
    });

    it('should modify the habit state on update', () => {
      const action = {
        type: 'UPDATE_HABIT_SUCCESS',
        payload: 'Blank data',
      }
      const newState = userReducer(state, action);

      expect(newState.habit).toEqual(action.payload);
    });

    it('should set the habit index', () => {
      const action = {
        type: 'SET_HABIT_INDEX',
        payload: 1,
      }
      const newState = userReducer(state, action);

      expect(newState.habitIndex).toEqual(action.payload);
    });
  });
});
