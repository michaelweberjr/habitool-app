import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';

import { checkSession } from '../redux/actions/userActions';

const mapStateToProps = state => ({
  loading: state.user.sessionLoading,
  route: state.user.route,
});

const Session = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = props.loading;
  const route = props.route;

  if(loading === 'start') {
    console.log('Checking server for session');
    dispatch(checkSession());
  }

  useEffect(() => {
    if(loading === 'ready') {
      console.log(`Routing to '${route}'`);
      history.push(route);
    }
  }, [loading, route]);

  return (
    <h1>Loading</h1>
  );
};

export default connect(mapStateToProps, null)(Session);