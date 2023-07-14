import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getColors } from "../store/actions/categories";
import { getProductsList } from "../store/actions/products";
import FilterByPrice from "../components/FilterByPrice";
import { getBrands } from "../store/actions/brands";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Filters from "../components/Filters";
import Loading from "../components/Loading";
import Modal from 'react-modal';
import qs from 'query-string';
import _ from 'lodash'


function Home(props) {
    const dispatch = useDispatch();
    const brands = useSelector(store => store.brands.brands);
    const categories = useSelector(store => store.categories.categories);
    const colors = useSelector(store => store.categories.colors);
    const productsList = useSelector(store => store.products.productsList);
    const total_pages = useSelector(store => store.products.total_pages);
    const status = useSelector(store => store.products.productsListRequestStatus);
    const location = useLocation();
    const token = useSelector(store => store.users.token);
    const [modal, setModal] = useState(false);
    const [showFilters, setShowFilters] = useState(window.innerWidth > 998);

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getColors())

        const handleResize = () => {
            setShowFilters(window.innerWidth > 998);
            if (window.innerWidth > 998) setModal(false);

        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [token]);

    useEffect(() => {
        const query = qs.parse(location.search);
        dispatch(getProductsList(query));
    }, [location.search, token])

    return (
        <div>

            <div className='shop__container'>

                        {showFilters ? (
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <Filters title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        ) : (
                            <div className='filters__btn'>
                                <button onClick={() => setModal(true)}>
                                    <span className="material-symbols-outlined">tune</span>
                                </button>
                            </div>
                        )}

                        <Modal
                            isOpen={modal}
                            onRequestClose={() => setModal(false)}
                            bodyOpenClassName="body__modal"
                            overlayClassName="filtersOverlay"
                            className="filtersContent"
                        >
                            <div className='filters__block'>
                                <h4>FILTERS</h4>
                                <FilterByPrice/>
                                <hr/>
                                <div className = 'filters'>
                                    <Filters title='Categories' data={categories} prefix='category'/>
                                    <hr/>
                                    <Filters title='Brands' data={brands} prefix='brand'/>
                                    <hr/>
                                    <Filters title='Colors' data={colors} prefix='color'/>
                                    <hr/>
                                </div>
                            </div>
                        </Modal>

                        <div className='shop__item__block'>

                            {status === 'request'
                                ?
                                <Loading/>
                                : null
                            }

                            {status === 'ok' && _.isEmpty(productsList)
                                ?
                                <div className='empty__block'>
                                    <h2 style={{color: '#6b758c'}}>By the following criteria nothing was found</h2>
                                </div>
                                : null
                            }

                            {productsList?.map(product => (
                                    <ProductItem product = {product} key={product.id}/>
                                )
                            )}

                            <div className='pagination__block'>
                                <Pagination total={total_pages}/>
                            </div>

                        </div>

                    </div>

        </div>

    );
}

export default Home;


