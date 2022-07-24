import React from "react";
import { useDispatch } from 'react-redux';

import { fetchError } from '../../storage/actions/datasActions';

import close from '../../images/close.svg';
import './formError.css';

const FormError = ({ messageArr }) => {

    const dispatch = useDispatch();

    const message = messageArr.map((item => {
        return <p className="messageListItem" key={item}>{item}</p>
    }))

    return (
        <div className='wrap'>
            <div className='cross' >
                <img className='closeWrap'
                    src={close}
                    width='32px'
                    onClick={() => dispatch(fetchError())}
                />
            </div>
            <div>
                {message}
            </div>
        </div>
    )
}
export default FormError