import React, { useCallback, useMemo, useState } from 'react';
import GridTable from '../../component-library/table/GridTable';
import { DashBoardAbstractContainer } from '../../page/Dashboard';
import DashboardMarketIcon from '../../assets/image/dashboard-marktet.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { actionHandler } from '../../../action/util/parseAction';
import useInit from '../../../hooks/useInit';
import { getMarketsAction } from '../../../action/marketAction';
import { bindStyle } from '../../../utils/classNamesUtils';
import css from './DashboardMarket.scss';

const cn = bindStyle(css);

function DashboardMarket(props) {
    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    const [marketList, setMarketList] = useState([]);

    const headers = useMemo(
        () => [
            { label: t('name'), key: 'name', flex: 6 },
            {
                label: t('status'),
                key: 'isActive',
                flex: 6,
                type: 'custom',
                customView: MarketStatus,
            },
        ],
        [t],
    );

    const init = useCallback(async () => {
        actionHandler(getMarketsAction({ isCount: true }), result => {
            setMarketList(result.list);
        });
    }, []);

    useInit(init);

    return (
        <DashBoardAbstractContainer
            title={'마켓'}
            icon={DashboardMarketIcon}
        >
            <GridTable
                style={{ width: '100%' }}
                headers={headers}
                data={marketList}
                onClick={item => {
                    navigate(`/market/manage/${item.marketSecurityTokenId}/info`);
                }}
            />
        </DashBoardAbstractContainer>
    );
}

export default DashboardMarket;

export const MarketStatus = ({ value }) => {
    const isActive = useMemo(() => Boolean(value), [value]);

    const statusText = useMemo(() => isActive ? 'Active' : 'inactive', [isActive]);

    return (
        <div className={cn('market-status', { active: isActive })}>
            <div className={cn('status-dot', { active: isActive })}/>
            {statusText}
        </div>
    );
};
