import React, {useCallback, useLayoutEffect, useState} from 'react';
import {toggleFavorites} from "../store/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function HeartButton({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false)
    const token = useSelector(store => store.users.token);

    useLayoutEffect(()=>{
        setIsFavorite(product.favorite)
    },[product])

    const handleToggle = useCallback((productId) => {
        if (!token) {
            navigate('/login')
            return
        }

        dispatch(toggleFavorites(productId,  (err, data) => {
            if (err) {
                toast.error(` ${err.errors.favorites}`)
                return
            }
            setIsFavorite(!isFavorite)
        }));

    }, [isFavorite]);

    return (
        <div className='heart__block'>
            <button onClick={() => handleToggle(product.id)}>
                {isFavorite
                    ?
                    <i className="fas fa-heart"/>
                    :
                    <i className="far fa-heart"/>
                }
            </button>
        </div>
    );
}

export default HeartButton;