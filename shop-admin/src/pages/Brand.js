import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../store/actions/brands";
import ItemModal from "../components/ItemModal";
import Wrapper from "../components/Wrapper";

function Brand(props) {
    const dispatch = useDispatch();
    const brands = useSelector(store => store.brands.brands);
    const [updateModal, setUpdateModal] = useState({open: false, brand: {}});
    const [modal, setModal] = useState(false);

    const handleDelete = useCallback((id) => {
        dispatch(deleteBrand(id))
    }, [])

    useEffect(() => {
        dispatch(getBrands())
    }, [])

    return (
        <Wrapper>
            <div className='container'>

                <button onClick={() => setModal(true)}>
                    Create
                </button>

                <ItemModal
                    open={modal}
                    model='brand'
                    onClose={() => setModal(false)}
                />

                <ItemModal
                    open={updateModal.open}
                    obj={updateModal.brand}
                    model='brand'
                    onClose={() => setUpdateModal({open: false, brand: {}})}
                />

                <div className='category__block'>
                    {brands?.map(brand => (
                        <div key={brand.id} className='category__item__block'>
                            <div className='category__item'>
                                <p>{brand.name}</p>
                            </div>

                            <button onClick={() => setUpdateModal({open: true, brand: brand})}>
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(brand.id)}
                            >
                                Delete
                            </button>

                        </div>
                    ))}
                </div>

            </div>
        </Wrapper>

    );
}

export default Brand;