import React, { useCallback, useMemo, useState } from 'react';
import DashboardSubscriptionIcon from '../../assets/image/dashboard-subscription.png';
import GridTable from '../../component-library/table/GridTable';
import { DashBoardAbstractContainer } from '../../page/Dashboard';
import { useTranslation } from 'react-i18next';
import { actionHandler } from '../../../action/util/parseAction';
import useInit from '../../../hooks/useInit';
import { getSubscriptionListAction } from '../../../action/subscriptionAction';
import { addComma } from '../../../utils/commonUtils';
import './DashboardSubscription.scss';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../../component-library/progressbar/Progressbar';

function DashboardSubscription(props) {
    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [subscriptionList, setSubscriptionList] = useState([]);

    const headers = useMemo(
        () => [
            { label: t('subscription-name'), key: 'name', flex: 4 },
            {
                label: t('status'),
                key: 'soldUtilityTokenAmount',
                flex: 5,
                type: 'custom',
                customView: SubscriptionRate,
            },
        ],
        [t],
    );

    const init = useCallback(async () => {
        actionHandler(getSubscriptionListAction({ isCount: true }), result => {
            setSubscriptionList(result.list);
        });
    }, []);

    useInit(init);

    return (
        <DashBoardAbstractContainer
            title={'청약'}
            icon={DashboardSubscriptionIcon}
        >
            <GridTable
                style={{ width: '100%' }}
                headers={headers}
                data={subscriptionList}
                onClick={item => {
                    navigate(`/subscription/manage/${item.subscriptionId}/info`);
                }}
            />
        </DashBoardAbstractContainer>
    );
}

export default DashboardSubscription;

export const SubscriptionRate = ({ value, originItem }) => {
    return (
        <div className='subscription-rate'>
            <div className='subscription-rate-text'>
                <span>
                    {`${addComma(
                        value /
                        Number(originItem.utilityTokenPrice),
                    )} / ${addComma(
                        Number(originItem.totalSecurityTokenAmount),
                    )}`}
                </span>
            </div>
            <Progressbar percent={value / Number(originItem.utilityTokenPrice) * Number(originItem.totalSecurityTokenAmount)}/>
        </div>

    );
};
