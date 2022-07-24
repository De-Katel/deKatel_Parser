import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthUserSuccess } from '../../storage/actions/usersActions';
import { fetchError, gotAnError } from '../../storage/actions/datasActions';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../input/Input';
import FormError from '../formError/formError';

import css from './Login.module.css';
import close from '../../images/close.svg'

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const isFormError = useSelector(state => state.datas.isError);
   const errorList = useSelector((state) => state.datas.errorList)

   const [values, setValues] = useState({ username: '', password: '' });

   const handleSubmit = async (password, username, event) => {
      event.preventDefault();

      const options = {
         method: 'POST',
         body: JSON.stringify({
            "password": `${password}`,
            "username": `${username}`,
         }),
         headers: { "content-type": "application/json" }
      }

      await fetch('https://msh777.herokuapp.com/auth/token/login/', options)
         .then((res) => {
            if (res.ok) {
               return res.json()
            } else { return Promise.reject(res) }
         })
         .then(data => {
            dispatch(fetchAuthUserSuccess(data.auth_token));
            navigate('/profile');
         })
         .catch((res) => {
            if ('status' in res) {
               dispatch(gotAnError(['Неверное имя пользователя или пароль!', 'Повторите попытку авторизации.']))
               dispatch(fetchError());
            } else {
               dispatch(gotAnError(['Ошибка запроса. Проверьте соединение с интернетом и повторите попытку.']))
               dispatch(fetchError());
            }
         })
   }

   return (

      <div className={css.auth}>
         {!isFormError &&
            <form className={css.form} onSubmit={(e) => handleSubmit(values.password, values.username, e)}>
               <div className={css.container}>
                  <div className={css.cross}>
                     <Link to={'/'}>
                        <img src={close} width='32px' />
                     </Link>
                  </div>

                  <Input title={'Введите имя'}
                     id={'username'}
                     type={'text'}
                     name={'username'}
                     value={values.username}
                     placeholder='Иванов Иван Иванович'
                     onChange={username => setValues({ ...values, username })}
                  />

                  <Input title={'Введите пароль:'}
                     id={'password'}
                     type={'password'}
                     name={'password'}
                     value={values.password}
                     placeholder={'********'}
                     minlength={'8'} //минимальное кол-во знаков
                     required={'required'}
                     onChange={password => setValues({ ...values, password })}
                  />

                  <button type='submit'
                     className={css.button}>
                     {'Вход'}
                  </button>
               </div>
            </form>
            ||
            <FormError messageArr={errorList} />
         }

      </div>
   )
}
export default Login;