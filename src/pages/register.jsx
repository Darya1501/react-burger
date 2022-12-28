import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/use-form'
import { registerUser } from '../services/actions/user'
import style from './forms.module.css'

export const Register = () => {
  const { errorMessage } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const passwordRef = React.useRef(null);

  const { values, handleChange } = useForm({ name: '', email: '', password: '' });

  const register = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
  }

  const onIconClick = () => {
    passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={register}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          onChange={handleChange}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          name={'email'}
          value={values.email}
          onChange={handleChange}
          size={'default'}
          extraClass="mb-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          name={'password'}
          value={values.password}
          onChange={handleChange}
          ref={passwordRef}
          icon={'ShowIcon'}
          onIconClick={onIconClick}
          size={'default'}
          extraClass="mb-6"
        />

        { errorMessage && <p className="text text_type_main-default mb-4">{errorMessage}</p> }

        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Зарегистрироваться
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрировались? <Link className={style.link} to="/login">Войти</Link>
        </p>
      </form>
    </div>
  )
}
