import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createProductRating } from "../store/actions/products";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

const Rating = ({product}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(product.rating);
    const [hoverValue,setHoverValue]=useState(undefined);
    const token = useSelector(store => store.users.token);
    const navigate = useNavigate();

    const handleClick = useCallback((value) => {
        if (!token) {
            navigate('/login')
            return
        }
        setValue(value)
        dispatch(createProductRating(product.id, value));
    }, [value])

    return (
        <div className='shop__item__rating'>

            {[...Array(5)].map((star, i) => {
                return (
                    <div key={_.uniqueId()}>
                        <i
                            onClick={() => handleClick(i + 1)}
                            onMouseOver={() => setHoverValue(i +1 )}
                            onMouseLeave={() => setHoverValue(undefined)}
                            style={{
                                color: '#607d8ba6',
                                cursor:'pointer',
                                fontSize: '18px',
                                padding: '2px'
                            }}
                            className={
                                (hoverValue || value) >= i + 1
                                    ? 'fas fa-star'
                                    : (hoverValue || value) >= i + 0.5
                                        ? 'fas fa-star-half-alt'
                                        : 'far fa-star'
                            }></i>
                    </div>
                );
            })}

            <span>({product.numRating})</span>

        </div>
    );
}

export default Rating;
