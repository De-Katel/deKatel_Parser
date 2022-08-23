import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchFavoritesGetSuccess, loadingEnd, loadingStart } from '../../storage/actions/datasActions'

import Loader from "../loader/loadet";

const Favorites = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.datas.isLoading)
    const token = useSelector(state => state.users.user.token);
    const favorites = useSelector(state => state.datas.favorites);

    const [selectedList, setSelectedList] = useState([]);

    const getFavorite = useCallback(
        () => {
            dispatch(loadingStart())
            fetch(`https://msh777.herokuapp.com/api/v1/favourite`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Token ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch(fetchFavoritesGetSuccess(data))
                    return data;
                })
                .then((data) => dispatch(loadingEnd()))
        },
        [],
    );

    useEffect(() => {
        getFavorite()
    }, [])

    const checkboxCounter = (e) => {

        if (e.target.checked) {
            setSelectedList([...selectedList, e.target.id]);
        } else {
            setSelectedList(
                selectedList.filter((item) => item !== e.target.id)
            );
        }
    }

    const removeFavorites = () => {
        fetch(`https://msh777.herokuapp.com/api/v1/favourite`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({ favourite: selectedList })
        })
            .then(getFavorite)
    }

    const elements = favorites.map((item) => {

        const { id, name, direction, address } = item;

        return (

            <li key={id}>
                <div className='liWrap'>
                    <input id={id} type="checkbox" onChange={checkboxCounter} />
                    {<Link
                        to={`/company/${id}`}
                        className='linkToCard link'>
                        {name}
                    </Link>}
                    <div className="companyDescription">{direction}</div>
                    <div className="companyAddress">{`${address}`}</div>
                </div>
            </li>
        );
    });

    return (
        <>
            {!isLoading ? favorites.length ?
                <>
                    <div className='searchByList'>
                        <button
                            onClick={removeFavorites}
                            className="button button_reg"
                        >
                            Убрать из избранного
                        </button>
                    </div>
                    <div className="result">
                        <div className="resultHeader">
                            <div className="companyName headerItem">КОМПАНИЯ</div>
                            <div className="companyDescription headerItem">ОПИСАНИЕ</div>
                            <div className="companyAddress headerItem">АДРЕСС</div>
                        </div>
                        <ul className='card-list'>
                            {elements}
                        </ul>
                    </div>
                </>
                :
                <div className="emptyMessage">Список избранных компаний пуст</div>
                : <Loader />
            }
        </>
    )
}

export default Favorites