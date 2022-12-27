import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/actions/user'
import style from './forms.module.css'

export const Register = () => {
  const { errorMessage } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const passwordRef = React.useRef(null);

  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  }

  const onIconClick = () => {
    passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
  }

  return (
    <form className={style.form}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <Input
        type={'text'}
        placeholder={'Имя'}
        name={'name'}
        value={form.name}
        onChange={onChange}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'email'}
        placeholder={'E-mail'}
        name={'email'}
        value={form.email}
        onChange={onChange}
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
        size={'default'}
        extraClass="mb-6"
      />

      { errorMessage && <p className="text text_type_main-default mb-4">{errorMessage}</p> }

      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={register}>
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрировались? <Link className={style.link} to="/login">Войти</Link>
      </p>
    </form>
  )
}
