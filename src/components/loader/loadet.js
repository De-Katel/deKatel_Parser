import React from "react";

import './loader.css'

const Loader = () => {
    return (
        <div className="logerWrap">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader