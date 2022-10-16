import React, { useState, useRef, useEffect } from 'react';
import { logout } from '../../storage/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import './userMenu.css';
import avatar from './image/avatar.svg'
import rowDown from './image/row_down.svg'
import rowUp from './image/row_up.svg'
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popoverRef = useRef(null)

  const userName = useSelector(state => state.users.userName);
  const role = useSelector(state => state.users.role);

  const [showProfile, setShowProfile] = useState(true);

  const handleClick = () => setShowProfile(!showProfile);

  const outClick = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate('/')

  }

  const PopoverMy = () => {

    useEffect(() => {

      if (!showProfile) {
        console.log('qweq')
        return
      }

      const handleOutsideClick = e => {

        if (!popoverRef.current) return;

        if (!popoverRef.current.contains(e.target)) {
          console.log(showProfile)
          setShowProfile(!showProfile)
          console.log(e.target)
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => {
        document.removeEventListener('click', handleOutsideClick)
      }
    }, [showProfile])

    return (
      <div ref={popoverRef}>
        {showProfile ?
          <>
            {role === 'MA' && <>

              <Link
                className='link'
                to={'/profile'}>
                <div
                  className='profile-item'
                  onClick={handleClick}
                >Профиль
                </div>
              </Link>

              <div
                className='profile-item'
                onClick={handleClick}
              >Войти как компания</div>

            </>}

            <div
              className='profile-item'
              onClick={outClick}
            >Выйти</div>
          </>
          : null}
      </div>
    )


  }

  return (
    <>

      <div
        className='log-in'
        onClick={handleClick}>
        <div className='avatar-wrap'>
          <img className='avatar' src={avatar} alt='avatar' />
        </div>
        <div>
          <p className='name'>{userName}</p>
        </div>
        <div>
          <img className='row' src={showProfile ? rowUp : rowDown} alt='' />
        </div>
      </div>

      <PopoverMy />
    </>
  )
}

export default UserMenu;