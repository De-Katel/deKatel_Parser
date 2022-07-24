import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShowCounter from "../show_counter/showCounter";
import { useParams } from "react-router-dom";

import Loader from "../loader/loadet";

import { loadingEnd, loadingStart } from '../../storage/actions/datasActions'

import './profile.css'

const Profile = ({ card }) => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.users.user.token);
    const isLoading = useSelector(state => state.datas.isLoading)

    const [item, setItem] = useState([]);

    const params = useParams();



    useEffect(() => {
        !card && dispatch(loadingStart());
        !card && fetch(`https://msh777.herokuapp.com/api/v1/api_id/${params.cardId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setItem(res[0])
                dispatch(loadingEnd())
            })

    }, [])



    const cardCompany = card ? card : item


    return (
        <>
            {!isLoading ? <div className="profileWrap">
                <div className="profileInfo">
                    <div className="company_profile">{cardCompany.Company}</div>
                    <div className="description_profile">{cardCompany.Description}</div>
                    <div className="address_profile">{`${cardCompany.Region}, ${cardCompany.Locality}, ${cardCompany.Address}`}</div>
                    <div className="infoTable">
                        <ul>
                            <li>ОГРН</li>
                            <li>ИНН</li>
                            <li>КПП</li>
                            <li>Телефон</li>
                            <li>Электронная почта</li>
                            <li>Официальный сайт</li>
                        </ul>
                        <ul className="list_value">
                            <li>{cardCompany.OGRN}</li>
                            <li>{cardCompany.INN}</li>
                            <li>{cardCompany.KPP}</li>
                            <li>{cardCompany.Telephone}</li>
                            <li>{cardCompany.Post}</li>
                            <li>{cardCompany.URL}</li>
                        </ul>
                    </div>
                </div>
                <div className="profile_counters">
                    <ShowCounter
                        value={11222}
                        description={'Товаров в каталоге'}
                        counterStyle={{
                            width: '245px',
                            height: '47%'
                        }}
                    />
                    <ShowCounter
                        value={11222}
                        description={'Товаров в каталоге'}
                        counterStyle={{
                            width: '245px',
                            height: '47%'
                        }}
                    />
                </div>
            </div> : <Loader/>}
        </>
    )
}

export default Profile