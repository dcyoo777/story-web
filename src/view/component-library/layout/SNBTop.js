import React from 'react';
import './SNBTop.scss';
import { Link } from 'react-router-dom';
import icon from 'view/assets/image/APND.png';

function SNBTop() {
    return (
        <div id="SNB-top">
            <Link id="SNB-logo" to={'/'}>
                <img src={icon} alt="apnd" />
            </Link>
        </div>
    );
}

export default SNBTop;
