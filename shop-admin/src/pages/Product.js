import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProductsList } from "../store/actions/products";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import { useLocation, useNavigate } from "react-router-dom";
import ModalProduct from "../components/ModalProduct";
import Pagination from "../components/Pagination";
import Wrapper from "../components/Wrapper";
import qs from "query-string";

function Product(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);
    const dispatch = useDispatch();
    const [updateModal, setUpdateModal] = useState({open: false, product: {}});
    const total_product = useSelector(store => store.products.total_product);
    const productsList = useSelector(store => store.products.productsList);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(getProductsList(query));
    }, [location.search]);

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id));
    }, [])

    return (
        <Wrapper>
            <div className='container'>
                <button onClick={() => setModal(true)}>
                    Create
                </button>

                <ModalProduct
                    open={modal}
                    onClose={() => setModal(false)}
                />

                <ModalUpdateProduct
                    open={updateModal.open}
                    product={updateModal.product}
                    onClose={() => setUpdateModal({open: false, product: {}})}
                />

                <div className='product__block'>
                    {productsList.map(product => (
                        <div className='product_item__block' key={product.id}>
                            <div className='product_item'>
                                <p>
                                    { product.name}
                                </p>
                                <p> {product.price}դր․ </p>
                            </div>

                            <div className='product_item'>
                                <p>
                                    {product.product_brand.name }
                                </p>
                            </div>
                            <div className='product_item'>
                                <p>
                                    {product.product_category.name }
                                </p>
                            </div>

                            <button
                                className='product_item'
                                onClick={() => navigate(`/product/${product.id}`)}>
                                Options
                            </button>
                            <button
                                className='product_item'
                                onClick={() => setUpdateModal({open: true, product})}>
                                Edit
                            </button>
                            <button
                                className='product_item'
                                onClick={() => handleDelete(product.id)}>Delete
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            <div className='pagination__block'>
                <Pagination total={total_product}/>
            </div>
        </Wrapper>

    );
}

export default Product;

// <div key={product.id} style={{display: "flex"}}>
//     <p>{product.name}</p>
//     <button
//         onClick={() => navigate(`/product/${product.id}`)}>
//         Options
//     </button>
//     <button onClick={() => setUpdateModal({open: true, product})}>
//         Edit
//     </button>
//     <button
//         onClick={() => handleDelete(product.id)}>Delete
{/*    </button>*/}

{/*</div>*/}

