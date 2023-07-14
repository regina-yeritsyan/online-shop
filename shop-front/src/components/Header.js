import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartRequest } from "../store/actions/cart";
import { userLogOut } from "../store/actions/users";
import InputSearch from "./InputSearch";
import Account from "../helpers/Account";

function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(store => store.users.token);
    const [show, setShow] = useState(false)
    const cart = useSelector(store => store.cart.cart);
    const location = window.location.pathname === "/shop"

    useEffect(() => {
        if (token) {
            dispatch(getCartRequest())
        }
    }, [])

    const handleLogOut = useCallback(() => {
        Account.removeToken();
        dispatch(userLogOut())
    }, [token]);

    return (
        <div style={{padding: '40px 0', margin: '20px'}}>
            <div className='header'>
                <div className='container'>
                    <div
                        onClick={() => navigate(`/`)}
                        className='logo'>
                        LOGO
                    </div>

                    {location
                        ? <InputSearch/>
                        : null
                    }

                    <ul className='ul'>

                        {!token
                            ?
                            <>
                                <li onClick={() => navigate(`/register`)}>
                                    <p>REGISTER</p>
                                </li>
                                <li onClick={() => navigate(`/login`)}>
                                    <p>LOGIN</p>
                                </li>
                            </>
                            :
                            <>
                                <div onMouseOver={() => setShow(true)}
                                     onMouseLeave={() => setShow(false)}>
                                    <li><i className="fas fa-user"></i></li>

                                    {show ?
                                        <ul style={{position: "absolute"}}>
                                            <li style={{marginTop: '4px'}} onClick={() => navigate(`/profile`)}>Profile</li>
                                            <li style={{marginTop: '4px'}} onClick={handleLogOut}>LogOut</li>
                                        </ul>
                                        : null}

                                </div>

                                <li
                                    onClick={() => navigate(`/orders`)}
                                >
                                    <i className="fa-solid fa-cube"></i>
                                </li>
                                <li
                                    onClick={() => navigate(`/favorites`)}
                                >
                                    <i className="fas fa-heart"></i>
                                </li>

                                <li
                                    onClick={() => navigate(`/cart`)}
                                >
                                    <i className="fas fa-shopping-cart"></i>

                                        <span
                                            style={{
                                                position: 'absolute',
                                                marginTop: '-10px',
                                                marginLeft: '-2px',
                                                background: '#efd6d6',
                                                width: '20px',
                                                height: '20px',
                                                textAlign: "center",
                                                lineHeight: '20px',
                                                borderRadius: '50%'
                                            }}
                                        >
                                {cart.totalQuantity}
                                </span>

                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;