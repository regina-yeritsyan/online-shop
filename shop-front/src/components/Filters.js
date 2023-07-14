import React, {useCallback} from 'react';
import qs from 'query-string';
import {useLocation, useNavigate} from "react-router-dom";
import Utils from "../helpers/Utils";

function Filters({title, data, prefix}) {

    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search)

    const handleFilterChange = useCallback((id, prefix) => {

        if (query[prefix] === id.toString()) {
            query[prefix] = null
        } else {
            query[prefix] = id
        }

        navigate(`?${Utils.queryStrfy({...query})}`)

    }, [query])

    const colorBox = (color) => {
        return {
            backgroundColor: color,
        };
    }

    return (
        <div>
            <p className='filter__title'>{title}</p>

            {prefix === 'color'
                ?
                <ul style={{display: "flex", flexWrap: 'wrap'}}>
                    {data.map(datum => (
                        <li
                            className={`color__desc ${query[prefix] === (datum.color.toString()) ? 'active' : ''}`}
                            key={datum.color}
                            onClick={() => handleFilterChange(datum.color, prefix)}
                            style={colorBox(datum.color)}
                        >
                        </li>
                    ))}
                </ul>
                :
                <ul>
                    {data.map(datum => (
                        <li
                            className={`filter__desc ${query[prefix] === datum.id.toString() ? 'active' : ''}`}
                            key={datum.id}
                            onClick={() => handleFilterChange(datum.id, prefix)}
                        >
                            {datum.name}
                        </li>
                    ))}
                </ul>
            }

        </div>
    );
}

export default Filters;