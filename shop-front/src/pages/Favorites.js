import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getWishlist } from "../store/actions/wishlist";
import ProductItem from "../components/ProductItem";
import Wrapper from "../components/Wrapper";
import Loading from "../components/Loading";
import _ from "lodash";

function Favorites(props) {
    const dispatch = useDispatch();
    const wishlist = useSelector(store => store.wishlist.wishlist)
    const status = useSelector(store => store.wishlist.getWishlistRequestStatus)

    useEffect(() => {
        dispatch(getWishlist())
    }, [])

    return (
        <Wrapper>

            {status === 'request'
                ?
                <Loading/>
                : null
            }

            {status === 'ok' && _.isEmpty(wishlist)
                ?
                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>Your wish list is empty</h2>
                </div>
                : null
            }

            {status === 'ok' && !_.isEmpty(wishlist)
                ?
                <div className='shop__container'>
                    <div className='shop__item__block favorite' style={{width: '100%'}}>

                        {wishlist?.map(product => (
                                <ProductItem product = {product} key={product.id}/>
                            )
                        )}

                    </div>
                </div>
                : null
            }

            {status === 'fail'
                ?
                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>ERROR</h2>
                </div>
                : null
            }

        </Wrapper>

    );
}

export default Favorites;
