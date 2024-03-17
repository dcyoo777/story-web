import React from 'react';
import css from './Button.scss';
import { bindStyle } from '../../../utils/classNamesUtils';
const cn = bindStyle(css);

function Button({ className = 'primary', ...props }) {
    return (
        <button
            className={cn('button', className)}
            {...props}
        />
    );
}

export default Button;
