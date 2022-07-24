import React from "react";
import { useSelector } from "react-redux";
import UserPanel from "../user_panel/userPanel";
import SearchPanel from "../search_panel/searchPanel";
import './header.css';
import spaceDreams from '../../images/Space_Dreams.svg'

const Header = () => {
    
    const token = useSelector(state => state.users.user.token);

    return (
        <header>
            <div className="header">
            <img src={spaceDreams} />
            <UserPanel />
            </div>
            {!token&&<SearchPanel/>}
        </header>
    )
}

export default Header;