import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../stylesheets/componentStyles/HabitTile.css';
import { connect, useDispatch } from 'react-redux';

import { deleteHabit, updateHabit } from '../redux/actions/habitActions';

const mapStateToProps = state => ({
  email: state.user.email
});

const countStreak = (weeks, weeklyGoal) => {
  const weekCount = weeks.map(w => w.reduce((c, d) => d ? c+1 : c, 0) >= weeklyGoal);
  let streak = 0;
  for(let i = weeks.length - 2; i >= 0; i--) {
    if(weekCount[i]) streak++;
    else break; 
  }

  if(weekCount[weekCount.length - 1]) streak++;

  return streak;
}

const setupWeeks = (weeks, startDate, weeklyGoal) => {
  const firstDate = (() => {
    var date = new Date(startDate);
    date.setDate(date.getDate() - date.getDay());
    return date;
  })();

  const days = daysBetween(firstDate, new Date());
  const weeksCount = Math.floor(days/7);
  for(let i = 0; i < weeksCount; i++) 
    if(!Array.isArray(weeks[i]) || !weeks[i].length) 
      weeks[i] = (new Array(7)).fill(false);

  return { firstDate, weeklyGoal, streak:countStreak(weeks, weeklyGoal), weeks };
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNamesLower = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const HabitTile = (props) => {
  const dispatch = useDispatch();
  const deleteHabitHandler = () => {
    deleteHabit({ email: props.email, habit: props.name }, dispatch);
  };

  const tracker = setupWeeks(props.habit.weekly, props.habit.startDate, props.habit.weeklyGoal)
  const currWeek = tracker.weeks[tracker.weeks.length - 1];
  console.log('Tracker: ', tracker);

  const onClickHandle = (day) => {
    tracker.weeks[tracker.weeks.length - 1][day] = true;
    props.habit.weekly = tracker.weeks;
    updateHabit({ habit: props.habit, email: props.email }, dispatch);
  }

  const dayCheckBoxes = dayNamesLower.map((name, i) => {
    return (
      <div className={`${name}-check`} key={`day${i}`}>
        <label htmlFor={`${name}-check`}>{dayNames[i]}</label>
          <input id={`${name}-check`} name={`${name}-check`} type="checkbox" value={i} disabled={currWeek[i]} defaultChecked={currWeek[i]}
            onClick={() => onClickHandle(i)}
          />
      </div>
    );
  })

  return (
    <div className="habit-tile">
      <div className="habit-tile__header">
        <h2>
          <Link to={`dashboard/habit/${props.name}`}>{props.name}</Link>
        </h2>
      </div>
      <div className="habit-tile__content-container">
        <div className="habit-tile__goal-desc">
          <h4>Your Goal:</h4>
          <p>{props.description}</p>
        </div>
        <div className="habit-tile__streak">
          <span>
            <h4>Your Streak:</h4> 
            <span>{tracker.streak ? `${tracker.streak} weeks!` : `No active streaks, keep working!`}</span>
          </span>
        </div>
        <div className="habit-tile__days-grp">
          <h4>Days Completed:</h4>
          <div className="habit-tile__days">
            {dayCheckBoxes}
          </div>
        </div>
        <div className="habit-tile__btn-grp">
          {/* <button id="habit__check-btn">
            <i className="fas fa-check"></i>
          </button> */}

          <Link to={`dashboard/habit/${props.name}`} id="habit__edit-btn" onClick={(e) => {
            console.log('button id: ', props.buttonId);
            dispatch({ type: 'SET_HABIT_INDEX', payload: parseInt(props.buttonId)})}}>
            <i className="fas fa-pen"></i>
          </Link>

          <button id="habit__delete-btn" onClick={deleteHabitHandler}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

function daysBetween( date1, date2 ) {
    //Get 1 day in milliseconds
    let one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.floor(difference_ms/one_day); 
  }

export default connect(mapStateToProps, null)(HabitTile);