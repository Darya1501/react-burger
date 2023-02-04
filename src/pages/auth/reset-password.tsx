import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from '../../hooks/store-hooks'
import { useForm } from '../../hooks/use-form'
import { cangeUserPassword } from '../../services/actions/user'
import style from './forms.module.css'

interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: { from : Location };
}

export const ResetPassword = () => {
  const { resetPasswordSuccess, resetPasswordMessage, resetPasswordRequest } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location: Location = useLocation();

  const { values, handleChange } = useForm({ password: '', token: '' });

  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (location.state?.from.pathname !== '/forgot-password') {
      history.replace({ pathname: '/forgot-password' });
    }
    if(resetPasswordSuccess) {
      history.replace({ pathname: '/login' });
    }
}, [resetPasswordSuccess, history, location])

  const resetPassword: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (values.password && values.token) {
      await dispatch(cangeUserPassword(values.password, values.token))
    }
  }

  const onIconClick = () => {
    passwordRef.current!.type = passwordRef.current!.type === 'password' ? 'text' : 'password';
  }

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={resetPassword}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          name={'password'}
          value={values.password}
          onChange={handleChange}
          ref={passwordRef}
          icon={'ShowIcon'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
          onIconClick={onIconClick}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'token'}
          value={values.token}
          onChange={handleChange}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mb-6"
        />

        { resetPasswordMessage && <p className="text text_type_main-default mb-4">{resetPasswordMessage}</p> }

        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          {resetPasswordRequest ? 'Загрузка...' : 'Сохранить'}
        </Button>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link className={style.link} to="/login">Войти</Link>
        </p>
      </form>
    </div>
  )
}
