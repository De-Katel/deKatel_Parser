import React from "react";
import './showCounter.css'

const ShowCounter = ({ src, value, description, counterStyle }) => {


    
    return (
        <div className="counterWrap"  style={counterStyle}>
            {src&&<div className="imgWrap">
            <img src={src} />
            </div>}
            <div>
                <p className="counter"> {value}</p>
                <p className='description'>{description}</p>
            </div>
        </div>
    )
}

export default ShowCounter