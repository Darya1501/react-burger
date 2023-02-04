import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks/store-hooks'
import { useForm } from '../../hooks/use-form'
import { sendResetCode } from '../../services/actions/user'
import style from './forms.module.css'

export const ForgotPassword = () => {
  const { sendEmailSuccess, sendEmailMessage, sendEmailRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const { values, handleChange } = useForm({ email: '' });

  const emailRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if(sendEmailSuccess) {
      history.push({ pathname: '/reset-password', state: { from: location } });
    }
}, [sendEmailSuccess, history, location])

  const sendEmail: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!emailRef.current) return;
    if (emailRef.current.value) {
      dispatch(sendResetCode(emailRef.current.value))
    }
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={sendEmail}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          name={'email'}
          value={values.email}
          onChange={handleChange}
          ref={emailRef}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />

        { sendEmailMessage && <p className="text text_type_main-default mb-4">{sendEmailMessage}</p> }

        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          {sendEmailRequest ? 'Загрузка...' : 'Восстановить'}
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link className={style.link} to="/login">Войти</Link>
        </p>
      </form>
    </div>
  )
}
