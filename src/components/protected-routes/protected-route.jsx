import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const { isUserAuthorized } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
  if (!onlyForAuth && isUserAuthorized) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !isUserAuthorized) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
}

ProtectedRoute.propTypes = {
  onlyForAuth: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}; 
