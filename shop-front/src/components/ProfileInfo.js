import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest } from "../store/actions/users";
import { NavLink } from "react-router-dom";
import moment from "moment";

function ProfileInfo(props) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.profile);

    useEffect(() => {
        dispatch(getUserInfoRequest())
    }, []);

    return (
                <div className='user__info'>
                    <div className='icon__block'>
                        <i className="fas fa-user"></i>
                    </div>

                    <div className= 'info__block'>
                        <h4 style={{ wordWrap: 'break-word' }}>{user.firstName} {user.lastName}</h4>
                        <h4 style={{ wordWrap: 'break-word' }}>{user.email}</h4>
                        <p>Joined {moment(user.createdAt).format('ll')}</p>
                    </div>

                    <div>
                        <ul>
                            <li className="nav__list"><NavLink className="nav__link" to='/profile'>Personal Info</NavLink></li>
                            <li className="nav__list"><NavLink className="nav__link" to='/orders'>Orders</NavLink></li>
                        </ul>
                    </div>
                </div>
    );
}

export default ProfileInfo;
