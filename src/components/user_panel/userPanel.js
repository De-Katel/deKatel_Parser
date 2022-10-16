import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from "../user_menu/userMenu";

const UserPanel = () => {
    const token = useSelector(state => state.users.token);

    return (
        <div>
            {!token &&
                <>
                    <Link to={'/login'}>
                        <button className='button'>
                            Войти
                        </button>
                    </Link>
                    <Link to={'/registration'}>
                        <button className='button button_reg'>
                            Регистрация
                        </button>
                    </Link>
                </>
                ||<UserMenu/>
                }
        </div>
    )

}

export default UserPanel;