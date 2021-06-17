import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/componentStyles/Menu.css';

const mapStateToProps = (state) => {
  return ({
    name: state.user.email
  });
};

const Menu = ({ show, click, name }) => {
  // create a var to an array with an element ['menu']
  const menuClass = ['menu'];

  if(show) {
    menuClass.push('show');
  }



  // {menuClass.join(' ')}
  return (
    <div className={menuClass.join(' ')} onClick={click}>
      <ul className="menu__links" >
        {/* <li>
          <Link to="/">
            Log In
          </Link>
        </li>
        <li>
          <Link to="/signup">
              Sign Up
          </Link>
        </li> */}
        <li>
          <p>{name}</p>
        </li>
        <li>
          <Link to="/logout">
              Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
