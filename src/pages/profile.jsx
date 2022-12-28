import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useForm } from '../hooks/use-form';
import { cangeUserData, logoutUser } from '../services/actions/user';
import styles from './profile.module.css'

export const Profile = () => {
  const location = useLocation();
  const defineClass = path => `${styles.link} text text_type_main-medium ${path === location.pathname ? '' : 'text_color_inactive'}`;
  
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const {values, handleChange, setValues} = useForm({ password: '', ...user });

  useEffect(() => {
    setValues({ password: '', ...user })
  }, [user, setValues])

  const [ isDataChanged, setIsDataChanged ] = useState(false);

  const onChange = e => {
    handleChange(e)
    setIsDataChanged(true)
  };

  const onCancel = () => {
    setValues({ password: '', ...user })
    setIsDataChanged(false)
  }

  const onSave = (e) => {
    e.preventDefault();
    dispatch(cangeUserData(values))
    setIsDataChanged(false)
  }

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

      <form className={styles.content} onSubmit={onSave}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          name={'login'}
          value={values.email}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          value={values.password}
          onChange={onChange}
          icon={'EditIcon'}
          size={'default'}
          extraClass="mb-6"
          disabled
        />

        { isDataChanged &&
          <>
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-4">Сохранить</Button>
            <p className={`${styles.cansel} text text_type_main-default text_color_inactive`} onClick={onCancel}>Отмена</p>
          </>
        }
      </form>
    </div>
  )
}
