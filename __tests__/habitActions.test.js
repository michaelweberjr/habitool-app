import { beforeEach } from '@jest/globals';
import axios from 'axios';
import "regenerator-runtime/runtime.js";
import * as actions from '../client/redux/actions/habitActions';

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

describe('testing habit actions', () => {
  let doc;
  
  beforeEach(() => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
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
  });
  
  describe('createHabit', () => {
    it('createHabit with valid data should give SUCCESS', () => {
      const habit = {
        name: 'Test code',
          description: 'Test case description',
          weekly: [[false, false, false, false, false, false, false]],
          startDate: doc.habit[0].startDate,
          endDate: doc.habit[0].endDate,
          weeklyGoal: 4,
      }
  
      const createHabitDispatcher = testDispatchWrapper([
        {type:'CREATE_HABIT_SUCCESS', payload: [doc.habit[0], habit]},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.resolve({data: {updatedDoc: {habit: [doc.habit[0], habit]}}}));
      actions.createHabit(habit, createHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/addHabit', habit);
    });

    it('createHabit with in-valid data should give FAIL', () => {
      const habit = {
        name: 'Write code',
          description: 'Test case description',
          weekly: [[false, false, false, false, false, false, false]],
          startDate: doc.habit[0].startDate,
          endDate: doc.habit[0].endDate,
          weeklyGoal: 4,
      }
  
      const createHabitDispatcher = testDispatchWrapper([
        {type:'CREATE_HABIT_FAIL', payload: 'Error message'},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.createHabit(habit, createHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/addHabit', habit);
    });
  });

  describe('updateHabit', () => {
    it('updateHabit with valid data should give SUCCESS', () => {
      const habit = {
        email:'test@email.com',
        fullName:'Michael',
        habit: [{
          name: 'Write code',
          description: 'Test case description',
          weekly: [[false, true, false, true, false, true, false]],
          startDate: doc.habit[0].startDate,
          endDate: doc.habit[0].endDate,
          weeklyGoal: 3,
        }],
      }
  
      const updateHabitDispatcher = testDispatchWrapper([
        {type:'UPDATE_HABIT_SUCCESS', payload: [habit]},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.resolve({data: {updatedDoc: {habit:[habit]}}}));
      actions.updateHabit(habit, updateHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/editHabit', habit);
    });

    it('updateHabit with in-valid data should give FAIL', () => {
      const habit = {
        name: 'Write code',
          description: 'Test case description',
          weekly: [[false, false, false, false, false, false, false]],
          startDate: doc.habit[0].startDate,
          endDate: doc.habit[0].endDate,
          weeklyGoal: 4,
      }
  
      const updateHabitDispatcher = testDispatchWrapper([
        {type:'UPDATE_HABIT_FAIL', payload: 'Error message'},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.updateHabit(habit, updateHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/editHabit', habit);
    });
  });

  describe('deleteHabit', () => {
    it('updateHabit with valid data should give SUCCESS', () => {
      const deleteHabitDispatcher = testDispatchWrapper([
        {type:'DELETE_HABIT_SUCCESS', payload: []},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.resolve({data: {updatedDoc: {habit:[]}}}));
      actions.deleteHabit(doc.habit[0], deleteHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/removeHabit', doc.habit[0]);
    });

    it('delete Habit with in-valid data should give FAIL', () => {
      const deleteHabitDispatcher = testDispatchWrapper([
        {type:'DELETE_HABIT_FAIL', payload: 'Error message'},
      ]);
  
      axios.post.mockImplementationOnce(() => Promise.reject({message: 'Error message'}));
      actions.deleteHabit(doc.habit[0], deleteHabitDispatcher);
      expect(axios.post).toHaveBeenCalledWith('/habit/removeHabit', doc.habit[0]);
    });
  });

});