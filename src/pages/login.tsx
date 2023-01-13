import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/use-form'
import { loginUser } from '../services/actions/user'
import style from './forms.module.css'

export const Login = () => {
  //@ts-ignore
  const { errorMessage } = useSelector(store => store.user)
  const dispatch = useDispatch();
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const { values, handleChange } = useForm({ email: '', password: '' });

  const login: React.FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
    //@ts-ignore
    dispatch(loginUser(values));
  }

  const onIconClick = () => {
    if (!passwordRef.current) return;
    passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={login}>
        <p className="text text_type_main-medium mb-6">Вход</p>
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
          Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? <Link className={style.link} to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link className={style.link} to="/forgot-password">Восстановить пароль</Link>
        </p>
      </form>
    </div>
  )
}
