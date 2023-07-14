import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Aside from "./Aside";

function Wrapper(props) {
    const token = useSelector(store => store.users.token);

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return (
        <div>
            <Header/>
            <div className='wrapper__container'>
                <Aside/>
                {props.children}
            </div>
            <Footer/>
        </div>
    );
}

export default Wrapper;
