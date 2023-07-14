import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../store/actions/order";
import { getCartRequest } from "../store/actions/cart";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Modal from 'react-modal';

function ModalAddress({open, onClose}) {
    const dispatch = useDispatch();
    const shippingAddress = useSelector(store => store.order.shippingAddress);
    const order = useSelector(store => store.order.order);
    const cartList = useSelector(store => store.cart.cartList);
    const cart = useSelector(store => store.cart.cart);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        paymentMethod: 'cash',
        country: '',
        city: '',
        address: '',
        postalCode: '',
    });

    useEffect(() => {
        dispatch(getCartRequest())
    }, [open])

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData, errors]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();

        dispatch(createOrder(formData, cart.totalPrice, cartList , (err, data) => {
            if (err) {
                // toast.error(`something went wrong, please try again`)
                setErrors(err?.errors);
                return
            }

            if (formData.paymentMethod === 'paypal') {
                navigate(`/order/${data.order.id}`)
            }

            onClose();

        }));
    }, [formData]);

    const handleModalClose = () => {
        setErrors({});
        setFormData({
            paymentMethod: 'cash',
            country: '',
            city: '',
            address: '',
            postalCode: '',
        })
        onClose();
    };

    return (
        <Modal
            isOpen={open}
            bodyOpenClassName="body__modal"
            overlayClassName="testOverlay"
            className="testContent"
            onRequestClose={handleModalClose}
        >

            <div className='close_btn_block'>
                <button onClick={onClose}>X</button>
            </div>

            <div className='modal__container'>
                <form onSubmit={handleSubmit}>
                    <Input
                        value={formData.country}
                        onChange={handleChange('country')}
                        placeholder="country"
                        type='text'
                        error={errors.country}
                        required
                    />
                    <Input
                        value={formData.city}
                        onChange={handleChange('city')}
                        error={errors.city}
                        type='text'
                        placeholder="city"
                        required
                    />
                    <Input
                        value={formData.address}
                        onChange={handleChange('address')}
                        error={errors.address}
                        type='text'
                        placeholder="address"
                        required
                    />
                    <Input
                        value={formData.postalCode}
                        onChange={handleChange('postalCode')}
                        error={errors.postalCode}
                        type='text'
                        placeholder="postal code"
                        required
                    />

                    <div className='label'>
                        <label>
                            <input
                                type="radio"
                                value="cash"
                                checked={formData.paymentMethod === 'cash'}
                                onChange={handleChange('paymentMethod')}
                            />
                            Pay with cash
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="paypal"
                                checked={formData.paymentMethod === 'paypal'}
                                onChange={handleChange('paymentMethod')}
                            />
                            Pay with card
                        </label>
                    </div>

                    <div className='btn'>
                        <button>
                            To order
                        </button>
                    </div>

                </form>
            </div>

        </Modal>
    );
}

export default ModalAddress;