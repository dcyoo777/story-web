import React from 'react';
import './C1.scss';

function C1({ className, ...props }) {
    return (
        <div className={`c1${className ? ` ${className}` : ''}`} {...props} />
    );
}

export default C1;
