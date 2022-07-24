import React from "react";

import './messageNewVersion.css'
import spaceDreams from '../../images/Space_Dreams.svg'

const MessageNewVersion = () => {
    return (
<div className="messageNewVersionWrap">
        <div className="emptyMessage">
            Данный функционал будет реализован в следующей версии
       
        </div>
     <img src={spaceDreams} />
     </div>
    )
}

export default MessageNewVersion