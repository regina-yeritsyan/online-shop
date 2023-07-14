import React, { useCallback, useEffect, useState } from 'react';
import { getCategories } from "../store/actions/categories";
import { createProduct } from "../store/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../store/actions/brands";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import Input from "./Input";

function ModalProduct({open, onClose}) {
    const dispatch = useDispatch();
    const status = useSelector(store => store.products.createProductRequestStatus);
    const categories = useSelector(store => store.categories.categories);
    const brands = useSelector(store => store.brands.brands);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        desc: '',
        name: '',
        color: '',
        price: '',
        qty: '',
        categoryId: 0,
        brandId: 0,
        img: null
    });

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getBrands())
    }, [])

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({...formData, [key]: ev.target.value})
    }, [formData, errors]);

    const handleFileChange = useCallback((ev) => {
        const [file] = ev.target.files;
        const acceptableMimeTypes = ['image/jpeg','image/png','image/jpg']
        if (!file) {
            return;
        }

        if (!acceptableMimeTypes.includes(file.type)) {
            ev.target.value = '';
            return;
        }

        file._preview = URL.createObjectURL(file);
        setFormData({...formData, img: file});
        ev.target.value = '';
    }, [formData]);


    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();

        dispatch(createProduct(formData, (err, data) => {
            if (err) {
                setErrors(err.errors || {});
            } else {
                setFormData({
                    desc: '',
                    name: '',
                    color: '',
                    price: '',
                    qty: 1,
                    categoryId: 0,
                    brandId: 0,
                    img: null
                });
                onClose();
                toast.success(`The product is created`);
            }
        }));

    }, [formData, status]);

    const handleModalClose = () => {
        // setFormData({})
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
                    <Input
                        value={formData.name}
                        onChange={handleChange('name')}
                        placeholder='product'
                        error={errors.name}
                        required
                        name="name"
                    />
                    <Input
                        value={formData.color}
                        onChange={handleChange('color')}
                        placeholder='product color'
                        error={errors.color}
                        required
                        name="color"
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
                    <Input
                        value={formData.qty}
                        onChange={handleChange('qty')}
                        type="number"
                        placeholder='product quantity'
                        error={errors.qty}
                        required
                        name="qty"
                        min={1}
                    />

                    <select
                        style={{marginRight: '40px'}}
                        value={formData.categoryId}
                        onChange={handleChange('categoryId')}
                        required
                    >
                        <option value="">Select...</option>
                        {categories?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={formData.brandId}
                        onChange={handleChange('brandId')}
                        required
                    >
                        <option value="">Select...</option>
                        {brands?.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>

                    <div className={`wrap-input100 validate-input`}>
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder='product description'
                            value={formData.desc}
                            onChange={handleChange('desc')}
                            required
                        />
                        {errors.desc ? <span className="error">{errors.desc}</span> : null}
                    </div>

                    {formData.img ? (
                        <img src={formData.img._preview} width={128} alt="" />
                    ) : null}

                    <input type="file"
                           accept="image/jpeg,image/png,image/jpg"
                           onChange={handleFileChange}
                    />

                    <div className='btn'>
                        <button>Create</button>
                    </div>
                </form>
            </div>

        </Modal>
    );
}

export default ModalProduct;
