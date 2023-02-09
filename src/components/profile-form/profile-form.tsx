import React, { useEffect, useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../hooks/store-hooks';
import { useForm } from '../../hooks/use-form';
import { cangeUserData } from '../../services/actions/user';
import styles from './profile-form.module.css'
import { TUser } from '../../utils/types';

export const ProfileForm = () => {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const {values, handleChange, setValues} = useForm({ password: '', ...user });

  useEffect(() => {
    setValues({ password: '', ...user })
  }, [user, setValues])

  const [ isDataChanged, setIsDataChanged ] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(event)
    setIsDataChanged(true)
  };

  const onCancel = () => {
    setValues({ password: '', ...user })
    setIsDataChanged(false)
  }

  const onSave: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(cangeUserData(values as TUser))
    setIsDataChanged(false)
  }

  return (
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
  )
}
