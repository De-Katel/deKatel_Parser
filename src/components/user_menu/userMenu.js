import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { logout } from '../../storage/actions/usersActions';
import { useDispatch } from 'react-redux';
import './userMenu.css';
import avatar from './image/avatar.svg'
import rowDown from './image/row_down.svg'
import rowUp from './image/row_up.svg'
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => setShowProfile(!showProfile);

  const outClick = () => {
    dispatch(logout());
    navigate('/')

  }


  const profile = (
    <Popover
      className='profile'
      onBlur={handleClick}
    >
      <Popover.Body>

        <Link
          className='link'
          to={'/profile'}>
          <div
            className='profile-item'
            onClick={handleClick}
          >Профиль
          </div>
        </Link>
      </Popover.Body>
      <Popover.Body>
        <div
          className='profile-item'
          onClick={handleClick}
        >Войти как компания</div>
      </Popover.Body>
      <Popover.Body>
        <div
          className='profile-item'
          onClick={outClick}
        >Выйти</div>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger
      show={showProfile}
      trigger="click"
      placement='bottom'
      overlay={profile} >
      <div
        className='log-in'
        onClick={handleClick}>
        <div className='avatar-wrap'>
          <img className='avatar' src={avatar} alt='avatar' />
        </div>
        <div>
          <p className='name'>Иванов А.М.</p>
          <p className='position'>менеджер</p>
        </div>
        <div>
          <img className='row' src={showProfile ? rowUp : rowDown} />
        </div>
      </div>
    </OverlayTrigger>
  )
}

export default UserMenu;