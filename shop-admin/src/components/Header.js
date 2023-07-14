import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/actions/users";
import { useNavigate } from "react-router-dom";
import Account from "../helpers/Account";

function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(store => store.users.token);
    const [show, setShow] = useState(false)

    const handleLogOut = useCallback(() => {
        Account.removeToken();
        dispatch(userLogOut())
    }, [token]);

    return (
        <div>
            <div className='header'>
                <div className='header__container'>
                    <div
                        onClick={() => navigate(`/`)}
                        className='logo'>
                        LOGO
                    </div>
                   <div>
                       <h2>Admin Page</h2>
                   </div>
                    <ul className='ul'>

                        {!token
                            ?
                            <>
                                <li onClick={() => navigate(`/login`)}>
                                    LOGIN
                                </li>
                            </>
                           :
                            <div onMouseOver={() => setShow(true)}
                                onMouseLeave={() => setShow(false)}>
                                <li><i className="fas fa-user"></i> </li>
                                {show ?
                                    <ul style={{position: "absolute"}}>
                                        <li style={{marginTop: '4px'}} onClick={handleLogOut}>LogOut</li>
                                    </ul>
                                    : null}
                            </div>
                        }

                    </ul>
                </div>
            </div>
            <div style={{marginBottom: '100px'}}></div>
        </div>
    );
}

export default Header;