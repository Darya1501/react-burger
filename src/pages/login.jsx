import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../services/actions/user'
import style from './forms.module.css'

export const Login = () => {
  const { user, errorMessage } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const passwordRef = React.useRef(null);

  const [form, setValue] = useState({ email: '', password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  }

  const onIconClick = () => {
    passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <div className={style.form}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        name={'email'}
        value={form.email}
        onChange={onChange}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        name={'password'}
        value={form.password}
        onChange={onChange}
        ref={passwordRef}
        icon={'ShowIcon'}
        onIconClick={onIconClick}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      { errorMessage && <p className="text text_type_main-default mb-4">{errorMessage}</p> }
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={login}>
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link className={style.link} to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link className={style.link} to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  )
}
