import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import './resultSearch.css'

import { loadingEnd, loadingStart } from '../../storage/actions/datasActions';

import Loader from "../loader/loadet";

const ResultSearch = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.users.token);
    const searchData = useSelector(state => state.datas.searchData);
    const isLoading = useSelector(state => state.datas.isLoading);
    const searchQuery = useSelector(state => state.datas.searchQuery)

    const [selectedList, setSelectedList] = useState([]);

    const [qwe, setqwe] = useState(1)

    useEffect(() => {
        if (!searchData.length) { navigate('/favorites') }
    }, [searchData])

    const checkboxCounter = (e) => {

        if (e.target.checked) {
            setSelectedList([...selectedList, e.target.id]);
        } else {
            setSelectedList(
                selectedList.filter((item) => item !== e.target.id)
            );
        }
    }

    const addFavorites = () => {
        dispatch(loadingStart());
        fetch(`https://msh777.herokuapp.com/api/v1/favourite/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({ favourite: selectedList })
        })
            .then(() => dispatch(loadingEnd()))
    }

    const elements = searchData.map((item) => {

        const { id, Company, Direction, Region, Locality, Address } = item;

        return (

            <li key={id}>
                <div className='liWrap'>
                    <input id={id} type="checkbox" onChange={checkboxCounter} />
                    {<Link
                        to={`/company/${id}`}
                        className='linkToCard link'>
                        {Company}
                    </Link>}
                    <div className="companyDescription">{Direction}</div>
                    <div className="companyAddress">{`${Region}, ${Locality}, ${Address}`}</div>
                </div>
            </li>
        );
    });


    return (
        <>
            {!isLoading ? (searchData.length ?
                <>
                    <div className='searchByList'>
                        <button className="button button_reg"
                            onClick={addFavorites}>
                            добавить в избранное
                        </button>
                    </div>
                    <p className="countResult">{
                        `По запросу "${searchQuery}" найдено ${searchData.length} 
                    ${(searchData.length % 10 === 1 && searchData.length !== 11) ?
                            'компания'
                            : (searchData.length % 10 === 2 || searchData.length % 10 === 3 || searchData.length % 10 === 4) && searchData.length !== 12 && searchData.length !== 13 && searchData.length !== 14 ?
                                'компании'
                                : 'компаний'}`}
                    </p>
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
                <>
                    {searchQuery && <p className="countResult">По запросу "{searchQuery}" ничего не найдено</p>}
                    <div className="emptyMessage">Список поиска компаний пуст</div>
                </>)
                : <Loader />}
        </>
    )
}

export default ResultSearch