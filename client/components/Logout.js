import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/actions/userActions';

const Logout = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Logging out...');
    dispatch(logout());
    history.push('/');
  });
  
  return (
    <h1>Loading</h1>
  );
};

export default Logout;