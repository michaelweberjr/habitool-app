import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

// App CSS Import
import './stylesheets/App.css';

// Screens Imports
import DashboardScreen from './screens/DashboardScreen';
import HabitScreen from './screens/HabitScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

// Component Imports
import Navbar from './components/Navbar';
import Overlay from './components/Overlay';
import Menu from './components/Menu';
import Session from './components/Session';
import Logout from './components/Logout';

const mapStateToProps = (state) => ({
  route: state.user.route,
});

const App = (props) => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <Router>
      <Navbar atDashboard={props.route === '/dashboard'} click={() => setMenuToggle(true)} />
      <Menu show={menuToggle} click={() => setMenuToggle(false)} />
      <Overlay show={menuToggle} click={() => setMenuToggle(false)} />
      {/* <h1>Hello From HabiTool</h1> */}
      <main>
        <Switch>
          <Route exact path='/'>
            <Session />
          </Route>
          <Route exact path='/login'>
            <LoginScreen />
          </Route>
          <Route exact path='/logout'>
            <Logout />
          </Route>
          <Route exact path='/signup'>
            <SignupScreen />
          </Route>
          <Route path='/dashboard/habit' component={HabitScreen} />
          <Route path='/dashboard'>
            <DashboardScreen />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default connect(mapStateToProps)(App);
