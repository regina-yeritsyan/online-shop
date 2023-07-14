import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import {getOrderItems, getOrders} from "../store/actions/order";
import moment from "moment";


function OrderItemsModal({open, onClose, id}) {
    const orderItems = useSelector(store => store.order.orderItems);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getOrderItems(id));
        }
    }, [id]);

    return (
        <Modal
            isOpen={open}
            bodyOpenClassName="body__modal"
            overlayClassName="testOverlay"
            className="testContent"
            onRequestClose={onClose}
        >
            <div className='close_btn_block'>
                <button onClick={onClose}>X</button>
            </div>

            <div className='modal__container'>
                <h2>Order</h2>

                <div className='info__block'>
                    <p><b>Ordered</b> {moment(orderItems.createdAt).format('ll')}</p>
                    <p><b>User</b> {orderItems.order_user?.firstName} {orderItems.order_user?.lastName}</p>
                    <p><b>country </b>{orderItems.country}</p>
                    <p><b>city </b> {orderItems.city}</p>
                    <p><b>address </b> {orderItems.address}</p>
                    <p><b>postalCode </b>{orderItems.postalCode}</p>
                </div>

                <div className='orderItem__block'>
                    <div className='orderItem__item__block desc'>
                        <div className='orderItem__item'>
                            <p>N</p>
                        </div>
                        <div className='orderItem__item'>
                            <p>product</p>
                        </div>
                        <div className='orderItem__item'>
                            <p>price</p>
                        </div>
                        <div className='orderItem__item'>
                            <p>quantity</p>
                        </div>
                        <div className='orderItem__item'>
                            <p>total</p>
                        </div>
                    </div>

                    {orderItems.order_item?.map((item, index) => (
                        <div className='orderItem__item__block' key={item.id}>
                            <div className='orderItem__item'>
                                <p>{index + 1}</p>
                            </div>
                            <div className='orderItem__item'>
                                <p>{item.name}</p>
                            </div>
                            <div className='orderItem__item'>
                                <p>${item.price}</p>
                            </div>
                            <div className='orderItem__item'>
                                <p>{item.quantity}</p>
                            </div>
                            <div className='orderItem__item'>
                                <p>${item.quantity * item.price}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <h3>Total Price  ${orderItems.totalPrice}</h3>

            </div>
        </Modal>
    );
}

export default OrderItemsModal;