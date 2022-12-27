import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { cangeUserData, logoutUser } from '../services/actions/user';
import styles from './profile.module.css'

export const Profile = () => {
  const location = useLocation();
  const defineClass = path => `${styles.link} text text_type_main-medium ${path === location.pathname ? '' : 'text_color_inactive'}`;
  
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    setValue({ password: '', ...user })
  }, [user])

  const [ isDataChanged, setIsDataChanged ] = useState(false);
  const [form, setValue] = useState({ ...user, password: '' })

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setIsDataChanged(true)
  };

  const onCancel = () => {
    setValue({ password: '', ...user })
    setIsDataChanged(false)
  }

  const onSave = () => {
    dispatch(cangeUserData(form))
    setIsDataChanged(false)
  }

  const onLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <>
      <nav className={`${styles.nav} mr-15`}>
        <NavLink to='/profile' className={defineClass('/profile')}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={defineClass('/profile/orders')}>История заказов</NavLink>
        <p className={`${styles.logout} text text_type_main-medium text_color_inactive`} onClick={onLogout}>Выход</p>

        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <div className={styles.content}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={form.name}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          name={'login'}
          value={form.email}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
          disabled
        />

        { isDataChanged &&
          <>
            <Button htmlType="button" type="primary" size="medium" extraClass="mb-4" onClick={onSave}>Сохранить</Button>
            <p className={`${styles.cansel} text text_type_main-default text_color_inactive`} onClick={onCancel}>Отмена</p>
          </>
        }
      </div>
    </>
  )
}
