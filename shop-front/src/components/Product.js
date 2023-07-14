import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../store/actions/products";
import { useParams, useNavigate } from "react-router-dom";
import { addToCartRequest } from "../store/actions/cart";
import HeartButton from "../components/HeartButton";
import AddCartBtn from "../components/AddCartBtn";
import Rating from "../components/Ratings";
import Loading from "../components/Loading";
import _ from "lodash";

function SingleProduct(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const product = useSelector(store => store.products.product);
    const products = useSelector(store => store.products.products);
    const status = useSelector(store => store.products.oneProductRequestStatus);
    const token = useSelector(store => store.users.token);
    const { REACT_APP_API_URL } = process.env

    useEffect(() => {
        dispatch(getOneProduct(params.id))
    }, [dispatch, params.id]);

    const addToCart = useCallback(() => {
        if (!token) {
            navigate('/login')
            return
        }
        dispatch(addToCartRequest(product.id))
    }, [product.id]);

    return (
        <div>

            {status === 'request'
                ? <Loading/>
                : null
            }

            {status === 'ok' && !_.isEmpty(product) ?
                <div className='single__container'>
                    <div className='images__block'>
                        <div className='single__image'>
                            <img src={REACT_APP_API_URL+'/'+product.img} alt='' />
                        </div>
                        <div className='images'
                             style={{ overflowX: products.length > 4 ? 'scroll' : 'visible' }}
                        >
                            <div className='images__wrapper'>
                                {products?.map(p => (
                                    <div
                                        className='images__item'
                                        key={p.id}
                                        onClick={() => navigate(`/product/${p.id}`)}>
                                        <img src={REACT_APP_API_URL+'/'+p.img} alt="" />
                                        <p>{p.color}</p>
                                    </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='product__details'>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <div>
                                <h2>
                                    {product.product_item.product_brand.name.toUpperCase()} {}
                                    {product.product_item.name.toUpperCase()}
                                    <p>({product.color})</p>
                                </h2>
                            </div>
                            <HeartButton product={product}/>
                        </div>
                        <Rating product={product.product_item} />
                        <hr/>
                        <p className='price'>${product.product_item.price}</p>
                        <div className='desc'>
                            <h4>Description</h4>
                            <p>{product.product_item.description}</p>
                        </div>
                        <hr style={{marginBottom: '20px'}}/>
                        <AddCartBtn onClick={addToCart}/>
                    </div>
                </div>
                :
                null
            }
            {status === 'fail'
                ?
                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>Single product is empty</h2>
                </div>
                :
                null
            }

        </div>

    )
}

export default SingleProduct;
