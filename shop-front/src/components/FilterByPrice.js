import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import Utils from "../helpers/Utils";

function FilterByPrice(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);
    const [min, setMin] = useState(query.minPrice || '');
    const [max, setMax] = useState(query.maxPrice || '');

    const handleChangePrice = useCallback((key) => (ev) => {
        const value = ev.target.value
        if (value < 1 && value !== '') return
        if (key === 'min') {
            setMin(value);
            navigate(`?${Utils.queryStrfy({ ...query, minPrice: value })}`);
        } else {
            setMax(value);
            navigate(`?${Utils.queryStrfy({ ...query, maxPrice: value })}`);
        }
    }, [query])

    return (
        <div>
            <p className='filter__title'>Price</p>
            <div style={{textAlign: 'center'}}>
                <span>$</span>
                <input
                    className='price__filter'
                    type="number"
                    value={min}
                    onChange={ handleChangePrice('min')}
                />
                <span style={{margin: '0 15px'}}>-</span>
                <span>$</span>
                <input
                    className='price__filter'
                    type="number"
                    value={max}
                    onChange={ handleChangePrice('max')}
                />
            </div>
        </div>
    );
}

export default FilterByPrice;