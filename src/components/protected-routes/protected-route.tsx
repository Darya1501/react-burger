import React, { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from '../../hooks/store-hooks'; 
import { Redirect, Route, useLocation } from 'react-router-dom';
import { getUserData } from '../../services/actions/user';
import { ILocation } from '../../utils/types';

interface IWithStateLocation extends ILocation {
  state: { from: IWithStateLocation };
}

type TProtectedRouteProps = {
  onlyForAuth?: boolean,
  onlyForUnauth?: boolean,
  children: ReactElement,
  path?: string,
  exact?: boolean
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ onlyForAuth, onlyForUnauth, children, ...rest }) => {
  const { isUserAuthorized } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const location: IWithStateLocation = useLocation();
  
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  
  if (onlyForUnauth && isUserAuthorized) {
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
