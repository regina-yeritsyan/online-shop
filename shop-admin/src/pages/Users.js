import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest } from "../store/actions/users";
import EmailModal from "../components/EmailModal";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import qs from "query-string";

function Users(props) {
    const location = useLocation();

    const dispatch = useDispatch();
    const users = useSelector(store => store.users.users);
    const total_users = useSelector(store => store.users.total_users);
    const [modal, setModal] = useState({open: false, user: {}})
    const query = qs.parse(location.search);

    useEffect(() => {
        dispatch(getUsersRequest(query))
    }, [location.search])

    return (
        <Wrapper>
            <div className='container'>

                <EmailModal
                    open={modal.open}
                    user={modal.user}
                    onClose={() => setModal({open: false, product: {}})}
                />

                <div className='category__block'>
                    {users?.map(user => (
                        <div key={user.id} className='category__item__block'>
                            <div className='category__item'>
                                <p>{user.firstName} {user.lastName}</p>
                            </div>
                            <div className='category__item'>
                                <p>
                                    {user.email}
                                </p>
                            </div>

                            <i className="fa fa-solid fa-envelope"
                               style={{color: '#6b758c', cursor: 'pointer'}}
                               onClick={() => setModal({open: true, user})}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='pagination__block'>
                <Pagination total={total_users}/>
            </div>
        </Wrapper>

    );
}

export default Users;