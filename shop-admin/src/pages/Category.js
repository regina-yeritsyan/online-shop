import React, { useCallback, useEffect, useState } from 'react';
import { deleteCategory, getCategories } from "../store/actions/categories";
import { useDispatch, useSelector } from "react-redux";
import ItemModal from "../components/ItemModal";
import Wrapper from "../components/Wrapper";

function Category(props) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categories.categories);
    const [updateModal, setUpdateModal] = useState({open: false, category: {}});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(getCategories())
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(deleteCategory(id));
    }, [])

    return (
        <Wrapper>
            <div className='container'>
                <button onClick={() => setModal(true)}>
                    Create
                </button>

                <ItemModal
                    open={modal}
                    model='category'
                    onClose={() => setModal(false)}
                />

                <ItemModal
                    open={updateModal.open}
                    obj={updateModal.category}
                    model='category'
                    onClose={() => setUpdateModal({open: false, category: {}})}

                />

                <div className='category__block'>
                    {categories?.map(c => (
                        <div key={c.id} className='category__item__block'>
                            <div className='category__item'>
                                <p>{c.name}</p>
                            </div>

                            <button onClick={() => setUpdateModal({open: true, category: c})}>
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
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

export default Category;
