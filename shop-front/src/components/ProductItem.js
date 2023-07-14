import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartRequest } from "../store/actions/cart";
import AddCartBtn from "./AddCartBtn";
import HeartButton from "./HeartButton";
import Rating from "./Ratings";

function ProductItem({product}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(store => store.users.token);

    const { REACT_APP_API_URL } = process.env

    const addToCart = useCallback((id) => {

        if (!token) {
            navigate('/login')
            return
        }
        dispatch(addToCartRequest(id))
    }, []);

    return (
        <>
            <div
                className='shop__item'
            >

                <HeartButton product={product}/>

                <div
                    className='shop__img__block'
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    <img
                        src={REACT_APP_API_URL+'/'+product.img}
                        className='shop__img'
                        alt='img'
                    />
                </div>

                <h4 className='shop__item__title'>
                     {product.product_item.name}
                </h4>
                <p>({product.product_item.product_brand.name})</p>
                <Rating product={product.product_item}/>

                <p className='shop__item__price'>${product.product_item.price}</p>

                <div style={{textAlign: 'center'}}>
                    <AddCartBtn onClick={addToCart} id={product.id}/>
                </div>

            </div>
        </>
    );
}

export default ProductItem;
