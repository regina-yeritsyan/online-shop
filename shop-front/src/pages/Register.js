import React, { useCallback, useState } from 'react';
import { registrationRequest } from "../store/actions/users";
import WrapperLogOut from "../components/WrapperLogOut";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../components/Input";

function Register(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
    });

    const handleChange = useCallback((key) => (ev) => {
        setErrors({ ...errors, [key]: null });
        setFormData({ ...formData, [key]: ev.target.value })
    }, [formData, errors]);

    const handleTogglePassword = useCallback(() => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }, []);

    const handleSubmit = useCallback(async (ev) => {
        ev.preventDefault();
        alert('Click on the link sent to your email to become an active user and log in')

        dispatch(registrationRequest(formData,  (err, data) => {
            if (err) {
                setErrors(err.errors);
                return
            }
            navigate('/login');
        }));
    }, [formData]);

    return (
        <WrapperLogOut>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form onSubmit={handleSubmit} className="login100-form validate-form">
                            <span className="login100-form-title p-b-34 p-t-27">
                                Register
                            </span>
                            <Input
                                value={formData.firstName}
                                onChange={handleChange('firstName')}
                                placeholder="First Name"
                                error={errors.firstName}
                                icon="user"
                                required
                            />
                            <Input
                                value={formData.lastName}
                                onChange={handleChange('lastName')}
                                error={errors.lastName}
                                placeholder="Last Name"
                                icon="user"
                                required
                            />
                            <Input
                                value={formData.email}
                                onChange={handleChange('email')}
                                error={errors.email}
                                placeholder="Email"
                                icon="envelope"
                                type='email'
                                required
                            />
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange('password')}
                                error={errors.password}
                                placeholder="Password minimum 6 characters"
                                icon="key"
                                pattern=".{6,}"
                                showToggle
                                onToggle={handleTogglePassword}
                                required
                            />

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Registration
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </WrapperLogOut>
    );
}

export default Register;
