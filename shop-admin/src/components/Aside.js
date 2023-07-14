import React from 'react';
import { NavLink } from "react-router-dom";

function Aside(props) {
    return (
        <div className="aside">
            <ul className="nav">
                <li className="nav__list"><NavLink className="nav__link" to='/product'>Products</NavLink></li>
                <li className="nav__list"><NavLink className="nav__link" to='/category'>Categories</NavLink></li>
                <li className="nav__list"><NavLink className="nav__link" to='/brand'>Brands</NavLink></li>
                <li className="nav__list"><NavLink className="nav__link" to='/user'>Users</NavLink></li>
                <li className="nav__list"><NavLink className="nav__link" to='/order'>Order</NavLink></li>
            </ul>
        </div>
    );
}

export default Aside;