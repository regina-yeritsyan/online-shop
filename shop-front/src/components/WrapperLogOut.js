import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function WrapperLogOut(props) {

    const token = useSelector(store => store.users.token);
    if (token) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    );
}

export default WrapperLogOut;
