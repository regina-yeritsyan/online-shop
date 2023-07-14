import React from 'react';

function Input(props) {
    const { icon, className = '', error, showToggle, onToggle, value,  ...p } = props;
    return (
        <div className={`wrap-input100 validate-input`}>
            <input className={`input100  ${className}`} {...p} value={value}/>
            {icon ? <i className={`focus-input100 fa fa-solid fa-${icon}`} /> : null}
            {error ? <span className="error">{error}</span> : null}
            {showToggle && value && <span className="toggle__pass" onClick={onToggle}>
                {p.type === 'password'
                    ?
                    <i className="fa-solid fa-eye"></i>
                    :
                    <i className="fa-solid fa-eye-slash"></i>
                }
            </span>}
        </div>
    );
}

export default Input;
