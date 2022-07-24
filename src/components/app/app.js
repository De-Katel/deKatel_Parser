import React from "react";
import Header from '../header/header';
import Main from "../main/main";
import { BrowserRouter } from 'react-router-dom';

const App = ()=>{
    return(
        <BrowserRouter>
     <Header/>
     <Main/>
     </BrowserRouter>
    )
}
export default App