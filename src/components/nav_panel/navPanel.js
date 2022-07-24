import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../storage/actions/usersActions';
import './navPanel.css'

const NavPanel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const name = useSelector(state => state.users.user.userCard.Company);
    const searchData = useSelector(state => state.datas.searchData)

    const outClick = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div className="navWrap">
            <div className="firmInfo">
                <div className="logo">

                </div>
                <h3>{name}</h3>
            </div>
            <nav className="navPanel" >
                <ul>
                    <li className={`${location.pathname == '/profile' ? 'active' : null}`}>
                        <Link className='link' to={'/profile'}>Профиль</Link>
                    </li>
                    {searchData.length ?
                        <li className={`${location.pathname == '/company' ? 'active' : null}`}>
                            <Link className="link" to={'/company'}>Поиск</Link>
                        </li>
                        : null}
                    {searchData.length ?
                        <li className={`${location.pathname == '/analytics' ? 'active' : null}`}>
                            <Link className="link" to={'/analytics'}>Аналитика</Link>
                        </li>
                        : null}
                    <li className={`${location.pathname == '/add_company' ? 'active' : null}`}>
                        <Link className="link" to={'/add_company'}>Добавить компаниию</Link>
                    </li>
                    <li className={`${location.pathname == '/add_data' ? 'active' : null}`}>
                        <Link className="link" to={'/add_data'}>Загрузить данные</Link>
                    </li>
                    <li className={`${location.pathname == '/favorites' ? 'active' : null}`}>
                        <Link className="link" to={'/favorites'}>Избранное</Link>
                    </li>
                    <li> </li>
                    <li
                        onClick={outClick}
                    >Выйти</li>
                </ul>
            </nav>
        </div >

    )
}

export default NavPanel