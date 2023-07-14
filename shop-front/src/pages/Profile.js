import React, {useCallback, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfoRequest, updateUserPasswordRequest} from "../store/actions/users";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {getUserOrders} from "../store/actions/order";
import qs from "query-string";
import ProfileInfo from "../components/ProfileInfo";



import {registrationRequest, updateUserInfoRequest} from "../store/actions/users";
import Input from "../components/Input";
import {toast} from "react-toastify";






function Profile(props) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.users.profile);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });
    const [password, setPassword] = useState({
        password: '',
        confirm: '',
        oldPassword: '',
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false,
        oldPassword: false,
    });

    useEffect(() => {
        dispatch(getUserInfoRequest())
    }, []);

    useEffect(() => {
        setFormData({...formData, firstName: user.firstName, lastName: user.lastName, });
    }, [dispatch,user])

    const handleTogglePassword = useCallback((key) => () => {
        setShowPassword((prevShowPassword) => ({
            ...prevShowPassword,
            [key]: !prevShowPassword[key],
        }));
    }, []);

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData]);

    const handlePassword = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setPassword({ ...password, [key]: ev.target.value })
    }, [password]);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
            dispatch(updateUserInfoRequest(formData,  (err, data) => {
                if (err) setErrors(err.errors);
            }));
    }, [formData]);

    const handleSubmitPassword = useCallback(async (ev) => {
        ev.preventDefault();
        if (password.password !== password.confirm) {
            toast.error(`password and confirm no equal`)
        } else {
            dispatch(updateUserPasswordRequest(password,  (err, data) => {
                if (err) setErrors(err?.errors);
                else {
                    setPassword({
                        password: '',
                        confirm: '',
                        oldPassword: '',
                    })
                }
            }));
        }
    }, [password]);

    return (
        <Wrapper>
            <div className='profile__container'>
                <ProfileInfo/>

                <div className='profile__block'>
                    <form onSubmit={handleSubmit}>
                        <Input
                            value={formData.firstName}
                            onChange={handleChange('firstName')}
                            placeholder="First Name"
                            // error={errors.firstName}
                            className='profile__input'
                        />
                        <Input
                            value={formData.lastName}
                            onChange={handleChange('lastName')}
                            // error={errors.lastName}
                            placeholder="Last Name"
                            className='profile__input'
                        />
                        <div>
                            <button>Update Data</button>
                        </div>
                    </form>

                    <form onSubmit={handleSubmitPassword} style={{marginTop: '35px'}}>
                        <Input
                            type={showPassword.oldPassword ? 'text' : 'password'}
                            value={password.oldPassword}
                            onChange={handlePassword('oldPassword')}
                            // error={errors.oldPassword}
                            placeholder="old password"
                            className='profile__input'
                            required
                            showToggle
                            onToggle={handleTogglePassword('oldPassword')}
                        />
                        <Input
                            type={showPassword.password ? 'text' : 'password'}
                            value={password.password}
                            onChange={handlePassword('password')}
                            // error={errors.password}
                            placeholder="Password"
                            className='profile__input'
                            required
                            showToggle
                            onToggle={handleTogglePassword('password')}
                        />
                        <Input
                            type={showPassword.confirm ? 'text' : 'password'}
                            value={password.confirm}
                            onChange={handlePassword('confirm')}
                            // error={errors.confirm}
                            placeholder="confirm password"
                            className='profile__input'
                            required
                            showToggle
                            onToggle={handleTogglePassword('confirm')}
                        />
                        <div >
                            <button>Change password</button>
                        </div>
                    </form>
                </div>

            </div>
        </Wrapper>
    );
}

export default Profile;
