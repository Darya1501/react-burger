import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendResetCode } from '../services/actions/user'
import style from './forms.module.css'

export const ForgotPassword = () => {
  const { resetPasswordMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [value, setValue] = useState('')
  const emailRef = React.useRef(null);

  const onClick = async () => {
    if (emailRef.current.value) {
      await dispatch(sendResetCode(emailRef.current.value))
      console.log(resetPasswordMessage);
    }
  }

  return (
    <div className={style.form}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        name={'email'}
        value={value}
        onChange={e => setValue(e.target.value)}
        ref={emailRef}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={style.link} to="/login">Войти</Link>
      </p>
    </div>
  )
}
