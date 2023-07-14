import React, { useCallback, useEffect, useState } from 'react';
import { getCategories } from "../store/actions/categories";
import { updateProduct } from "../store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../store/actions/brands";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import Input from "./Input";

function ModalUpdateProduct({open, onClose, product}) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categories.categories);
    const brands = useSelector(store => store.brands.brands);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        price: '',
        categoryId: 1,
        brandId: 1,
    });

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
    }, [])

    useEffect(() => {
        setFormData({...formData, ...product});
    }, [product])


    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({...formData, [key]: ev.target.value})
    }, [formData, errors]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();

        dispatch(updateProduct(formData, product.id, (err, data) => {
            if (err) {
                setErrors(err.errors || {});
            } else {
                setErrors({})
                onClose();
                toast.success(`The product is updated`)
            }
        }));
    }, [formData]);

    const handleModalClose = () => {
        setErrors({});
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
                    <select
                        style={{marginRight: '40px'}}
                        value={formData.categoryId}
                        onChange={handleChange('categoryId')}
                    >
                        {categories?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={formData.brandId}
                        onChange={handleChange('brandId')}
                    >
                        {brands?.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    <Input
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder='product name'
                        error={errors.name}
                        required
                        name="name"
                    />
                    <Input
                        value={formData.price}
                        onChange={handleChange('price')}
                        type="number"
                        placeholder='product price'
                        error={errors.price}
                        required
                        name="price"
                        min='1'

                    />

                    <div className={`wrap-input100 validate-input`}>
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder='product description'
                            value={formData.description}
                            onChange={handleChange('description')}
                            required
                        />
                        {errors.description ? <span className="error">{errors.description}</span> : null}
                    </div>

                    <div className='btn'>
                        <button>Update</button>
                    </div>

                </form>
            </div>

        </Modal>
    );
}

export default ModalUpdateProduct;