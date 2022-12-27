import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';

export const RouteWithoutAuth = ({ children, ...rest }) => {
  const { isUserAuth } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        !isUserAuth ? (
          children
        ) : (
          <Redirect to={ location.state?.from || '/'} />
        )
      }
    />
  )
}
