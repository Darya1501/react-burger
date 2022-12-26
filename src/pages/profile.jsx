import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import styles from './profile.module.css'

export const Profile = () => {
  const location = useLocation();
  const defineClass = path => `${styles.link} text text_type_main-medium ${path === location.pathname ? '' : 'text_color_inactive'}`;

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink to='/profile' className={defineClass('/profile')}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={defineClass('/profile/orders')}>История заказов</NavLink>
        <NavLink to='/profile/out' className={`${defineClass('/profile/out')} mb-28`}>Выход</NavLink>

        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <div className={styles.content}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={name}
          onChange={e => setName(e.target.value)}
          icon={'EditIcon'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          name={'login'}
          value={login}
          onChange={e => setLogin(e.target.value)}
          icon={'EditIcon'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={'EditIcon'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />
      </div>
    </>
  )
}
