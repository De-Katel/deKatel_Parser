import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { fetchError, gotAnError } from '../../storage/actions/datasActions';
import { fetchAuthUserSuccess } from '../../storage/actions/usersActions';

import Input from '../input/Input';
import FormError from '../formError/formError';

import close from '../../images/close.svg'
import css from './Registration.module.css';

const Registration = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const isFormError = useSelector(state => state.datas.isError);
   const [errorList, setErrorList] = useState([]);
   const [values, setValues] = useState(
      {
         email: '',
         username: '',
         password: '',
      }
   )

   const validPrompt = (
      <Popover className={css.validPrompt}>
         <Popover.Body>
            <h2 className={css.validPromptHeader} >Придумайте пароль</h2>
            <div>
               Не короче 8 букв или цифр.<br />
               Не используйте личные данные,<br />
               последовательности(123456, qwerty) и<br />
               популярные пароли (password)
            </div>
         </Popover.Body>
      </Popover>
   )
   const handleSubmit = async (password, username) => {

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

   const getMessageArr = (obj) => {
      let arr = []
      for (let key in obj) (
         arr.push(obj[key][0])
      )
      return arr;
   }

   const handleSubmitRegistration = (e) => {
      e.preventDefault();

      const options = {
         method: 'POST',
         body: JSON.stringify({
            "email": `${values.email}`,
            "username": `${values.username}`,
            "password": `${values.password}`,
         }),
         headers: { "Content-type": "application/json" }
      }

      //Запрос для создания новой учетной записи:
      fetch('https://msh777.herokuapp.com/api/v1/auth/users/', options)
         .then((response) => {
            if (response.ok) {
               handleSubmit(values.password, values.username, null)

            } else {
               dispatch(fetchError());
               return response.json()
            }
         })
         .then((res) => {
            setErrorList(getMessageArr(res))
         })
         .catch(() => {
            setErrorList(['Ошибка запроса. Проверьте соединение с интернетом и повторите попытку.'])
            dispatch(fetchError());
         })

   }


   return (
      <>
         <div className={css.registration}>

            {!isFormError ? <div className={css.container}>

               <div className={css.cross}>
                  <Link to={'/'}>
                     <img src={close} width='32px' />
                  </Link>
               </div>

               <form onSubmit={handleSubmitRegistration}>
                  <Input title={'ФИО:'}
                     id={'username'}
                     type={'text'}
                     name={'username'}
                     value={values.username}
                     placeholder='Иванов Иван Иванович'
                     onChange={username => setValues({ ...values, username })} />
                  <Input title={'E - mail:'}
                     id={'email'}
                     type={'email'}
                     name={'email'}
                     value={values.email}
                     placeholder={'IvanovIvan@mail.ru'}
                     required={'required'}
                     onChange={email => setValues({ ...values, email })} />

                  <OverlayTrigger

                     placement='right'
                     delay={{ show: 250, hide: 200 }}
                     overlay={validPrompt} >
                     <div>
                        <Input title={'Пароль:'}
                           id={'password'}
                           type={'password'}
                           name={'password'}
                           value={values.password}
                           placeholder={'********'}
                           minlength={'8'} //минимальное кол-во знаков
                           required={null}
                           onChange={password => setValues({ ...values, password })} />
                     </div>

                  </OverlayTrigger>

                  <button type='submit' className={css.button}>
                     Подать заявку
                  </button>

               </form >
            </div >
               : <FormError messageArr={errorList} />}
         </div >


      </>
   )
}
export default Registration;