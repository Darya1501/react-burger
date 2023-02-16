import React, { useEffect } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom';
import { ProfileOrders } from '../../components/orders/profile-orders';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { useDispatch } from '../../hooks/store-hooks';
import { logoutUser } from '../../services/actions/user';
import { WS_PROFILE_FEED_CONNECTION_START, WS_PROFILE_FEED_CONNECTION_CLOSE } from '../../services/constants/feed';
import { WS_FEED_API } from '../../utils/constants';
import styles from './profile.module.css'

export const Profile = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch({ type: WS_PROFILE_FEED_CONNECTION_START, payload: WS_FEED_API });
      return () => {
        dispatch({ type: WS_PROFILE_FEED_CONNECTION_CLOSE })
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
