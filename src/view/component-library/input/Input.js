import React from 'react';
import './Input.scss';

function Input(props) {
    return <input type={'text'} className={'input-main'} {...props} />;
}

export default Input;
