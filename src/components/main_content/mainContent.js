import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom';
import SearchPanel from '../search_panel/searchPanel';
import ShowCounter from "../show_counter/showCounter";
import Profile from "../profile/profile";
import Login from '../login/Login';
import Registration from '../registration/Registration';
import ResultSearch from "../result_search/resultSearch";
import MessageNewVersion from "../messageNewVersion/messageNewVersion";
import Favorites from "../favorites/favorites";
import Catalog from "../catalog/catalog";
import './mainContent.css'

import icon from './images/icon.svg'

const MainContent = () => {

    const [amount, setAmount] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    const userCard = useSelector(state => state.users.user.userCard);
    const token = useSelector(state => state.users.user.token);
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token&&location.pathname=='/') { navigate('profile') }
    })

    useEffect(() => {
        fetch('https://msh777.herokuapp.com/api/v1/quantity/')
            .then(res => res.json())
            .then(res => setAmount(res))

    }, [])

    useEffect(() => {
        fetch('https://msh777.herokuapp.com/api/v1/categories/')
            .then(res => res.json())
            .then(res => setCategoriesList(
                res.map((item) => {
                    return item.Categories
                })
            ))
    }, [])

    return (
        <section>
            {token && <SearchPanel />}
            {!token &&
                <>
                    <div className="counters">
                        <ShowCounter
                            src={icon}
                            value={amount.qty_company}
                            description={'Московских производителей'}
                            counterStyle={{
                                width: '300px',
                                height: '100px'
                            }}
                        />
                        <ShowCounter
                            src={icon}
                            value={amount.qty_company}
                            description={'Московских производителей'}
                            counterStyle={{
                                width: '300px',
                                height: '100px'
                            }}
                        />
                        <ShowCounter
                            src={icon}
                            value={amount.qty_product}
                            description={'Товаров российкого производства'}
                            counterStyle={{
                                width: '300px',
                                height: '100px'
                            }}
                        />
                        <ShowCounter
                            src={icon}
                            value={amount.qty_product}
                            description={'Товаров российкого производства'}
                            counterStyle={{
                                width: '300px',
                                height: '100px'
                            }}
                        />
                    </div>
                    <Catalog categoriesList={categoriesList} />
                </>
            }
            <Routes>
                <Route path='/' element={null} />
                <Route path='/profile' element={<Profile card={userCard} />} />
                <Route path='/company' element={<ResultSearch />} />
                <Route path='/analytics' element={<MessageNewVersion />} />
                <Route path='/add_company' element={<MessageNewVersion />} />
                <Route path='/add_data' element={<MessageNewVersion />} />
                <Route path='/company/:cardId' element={<Profile />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>

        </section>

    )
}

export default MainContent