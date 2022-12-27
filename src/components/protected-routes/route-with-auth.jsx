import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';

export const RouteWithAuth = ({ children, ...rest }) => {
  const { isUserAuth } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}
