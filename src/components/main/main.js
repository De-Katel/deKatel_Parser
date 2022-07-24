import React from "react";
import { useSelector } from 'react-redux';
import NavPanel from "../nav_panel/navPanel";
import MainContent from "../main_content/mainContent";

import './main.css';

const Main = () => {

    const token = useSelector(state => state.users.user.token);

    return (
        <main>
            {token && < NavPanel />}
            <MainContent />
        </main>
    )
}

export default Main