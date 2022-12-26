import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cangeUserPassword } from '../services/actions/user'
import style from './forms.module.css'

export const ResetPassword = () => {
  const { resetPasswordMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const passwordRef = React.useRef(null);
  const tokenRef = React.useRef(null);

  const onClick = async () => {
    if (passwordRef.current.value && tokenRef.current.value) {
      await dispatch(cangeUserPassword(passwordRef.current.value, tokenRef.current.value))
      console.log(resetPasswordMessage);
    }
  }

  return (
    <div className={style.form}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <Input
        type={'password'}
        placeholder={'Введите новый пароль'}
        name={'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        ref={passwordRef}
        icon={'ShowIcon'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        name={'token'}
        value={token}
        onChange={e => setToken(e.target.value)}
        ref={tokenRef}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={style.link} to="/login">Войти</Link>
      </p>
    </div>
  )
}
