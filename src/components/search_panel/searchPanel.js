import React from "react";
import { useState } from "react";
import { fetchDatasGetSuccess, newSearchQuery } from '../../storage/actions/datasActions'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import './searchPanel.css'
import communication from '../../images/communication.svg'

const SearchPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const token = useSelector(state => state.users.user.token);

    const [label, setLabel] = useState('');

    const onLabelChange = (e) => {

        setLabel(e.target.value)
    }

    const searchRequest = async (e) => {
        e.preventDefault();

        await fetch(`https://msh777.herokuapp.com/api/v1/find/?find=${label}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            }
        })
            .then((res) => {

                if (res.ok) {
                    return res.json()
                }
                throw new Error('not success')
            })
            .then((data) => {
                dispatch(newSearchQuery(label))
                dispatch(fetchDatasGetSuccess(data))
            })
            .then(() => navigate('/company'))
        setLabel('');


    }

    return (
        <div className="search_panel">
            <div>
                <h1>Всё производство Москвы<br /> в одном месте</h1>
                <h2>Введите фразу для поиска по товарам<br /> или производителям</h2>
                <form onSubmit={searchRequest}>
                    <input
                        onChange={onLabelChange}
                        value={label}
                        type='search'
                        className="input_search"
                        placeholder="Например, «Детская одежда» или «ООО Белый ветер»"
                    ></input>
                </form>

            </div>

            <div className="communication_img">

                <div>
                    <img src={communication} width='337px' height='321px' />
                </div>
                <div className="elips"></div>
            </div>
        </div>
    )
}

export default SearchPanel