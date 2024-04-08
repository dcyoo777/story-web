import React from 'react';
import { useLocation } from 'react-router-dom';
import './RouteView.scss';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import headerArrow from "../../assets/image/header-arrow.png";

function RouteView() {
    const { t } = useTranslation('translation');
    const location = useLocation();

    return (
        <div id={'RouteView'}>
            {location.pathname
                .split('/')
                .slice(1, location.pathname.split('/').length)
                .map((path, index) => (
                    <span key={`s_${index}`}>
                        {_.isNaN(Number(path)) ? t(path) : path}
                        {index !== location.pathname.split('/').length - 2 && (
                            <>&nbsp; &nbsp; <img className={'header-arrow'} alt={''} src={headerArrow}/> &nbsp; &nbsp;</>
                        )}
                    </span>
                ))}
        </div>
    );
}

export default RouteView;
