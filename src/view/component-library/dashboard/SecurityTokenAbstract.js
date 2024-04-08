import React, { useCallback, useState } from 'react';
import './SecurityTokenAbstract.scss';
import { useTranslation } from 'react-i18next';
import C1 from '../container/C1';
import { getSTListAction } from 'action/securityTokenAction';
import { Link } from 'react-router-dom';
import { addComma } from 'utils/commonUtils';
import { actionHandler } from 'action/util/parseAction';
import useInit from 'hooks/useInit';

function SecurityTokenAbstract(props) {
    const { t } = useTranslation('translation');

    const [securityTokens, setSecurityTokens] = useState([]);

    const init = useCallback(async () => {
        actionHandler(getSTListAction({}, 5), result => {
            setSecurityTokens(result.list);
        });
    }, []);

    useInit(init);

    return (
        <C1 className="st-abstract">
            <div className="st-abstract-label">{t('st-abstract')}</div>
            <div className="sub-abs-container">
                {securityTokens.map(st => (
                    <Link
                        className="sub-abs-item"
                        key={`sub_${st.securityTokenId}`}
                        to={`/security-token/${st.securityTokenId}/info`}>
                        <img
                            className="sub-abs-item-image"
                            src={st.imageUri}
                            alt=""
                        />
                        <div className="sub-abs-item-info">
                            <div className="sub-abs-item-title">{st.name}</div>
                            <div className="sub-abs-item-description">
                                {t('quantity')}: {addComma(st.quantity)}
                                {`  /  `}
                                {t('price')}: {addComma(st.price)}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link className={'link-to-st'} to={`/security-token/list`}>
                {t('link-to-sts')}
            </Link>
        </C1>
    );
}

export default SecurityTokenAbstract;
