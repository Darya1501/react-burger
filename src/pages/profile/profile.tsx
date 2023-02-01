import React from 'react'
import { NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { ProfileOrders } from '../../components/orders/profile-orders';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { logoutUser } from '../../services/actions/user';
import { useDispatch } from '../../utils/hooks';
import { NotFound404 } from '../not-found/not-found';
import styles from './profile.module.css'

export const Profile = () => {
  const location = useLocation();
  const defineClass = (path: string) => `${styles.link} text text_type_main-medium ${path === location.pathname ? '' : 'text_color_inactive'}`;
  
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink to='/profile' className={defineClass('/profile')}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={defineClass('/profile/orders')}>История заказов</NavLink>
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
