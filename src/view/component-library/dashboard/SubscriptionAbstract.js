import React, { useCallback, useState } from 'react';
import './SubscriptionAbstract.scss';
import { useTranslation } from 'react-i18next';
import C1 from '../container/C1';
import { getSubscriptionListAction } from 'action/subscriptionAction';
import { Link } from 'react-router-dom';
import { addComma } from 'utils/commonUtils';
import dayjs from 'dayjs';
import useInit from 'hooks/useInit';
import { actionHandler } from 'action/util/parseAction';

const LIMIT = 5;

function SubscriptionAbstract(props) {
    const { t } = useTranslation('translation');

    const [subscriptions, setSubscriptions] = useState([]);

    useInit(
        useCallback(async () => {
            actionHandler(
                getSubscriptionListAction({
                    limit: LIMIT,
                    isCount: true
                }),
                result => {
                    setSubscriptions(result.list);
                },
            );
        }, []),
    );

    return (
        <C1 className="subscription-abstract">
            <div className="subscription-abstract-label">
                {t('subscription-abstract')}
            </div>
            <div className="sub-abs-container">
                {subscriptions.map(subscription => (
                    <Link
                        className="sub-abs-item"
                        key={`sub_${subscription.subscriptionId}`}
                        to={`/subscription/manage/${subscription.subscriptionId}/info`}>
                        <div className="sub-abs-item-top">
                            <img
                                className="sub-abs-item-image"
                                src={subscription.imageUri}
                                alt=""
                            />
                            <div className="sub-abs-item-info">
                                <div className="sub-abs-item-title">
                                    {subscription.name}
                                </div>
                                <div className="sub-abs-item-address">
                                    {subscription.homeAddress}
                                </div>
                                <div className="sub-abs-item-dates">
                                    {dayjs(
                                        subscription.subscriptionStartDate,
                                    ).format('YYYY년 M월 D일')}{' '}
                                    ~{' '}
                                    {dayjs(
                                        subscription.subscriptionEndDate,
                                    ).format('YYYY년 M월 D일')}
                                </div>
                            </div>
                        </div>
                        <div className="sub-abs-item-amounts">
                            {addComma(
                                subscription.soldUtilityTokenAmount /
                                    Number(subscription.utilityTokenPrice),
                            )}{' '}
                            /{' '}
                            {addComma(
                                Number(subscription.totalSecurityTokenAmount),
                            )}
                        </div>
                        <progress
                            value={subscription.soldUtilityTokenAmount}
                            max={
                                Number(subscription.utilityTokenPrice) *
                                Number(subscription.totalSecurityTokenAmount)
                            }
                        />
                    </Link>
                ))}
            </div>
            <Link className={'link-to-subscription'} to={`/subscription/manage/list`}>
                {t('link-to-subscriptions')}
            </Link>
        </C1>
    );
}

export default SubscriptionAbstract;
