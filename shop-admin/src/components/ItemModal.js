import React, {useCallback, useEffect, useState} from 'react';
import { createCategory, updateCategory } from "../store/actions/categories";
import { createBrand, updateBrand } from "../store/actions/brands";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';

function ItemModal({open, onClose, model, obj}) {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(obj?.name || '');
    }, [obj])

    const handleSubmit = useCallback(() => {
        if (model === 'brand') {
            if (obj) dispatch(updateBrand(value, obj.id));
            else dispatch(createBrand(value));
        } else {
            if (obj) dispatch(updateCategory(value, obj.id))
            else dispatch(createCategory(value));
        }

        setValue('');
        onClose();

    }, [value]);

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
                <form onSubmit={handleSubmit}>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                    />

                    <div className='btn'>
                        <button>{obj? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>

        </Modal>
    );
}

export default ItemModal;
