import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './resultSearch.css'

const ResultSearch = () => {

    const token = useSelector(state => state.users.user.token);
    const searchData = useSelector(state => state.datas.searchData);

    const [selectedList, setSelectedList] = useState([]);


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
        fetch(`https://msh777.herokuapp.com/api/v1/favourite/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({ favourite: selectedList })
        })
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
            {searchData.length ?
                <>
                    <div className='searchByList'>
                        <button className="button button_reg"
                            onClick={addFavorites}>
                            добавить в избранное
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
                <div className="emptyMessage">Список поиска компаний пуст</div>}
        </>
    )
}

export default ResultSearch