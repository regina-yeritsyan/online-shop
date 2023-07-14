import React, { useEffect, useState } from 'react';
import Wrapper from "../components/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../store/actions/order";
import OrderItemsModal from "../components/OrderItemsModal";
import ProfileInfo from "../components/ProfileInfo";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import moment from "moment";
import qs from "query-string";
import axios from "axios";
import _ from "lodash";

function Order(props) {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.order.orders);
    const total_orders = useSelector(store => store.order.total_orders);
    const status = useSelector(store => store.order.getUserOrdersRequestStatus);
    const [modal, setModal] = useState({open: false, id: ''});
    const { REACT_APP_API_URL } = process.env
    const location = useLocation();
    const query = qs.parse(location.search);

    useEffect(() => {
        if (query.paymentId !== undefined && query.PayerID !== undefined) {
            (async () => {
                try {
                    const response = await axios.get(`${REACT_APP_API_URL}/orders/execute`, {
                        params: {query}
                    });
                    // dispatch(getUserOrders())
                    // window.location.href = response.data.url;
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [location.search]);

    useEffect(() => {
        // dispatch(getUserInfoRequest())
        // const query = qs.parse(location.search);
        dispatch(getUserOrders(query))
    }, [location.search]);

    return (
        <Wrapper>
            <div className='profile__container'>
                <ProfileInfo/>

                {status === 'request'
                    ? <Loading/>
                    : null
                }

                {status === 'ok' && !_.isEmpty(orders)
                    ?
                    <div className='order'>
                        <div className='order__block'>

                            <OrderItemsModal
                                open={modal.open}
                                id={modal.id}
                                onClose={() => setModal({open: false, id: ''})}
                            />

                            {orders?.map((order, index) => (
                                <div
                                    className='order__item__block'
                                    style={{background: order.paymentStatus? '#d1e7dd' : '#f8d7da'}}
                                >
                                    <div className='order__item'>
                                        {(index) + ((query.page - 1) * 10 + 1)}
                                    </div>
                                    <div className='order__item'>
                                        {moment(order.createdAt).format('ll')}
                                    </div>
                                    <div className='order__item'>
                                        {order.status}
                                    </div>
                                    <div className='order__item'>
                                        {order.paymentStatus? 'paid' : 'not paid'}
                                    </div>
                                    <div className='order__item'>
                                        {order.totalPrice}$
                                    </div>
                                    <div className='order__item'>
                                        <button
                                            onClick={() => setModal({open: true, id: order.id})}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))
                            }

                        </div>
                    </div>
                    : null
                }

                {status === 'ok' && _.isEmpty(orders)
                    ?
                    <div className='empty__block'>
                        <h2 style={{color: '#6b758c'}}>Your Orders is empty</h2>
                    </div>
                    : null
                }
            </div>

            <div className='pagination__block' style={{marginBottom: '30px'}}>
                <Pagination total={total_orders}/>
            </div>

        </Wrapper>
    );
}

export default Order;
