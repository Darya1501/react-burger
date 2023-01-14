import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';
import { ILocation } from '../../utils/types';

interface IWithStateLocation extends ILocation {
  state: { from: IWithStateLocation };
}

type TProtectedRouteProps = {
  onlyForAuth: boolean,
  children: ReactElement,
  path?: string,
  exact?: boolean
}

export const ProtectedRoute = ({ onlyForAuth, children, ...rest }: TProtectedRouteProps) => {
  //@ts-ignore
  const { isUserAuthorized } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const location: IWithStateLocation = useLocation();
  
  useEffect(() => {
  //@ts-ignore
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
