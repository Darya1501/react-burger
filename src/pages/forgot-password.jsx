import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { sendResetCode } from '../services/actions/user'
import style from './forms.module.css'

export const ForgotPassword = () => {
  const { sendEmailSuccess, sendEmailMessage, sendEmailRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const [value, setValue] = useState('')
  const emailRef = React.useRef(null);

  React.useEffect(() => {
    if(sendEmailSuccess) {
      history.push({ pathname: '/reset-password', state: { from: location } });
    }
}, [sendEmailSuccess, history, location])

  const onClick = async () => {
    if (emailRef.current.value) {
      dispatch(sendResetCode(emailRef.current.value))
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

      { sendEmailMessage && <p className="text text_type_main-default mb-4">{sendEmailMessage}</p> }

      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20" onClick={onClick}>
        {sendEmailRequest ? 'Загрузка...' : 'Восстановить'}
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link className={style.link} to="/login">Войти</Link>
      </p>
    </div>
  )
}
