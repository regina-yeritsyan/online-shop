import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import WrapperLogOut from "../components/WrapperLogOut";
import Loading from "../components/Loading";
import Input from "../components/Input";
import { toast } from "react-toastify";
import qs from 'query-string';
import {
    confirmCodeRequest,
    recoverPasswordRequest
} from "../store/actions/users";

function ResetPassword(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);
    const status = useSelector(store => store.users.confirmCodeRequestStatus);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        dispatch(confirmCodeRequest(query))
    }, []);

    const handleTogglePassword = useCallback(() => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }, []);

    const handleSubmit = useCallback( (e) => {
        e.preventDefault();

        dispatch(recoverPasswordRequest(password, query, (err, data) => {
            if (err) {
                toast.error('Data does not match, please refresh the page')
            } else {
                toast.success('Your password has been changed')
            }
            // navigate(`/login`);
        }))
    }, [password, query]);

    return (
        <WrapperLogOut>
            <div className='recover'>
                <div  className='recover__block'>
                    {status === 'request'
                        ? <Loading/>
                        : null
                    }

                    {status === 'ok' ?
                        <>
                            <h2>Choose a new password</h2>
                            <p>
                                Create a new password with at least 6 characters.
                                A strong password is a combination of latters, numbers, and punctuation.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password minimum 6 characters"
                                    name="code"
                                    pattern=".{6,}"
                                    required
                                    showToggle
                                    onToggle={handleTogglePassword}
                                />

                                <div className='btn'>
                                    <button type="submit">Continue</button>
                                </div>
                            </form>
                        </>
                        :
                        null
                    }

                    {status === 'fail' ?
                        navigate(`/`)
                        :
                        null
                    }

                </div>
            </div>
        </WrapperLogOut>
    );
}

export default ResetPassword;
