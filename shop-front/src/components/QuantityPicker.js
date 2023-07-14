import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeCartItemQty } from "../store/actions/cart";

function QuantityPicker({ min = 1, qty, productId, productItemQty, handleQty }) {
    const [count, setCount] = useState(productItemQty || 1);
    const dispatch = useDispatch();

    useEffect(() => {
        handleQty(count)
    }, [count])

    const handleCount = useCallback((c) => {
        if (c < min) {
            setCount(min);
        } else if (c > qty) {
            setCount(qty);
        } else {
            setCount(c);
            dispatch(changeCartItemQty(productId, c));
        }
    }, [count]);

    return (
        <div>
            <button onClick={() => handleCount(count - 1)} className='qty_picker'>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <span style={{display:'inline-block', width: '20px', textAlign: 'center'}}>{count}</span>
            <button onClick={() => handleCount(count + 1)} className='qty_picker'>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default QuantityPicker;
