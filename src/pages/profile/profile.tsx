import React, { useEffect } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom';
import { ProfileOrders } from '../../components/orders/profile-orders';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { useDispatch } from '../../hooks/store-hooks';
import { logoutUser } from '../../services/actions/user';
import { WS_USER_ORDERS_CONNECT, WS_USER_ORDERS_DISCONNECT } from '../../services/constants/feed';
import styles from './profile.module.css'

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch({ type: WS_USER_ORDERS_CONNECT });
      return () => {
        dispatch({ type: WS_USER_ORDERS_DISCONNECT })
      }
    },
    [dispatch]
  );

  const onLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink
          to='/profile'
          className={`${styles.link} text text_type_main-medium`}
          activeClassName={styles.active}
          exact={true}
        >
          Профиль
        </NavLink>
        <NavLink
          to='/profile/orders'
          className={`${styles.link} text text_type_main-medium`}
          activeClassName={styles.active}
          exact={true}
        >
          История заказов
        </NavLink>

        <p className={`${styles.logout} text text_type_main-medium text_color_inactive`} onClick={onLogout}>Выход</p>

        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Switch>
        <Route path={`/profile/`} exact={true}>
          <ProfileForm />
        </Route>
        <Route path={`/profile/orders`} exact={true}>
          <ProfileOrders />
        </Route>
        <Route>
          <span className={`${styles.empty} text text_type_main-default text_color_inactive`}>Выберите нужный пункт подменю слева</span>
        </Route>
      </Switch>
    </div>
  )
}
