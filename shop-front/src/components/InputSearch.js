import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Utils from "../helpers/Utils";
import qs from 'query-string';

function InputSearch(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);
    const [search, setSearch] = useState(query.search || "");

    const handleChange = useCallback((ev) => {
        setSearch(ev.target.value);
        navigate(`?${Utils.queryStrfy({ ...query, search: ev.target.value })}`);
    }, [query]);

    return (
        <div className='search__block' >
            <input
                type="text"
                placeholder='Search...'
                value={search}
                onChange={handleChange}
            />
        </div>
    );
}





export default InputSearch;