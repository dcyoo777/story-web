import React, { useCallback, useEffect, useState } from 'react';
import './MarketAbstract.scss';
import { useTranslation } from 'react-i18next';
import C1 from '../container/C1';
import { getMarketsAction } from 'action/marketAction';
import { Link } from 'react-router-dom';
import { addComma } from 'utils/commonUtils';
import dayjs from 'dayjs';

const LIMIT = 5;

function MarketAbstract(props) {
    const { t } = useTranslation('translation');

    const [markets, setMarkets] = useState([]);

    const init = useCallback(async () => {
        const { result, error } = await getMarketsAction({
            limit: LIMIT,
            sortStandard: 2,
            orderBy: 'DESC',
        });
        if (error) {
            return;
        }
        setMarkets(result);
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <C1 className="market-abstract">
            <div className="market-abstract-label">{t('market-abstract')}</div>
            <div className="market-abs-container">
                {markets.map(market => (
                    <Link
                        className="market-abs-item"
                        key={`market_${market.marketSecurityTokenId}`}
                        to={`/market/manage/${market.marketSecurityTokenId}/info`}>
                        <div className="market-abs-item-top">
                            <img
                                className="market-abs-item-image"
                                src={market.imgUri}
                                alt=""
                            />
                            <div className="market-abs-item-info">
                                <div className="market-abs-item-title">
                                    {market.name}
                                </div>
                                {market?.cache && (
                                    <div className="market-abs-item-close-price">
                                        {t('current-price')} :{' '}
                                        {addComma(market?.cache?.closePrice)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link className={'link-to-market'} to={`/market/manage/list`}>
                {t('link-to-markets')}
            </Link>
        </C1>
    );
}

export default MarketAbstract;
