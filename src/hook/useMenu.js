import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { account_info } from '../reducer/accountReducer';
import { useTranslation } from 'react-i18next';
import { ROLE } from '../view/assets/constant';
import dashboardIcon from '../view/assets/image/snb-dashboard.png';
import securityTokenIcon from '../view/assets/image/snb-security-token.png';
import subscriptionIcon from '../view/assets/image/snb-subscription.png';
import marketIcon from '../view/assets/image/snb-market.png';
import userIcon from '../view/assets/image/snb-user.png';
import homeContentIcon from '../view/assets/image/snb-home-content.png';
import announcementIcon from '../view/assets/image/snb-announcement.png';
import alarmIcon from '../view/assets/image/snb-alarm.png';
import bankIcon from '../view/assets/image/snb-bank.png';
import dayOffIcon from '../view/assets/image/snb-day-off.png';
import beneficiaryVoteIcon from '../view/assets/image/snb-beneficiary-vote.png';
import inquiryIcon from '../view/assets/image/snb-inquiry.png';
import termIcon from '../view/assets/image/snb-terms.png';
import policyIcon from '../view/assets/image/snb-policy.png';
import appInfoIcon from '../view/assets/image/snb-app-info.png';

const useMenu = () => {
    const { t } = useTranslation('translation');
    const account = useSelector(account_info);

    const snb = useMemo(() => [
        {
            category: null,
            menu: [
                {
                    title: t('dashboard'),
                    icon: dashboardIcon,
                    link: '/dashboard',
                    root: 'dashboard',
                    id: 1,
                },
            ],
        },
        {
            category: t('snb-category-security-token'),
            categoryId: 1,
            menu: [
                {
                    title: t('st'),
                    icon: securityTokenIcon,
                    link: '/security-token/list',
                    root: 'security-token',
                    id: 2,
                },
            ],
        },
        {
            category: t('snb-category-service'),
            categoryId: 2,
            menu: [
                {
                    title: t('subscription'),
                    icon: subscriptionIcon,
                    link: '/subscription/manage/list',
                    root: 'subscription',
                    id: 3,
                    ...(account?.roleId === ROLE.ADMINISTRATOR && {
                        link: '/subscription',
                        sub: [
                            {
                                title: t('manage'),
                                link: '/subscription/manage/list',
                                subRoot: 'manage',
                                id: 301,
                            },
                            {
                                title: t('setting'),
                                link: '/subscription/setting',
                                subRoot: 'setting',
                                id: 302,
                            },
                        ],
                    }),
                },
                {
                    title: t('market'),
                    icon: marketIcon,
                    link: '/market/manage/list',
                    root: 'market',
                    id: 4,
                    ...(account?.roleId === ROLE.ADMINISTRATOR && {
                        link: '/market',
                        sub: [
                            {
                                title: t('manage'),
                                link: '/market/manage/list',
                                subRoot: 'manage',
                                id: 401,
                            },
                            {
                                title: t('setting'),
                                link: '/market/setting',
                                subRoot: 'setting',
                                id: 402,
                            },
                        ],
                    }),
                },
                {
                    title: t('user'),
                    icon: userIcon,
                    link: '/appUser',
                    root: 'user',
                    id: 5,
                    sub: [
                        {
                            title: t('manage'),
                            link: '/appUser/manage/list',
                            subRoot: 'manage',
                            id: 501,
                        },
                        ...(account?.roleId === ROLE.ADMINISTRATOR &&
                            [
                                {
                                    title: t('qualification'),
                                    link: '/appUser/qualification/list',
                                    subRoot: 'qualification',
                                    id: 502,
                                },
                                {
                                    title: t('manager'),
                                    link: '/appUser/manager/list',
                                    subRoot: 'manager',
                                    id: 503,
                                },
                                {
                                    title: t('service-restriction'),
                                    link: '/appUser/service-restriction/list',
                                    subRoot: 'service-restriction',
                                    id: 504,
                                },
                                {
                                    title: t('transaction-restriction'),
                                    link: '/appUser/transaction-restriction/list',
                                    subRoot: 'transaction-restriction',
                                    id: 505,
                                },
                            ]),
                    ],
                },
                {
                    title: t('bank'),
                    icon: bankIcon,
                    link: '/bank/list',
                    root: 'bank',
                    id: 6,
                },
                ...(account?.roleId === ROLE.ADMINISTRATOR
                    && [
                        {
                            title: t('day-offs'),
                            icon: dayOffIcon,
                            link: '/day-offs',
                            root: 'day-offs',
                            id: 7,
                        },
                    ]),
                {
                    title: t('beneficiary-vote'),
                    icon: beneficiaryVoteIcon,
                    link: '/beneficiary-vote/manage/list',
                    root: 'beneficiary-vote',
                    id: 8,
                    ...(account?.roleId === ROLE.ADMINISTRATOR && {
                        link: '/beneficiary-vote',
                        sub: [
                            {
                                title: t('manage'),
                                link: '/beneficiary-vote/manage/list',
                                subRoot: 'manage',
                                id: 801,
                            },
                            {
                                title: t('setting'),
                                link: '/beneficiary-vote/setting',
                                subRoot: 'setting',
                                id: 802,
                            },
                        ],
                    }),
                },
                {
                    title: t('link-asset'),
                    icon: homeContentIcon,
                    link: '/link-asset',
                    root: 'link-asset',
                    id: 9,
                    sub: [
                        {
                            title: t('link-asset-type'),
                            link: '/link-asset/type/list',
                            subRoot: 'type',
                            id: 901,
                        },
                        {
                            title: t('manage'),
                            link: '/link-asset/manage/list',
                            subRoot: 'manage',
                            id: 902,
                        },
                    ],
                },
            ],
        },
        {
            category: t('snb-category-customer-service'),
            categoryId: 3,
            menu: [
                {
                    title: t('alarm'),
                    icon: alarmIcon,
                    link: '/alarm',
                    root: 'alarm',
                    id: 10,
                    sub: [
                        {
                            title: t('alarm-topic'),
                            link: '/alarm/topic/list',
                            subRoot: 'topic',
                            id: 1001,
                        },
                        {
                            title: t('alarm-service'),
                            link: '/alarm/service/list',
                            subRoot: 'service',
                            id: 1002,
                        },
                        // {
                        //     title: t('alarm-schedule'),
                        //     link: '/alarm/schedule/list',
                        // },
                    ],
                },
                {
                    title: t('inquiry'),
                    icon: inquiryIcon,
                    link: '/inquiry',
                    root: 'inquiry',
                    id: 11,
                    sub: [
                        {
                            title: t('category'),
                            link: '/inquiry/category/list',
                            subRoot: 'category',
                            id: 1101,
                        },
                        {
                            title: t('faq'),
                            link: '/inquiry/faq/list',
                            subRoot: 'faq',
                            id: 1102,
                        },
                        {
                            title: t('one-on-one'),
                            link: '/inquiry/one-on-one/list',
                            subRoot: 'one-on-one',
                            id: 1103,
                        },
                    ],
                },
                {
                    title: t('announcement'),
                    icon: announcementIcon,
                    link: '/announcement',
                    root: 'announcement',
                    id: 12,
                    sub: [
                        {
                            title: t('category'),
                            link: '/announcement/category/list',
                            subRoot: 'category',
                            id: 1201,
                        },
                        {
                            title: t('manage'),
                            link: '/announcement/manage/list',
                            subRoot: 'manage',
                            id: 1202,
                        },
                    ],
                },
                {
                    title: t('policy'),
                    icon: policyIcon,
                    link: '/policy',
                    root: 'policy',
                    id: 13,
                    sub: [
                        {
                            title: t('category'),
                            link: '/policy/category/list',
                            subRoot: 'category',
                            id: 1301,
                        },
                        {
                            title: t('manage'),
                            link: '/policy/manage/list',
                            subRoot: 'manage',
                            id: 1302,
                        },
                    ],
                },
                {
                    title: t('terms'),
                    icon: termIcon,
                    link: '/terms',
                    root: 'terms',
                    id: 14,
                    sub: [
                        {
                            title: t('category'),
                            link: '/terms/category/list',
                            subRoot: 'category',
                            id: 1401,
                        },
                        {
                            title: t('manage'),
                            link: '/terms/manage/list',
                            subRoot: 'manage',
                            id: 1402,
                        },
                    ],
                },
                {
                    title: t('app-info'),
                    icon: appInfoIcon,
                    link: '/app-info',
                    root: 'app-info',
                    id: 15,
                },
            ],
        },
    ], [t, account]);

    return { snb };
};

export default useMenu;
