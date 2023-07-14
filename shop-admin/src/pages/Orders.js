import React, { useCallback, useEffect, useState } from 'react';
import { changeOrderStatus, getOrders } from "../store/actions/orders";
import OrderItemsModal from "../components/OrderItemsModal";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import qs from 'query-string';
import moment from "moment";

function Orders(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const status = useSelector(store => store.orders.changeOrderRequestStatus)
    const total_orders = useSelector(store => store.orders.total_orders);
    const orders = useSelector(store => store.orders.orders);
    const [modal, setModal] = useState({open: false, id: ''});

    const query = qs.parse(location.search);

    useEffect(() => {
        // const query = qs.parse(location.search);
        dispatch(getOrders(query));
    }, [location.search, status]);

    const handleClick = useCallback((id) => {
        dispatch(changeOrderStatus(id));
    }, [])

    return (
        <Wrapper>
            <OrderItemsModal
                open={modal.open}
                id={modal.id}
                onClose={() => setModal({open: false, id: ''})}
            />

            <div className='order__block'>
                    {orders?.map((order, index) => (
                        <div className='order__item__block'>
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
                                    className='order__item__btn'
                                    onClick={() => setModal({open: true, id: order.id})}
                                >
                                    Details
                                </button>
                            </div>

                            {order.status === 'pending'
                                ?
                                <div className='order__item'>
                                    <button
                                        className='order__item__btn'
                                        style={{padding: '11px 12px'}}
                                        onClick={() => handleClick(order.id)}
                                    >
                                        Complete The Order
                                    </button>
                                </div>
                                :
                                <div className='order__item'>
                                    <p>
                                        Order Completed
                                    </p>
                                </div>
                            }
                        </div>
                    ))
                    }
                </div>

            <div className='pagination__block'>
                <Pagination total={total_orders}/>
            </div>

        </Wrapper>
    );
}

export default Orders;