import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { emailActivationRequest } from "../store/actions/users";
import qs from 'query-string';

function ActivationEmail(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activationRequestStatus = useSelector(store => store.users.activationRequestStatus);
    const location = useLocation();
    const query = qs.parse(location.search)

    useEffect(() => {
        dispatch(emailActivationRequest(query))
    }, []);

    return (
        <div className= 'activation__container'>

            {activationRequestStatus === 'request' ?
                <div style={{textAlign: 'center'}}>
                    <h1
                        style={{padding: '50px 0'}}>

                        Loading
                    </h1>

                </div>
                :
                null
            }

            {activationRequestStatus === 'ok'
                ?
                <div className='activation__block'>
                    <h1
                    style={{margin: '0 0 50px'}}>
                        Congratulations, you are activated
                    </h1>
                    <h2>
                        You can visit our online <span
                        style={{cursor: "pointer", color: 'blue'}}
                        onClick={() => navigate(`/login`)}>store
                    </span>, we wish you a pleasant shopping
                    </h2>
                </div>
                :
                null
            }

            {activationRequestStatus === 'fail' ?
                <div style={{textAlign: 'center',
                    padding: '150px 15px',
                    width: '100%',
                    maxWidth: '480px',
                    margin: '0 auto',
                }}>
                    <h2>
                        Wrong request, please check the information you sent
                    </h2>
                </div>
                :
                null
            }
        </div>
    );
}

export default ActivationEmail;
