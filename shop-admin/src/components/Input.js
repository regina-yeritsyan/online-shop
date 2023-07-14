import React from 'react';

function Input(props) {
    const { icon, className = '', error, ...p } = props;
    return (
        <div className={`wrap-input100 validate-input ${className}`}>
            <input className="input100" {...p} />
            {icon ? <i className={`focus-input100 fa fa-solid fa-${icon}`} /> : null}
            {error ? <span className="error">{error}</span> : null}
        </div>
    );
}

export default Input;
