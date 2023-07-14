import React, { useCallback, useEffect } from 'react';
import { getOrderItems } from "../store/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import _ from "lodash";

function PaymentMethod(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const orderItems = useSelector(store => store.order.orderItems);
    const status = useSelector(store => store.order.getOrderItemsRequestStatus);
    const { REACT_APP_API_URL } = process.env

    useEffect(() => {
        if (params.id) {
            dispatch(getOrderItems(params.id));
        }
    }, [params.id]);

    const handleSubmit = useCallback( async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REACT_APP_API_URL}/orders/payment`, {
                amount: orderItems.totalPrice, id: orderItems.id
            });

            window.location.href = response.data.url;
        } catch (error) {
            toast.error(`Something is wrong, the order ID does not match`)
        }
    }, [orderItems]);

    return (
        <Wrapper>

            {status === 'request'
                ? <Loading/>
                : null
            }

            {status === 'ok' && !_.isEmpty(orderItems)
                ?
                <div className='payment__block'>
                    <h3>Price ${orderItems.totalPrice}</h3>

                    <button onClick={handleSubmit}>
                        <span style={{color: '#003087', fontWeight: '900'}}>Pay</span>
                        <span style={{color: '#009cde', fontWeight: '900'}}>Pal</span>
                    </button>
                </div>
                :
                null
            }

            {status === 'fail'
                ?
                <div className='empty__block'>
                    <h2 style={{color: '#6b758c'}}>Order not found</h2>
                </div>
                : null
            }

        </Wrapper>
    );
}

export default PaymentMethod;
