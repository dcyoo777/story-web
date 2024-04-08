import { useCallback, useMemo, useState } from 'react';
import css from './SNBMain.scss';
import {} from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dashboardIcon from '../../assets/image/dashboard.svg';
import securityTokenIcon from '../../assets/image/security-token.svg';
import subscriptionIcon from '../../assets/image/subscription.svg';
import marketIcon from '../../assets/image/market.svg';
import userIcon from '../../assets/image/user.svg';
import bannerIcon from '../../assets/image/banner.svg';
import announcementIcon from '../../assets/image/announcement.svg';
import alarmIcon from '../../assets/image/alarm.svg';
import bankIcon from '../../assets/image/bank.svg';
import dayoffIcon from '../../assets/image/dayoff.svg';
import beneficiaryVoteIcon from '../../assets/image/beneficiary-vote.svg';
import inquiryIcon from '../../assets/image/inquiry.svg';
import termIcon from '../../assets/image/term.svg';
import policyIcon from '../../assets/image/policy.svg';
import appInfoIcon from '../../assets/image/app-info.svg';
import rightIcon from '../../assets/image/right.svg';
import downIcon from '../../assets/image/down.svg';
import cheveronUp from '../../assets/image/Cheveron-up.png';
import cheveronDown from '../../assets/image/Cheveron-down.png';
import cheveronLeft from '../../assets/image/Cheveron-left.png';
import cheveronRight from '../../assets/image/Cheveron-right.png';
import subSnb from '../../assets/image/subSnb.png';
import subSnbBig from '../../assets/image/subSnbBig.png';
import { useSelector } from 'react-redux';
import { ROLE } from 'view/assets/constant';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { bindStyle } from '../../../utils/classNamesUtils';
import { account_info } from 'reducer/accountReducer';

function SNB(props) {
    const cn = bindStyle(css);
    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const account = useSelector(account_info);

    const initialSnb = useMemo(
        () => [
            {
                title: t('dashboard'),
                icon: dashboardIcon,
                link: '/dashboard',
                id: 1,
            },
            {
                title: t('st'),
                icon: securityTokenIcon,
                link: '/security-token/list',
                id: 2,
            },
            {
                title: t('subscription'),
                icon: subscriptionIcon,
                link: '/subscription/manage/list',
                id: 3,
                ...(account?.roleId === ROLE.ADMINISTRATOR && {
                    link: '/subscription/manage/list',
                    isSubOpen: false,
                    sub: [
                        {
                            title: t('subscription-list'),
                            link: '/subscription/manage/list',
                            id: 301,
                        },
                        {
                            title: t('subscription-setting'),
                            link: '/subscription/setting',
                            id: 302,
                        },
                    ],
                }),
            },
            {
                title: t('market'),
                icon: marketIcon,
                link: '/market/manage/list',
                id: 4,
                ...(account?.roleId === ROLE.ADMINISTRATOR && {
                    link: '/market',
                    isSubOpen: false,
                    sub: [
                        {
                            title: t('market-list'),
                            link: '/market/manage/list',
                            id: 401,
                        },
                        {
                            title: t('market-setting'),
                            link: '/market/setting',
                            id: 402,
                        },
                    ],
                }),
            },
            {
                title: t('user'),
                icon: userIcon,
                link: '/user',
                id: 5,
                isSubOpen: false,
                sub: [
                    {
                        title: t('user'),
                        link: '/user/manage/list',
                        id: 501,
                    },

                    ...(account?.roleId === ROLE.ADMINISTRATOR
                        ? [
                            {
                                title: t('qualification'),
                                link: '/user/qualification/list',
                                id: 502,
                            },
                            {
                                title: t('manager'),
                                link: '/user/manager/list',
                                id: 503,
                            },
                            {
                                title: t('service-restriction'),
                                link: '/user/service-restriction/list',
                                id: 504,
                            },
                            {
                                title: t('transaction-restriction'),
                                link: '/user/transaction-restriction/list',
                                id: 505,
                            },
                        ]
                        : []),
                ],
            },
            {
                title: t('bank'),
                icon: bankIcon,
                link: '/bank/list',
                id: 6,
            },
            ...(account?.roleId === ROLE.ADMINISTRATOR
                ? [
                    {
                        title: t('day-offs'),
                        icon: dayoffIcon,
                        link: '/day-offs',
                        id: 7,
                    },
                ]
                : []),

            {
                title: t('beneficiary-vote'),
                icon: beneficiaryVoteIcon,
                link: '/beneficiary-vote/manage/list',
                id: 8,
                ...(account?.roleId === ROLE.ADMINISTRATOR && {
                    link: '/beneficiary-vote',
                    isSubOpen: false,
                    sub: [
                        {
                            title: t('beneficiary-vote-list'),
                            link: '/beneficiary-vote/manage/list',
                            id: 801,
                        },
                        {
                            title: t('beneficiary-vote-setting'),
                            link: '/beneficiary-vote/setting',
                            id: 802,
                        },
                    ],
                }),
            },
            {
                title: t('alarm'),
                icon: alarmIcon,
                link: '/alarm',
                id: 9,
                isSubOpen: false,
                sub: [
                    {
                        title: t('alarm-topic'),
                        link: '/alarm/topic/list',
                        id: 901,
                    },
                    {
                        title: t('alarm-service'),
                        link: '/alarm/service/list',
                        id: 902,
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
                id: 10,
                isSubOpen: false,
                sub: [
                    {
                        title: t('inquiry-category'),
                        link: '/inquiry/category/list',
                        id: 1001,
                    },
                    {
                        title: t('faq'),
                        link: '/inquiry/faq/list',
                        id: 1002,
                    },
                    {
                        title: t('one-on-one'),
                        link: '/inquiry/one-on-one/list',
                        id: 1003,
                    },
                ],
            },
            {
                title: t('link-asset'),
                icon: bannerIcon,
                link: '/link-asset',
                id: 11,
                isSubOpen: false,
                sub: [
                    {
                        title: t('link-asset-type'),
                        link: '/link-asset/type/list',
                        id: 1101,
                    },
                    {
                        title: t('list'),
                        link: '/link-asset/manage/list',
                        id: 1102,
                    },
                ],
            },
            // {
            //     title: t('banner'),
            //     icon: bannerIcon,
            //     link: '/banner/list',
            // },
            {
                title: t('announcement'),
                icon: announcementIcon,
                link: '/announcement',
                id: 12,
                isSubOpen: false,
                sub: [
                    {
                        title: t('announcement-category'),
                        link: '/announcement/category/list',
                        id: 1201,
                    },
                    {
                        title: t('announcement'),
                        link: '/announcement/manage/list',
                        id: 1202,
                    },
                ],
            },
            {
                title: t('policy'),
                icon: policyIcon,
                link: '/policy',
                id: 13,
                isSubOpen: false,
                sub: [
                    {
                        title: t('policy-category'),
                        link: '/policy/category/list',
                        id: 1301,
                    },
                    {
                        title: t('policy'),
                        link: '/policy/manage/list',
                        id: 1302,
                    },
                ],
            },
            {
                title: t('terms'),
                icon: termIcon,
                link: '/terms',
                id: 14,
                isSubOpen: false,
                sub: [
                    {
                        title: t('terms-category'),
                        link: '/terms/category/list',
                        id: 1401,
                    },
                    {
                        title: t('terms'),
                        link: '/terms/manage/list',
                        id: 1402,
                    },
                ],
            },
            {
                title: t('app-info'),
                icon: appInfoIcon,
                link: '/app-info',
                id: 15,
            },
        ],
        [t, account],
    );

    const subMenu = useMemo(() => {
        const {
            securityTokenId,
            subscriptionId,
            marketSecurityTokenId,
            beneficiaryVoteId,
            termsId,
        } = params;
        if (location.pathname.includes('/security-token/') && securityTokenId) {
            return {
                title: t('security-token-detail'),
                menuList: [
                    {
                        title: t('info'),
                        link: `/security-token/${securityTokenId}/info`,
                    },
                    // {
                    //     title: t('images'),
                    //     link: `/security-token/${securityTokenId}/images`,
                    // },
                    {
                        title: t('disclosure'),
                        link: `/security-token/${securityTokenId}/disclosure/list`,
                    },
                    ...(location.pathname ===
                    `/security-token/${securityTokenId}/disclosure/create`
                        ? [
                            {
                                title: t('disclosure-create'),
                                link: location.pathname,
                            },
                        ]
                        : []),
                    ...(location.pathname.includes('disclosure') &&
                    location.pathname.includes('info')
                        ? [
                            {
                                title: t('disclosure-detail'),
                                link: location.pathname,
                            },
                        ]
                        : []),
                    {
                        title: t('subscription'),
                        link: `/security-token/${securityTokenId}/subscription`,
                    },
                ],
            };
        }
        if (location.pathname.includes('/subscription/') && subscriptionId) {
            return {
                title: t('subscription-detail'),
                menuList: [
                    {
                        title: t('info'),
                        link: `/subscription/manage/${subscriptionId}/info`,
                    },
                    {
                        title: t('participation'),
                        link: `/subscription/manage/${subscriptionId}/participation`,
                    },
                    {
                        title: t('setting'),
                        link: `/subscription/manage/${subscriptionId}/setting`,
                    },
                    {
                        title: t('market'),
                        link: `/subscription/manage/${subscriptionId}/market`,
                    },
                ],
            };
        }
        if (location.pathname.includes('/market/') && marketSecurityTokenId) {
            return {
                title: t('market-detail'),
                menuList: [
                    {
                        title: t('info'),
                        link: `/market/manage/${marketSecurityTokenId}/info`,
                    },
                    {
                        title: t('market-chart'),
                        link: `/market/manage/${marketSecurityTokenId}/chart`,
                    },
                    {
                        title: t('base-price'),
                        link: `/market/manage/${marketSecurityTokenId}/base-price`,
                    },
                    {
                        title: t('target-price'),
                        link: `/market/manage/${marketSecurityTokenId}/target-price`,
                    },
                    {
                        title: t('setting'),
                        link: `/market/manage/${marketSecurityTokenId}/setting`,
                    },
                ],
            };
        }
        if (location.pathname.includes('/user/restriction')) {
            return {
                title: t('restriction'),
                menuList: [
                    {
                        title: t('service-restriction'),
                        link: `/user/restriction/service/list`,
                    },
                    {
                        title: t('transaction-restriction'),
                        link: `/user/restriction/transaction/list`,
                    },
                ],
            };
        }
        if (
            location.pathname.includes('/beneficiary-vote/') &&
            beneficiaryVoteId
        ) {
            return {
                title: t('beneficiary-vote-detail'),
                menuList: [
                    {
                        title: t('info'),
                        link: `/beneficiary-vote/manage/${beneficiaryVoteId}/info`,
                    },
                    {
                        title: t('beneficiary-vote-files'),
                        link: `/beneficiary-vote/manage/${beneficiaryVoteId}/files`,
                    },
                ],
            };
        }
        if (location.pathname.includes('/terms/') && termsId) {
            return {
                title: t('terms-detail'),
                menuList: [
                    {
                        title: t('info'),
                        link: `/terms/manage/${termsId}/info`,
                    },
                    {
                        title: t('versions-list'),
                        link: `/terms/manage/${termsId}/versions/list`,
                    },
                    ...(location.pathname ===
                    `/terms/manage/${termsId}/versions/create`
                        ? [
                            {
                                title: t('versions-create'),
                                link: `/terms/manage/${termsId}/versions/create`,
                            },
                        ]
                        : []),
                    ...(location.pathname.includes('versions') &&
                    location.pathname.includes('info')
                        ? [
                            {
                                title: t('versions-detail'),
                                link: `/terms/manage/${termsId}/versions/`,
                            },
                        ]
                        : []),
                ],
            };
        }
        return undefined;
    }, [t, location, params]);

    const [snb, setSnb] = useState(initialSnb);

    const path = useMemo(() => {
        const copyParams = { ...params };
        delete copyParams['*'];
        const parsedParamsArray = location.pathname.split('/').map(p => {
            const paramKey = Object.keys(copyParams).find(
                key => copyParams[key] === p,
            );
            if (paramKey) {
                return `:${paramKey}`;
            }
            return p;
        });
        return parsedParamsArray.join('/');
    }, [location, params]);

    //SUB NAVIGATION
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const onClickMenu2 = item => {
        if (item.disabled) {
            return;
        }
        navigate(item.link);
        setOpenSubMenu(false);
    };

    const renderSNB = useCallback(
        (item, index) => (
            <div
                key={`snb-${index}`}
                className={classNames(`snb-nav`, {
                    active: path.includes(item.link),
                    'is-top': item.isTop,
                })}>
                <button
                    className={classNames(`snb-nav-menu`)}
                    onClick={() => {
                        if (!item.hasOwnProperty('isSubOpen')) {
                            navigate(item.link);
                            return;
                        }
                        setSnb(prev =>
                            prev.map(element => {
                                if (element.link === item.link && item.sub) {
                                    return {
                                        ...element,
                                        isSubOpen: !element.isSubOpen,
                                    };
                                }
                                return element;
                            }),
                        );
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon ? (
                            <img
                                src={item.icon}
                                alt={'icon'}
                                className={'snb-icon'}
                            />
                        ) : (
                            <div className='snb-nav-menu-bullet' />
                        )}
                        <span className='snb-nav-menu-title'>{item.title}</span>
                    </div>
                    {item?.sub && (
                        <img
                            src={
                                item.isSubOpen || path.includes(item.link)
                                    ? downIcon
                                    : rightIcon
                            }
                            alt={'icon'}
                            className={'snb-arrow'}
                        />
                    )}
                </button>

                {/*here*/}

                {(item?.isSubOpen || path.includes(item.link)) && (
                    <div className='sub'>{item?.sub?.map(renderSNB)}</div>
                )}
            </div>
        ),
        [navigate, path],
    );

    const snbMainStyle = useMemo(() => {
        if (subMenu && !openSubMenu) {
            return 'nav2-active';
        } else if (subMenu && openSubMenu) {
            return 'nav2-hide';
        }
        return 'common';
    }, [openSubMenu, subMenu]);

    const [selectedTab, setSelectedTab] = useState(0);

    const renderNav = useCallback(
        item => {
            return (
                <>
                    <div
                        className={
                            window.location.pathname === item.link
                                ? 'main-nav-item selected'
                                : 'main-nav-item'
                        }
                        onClick={() => {
                            if (item.sub?.length === undefined) {
                                setSelectedTab(item.id);
                            }

                            if (!item.hasOwnProperty('isSubOpen')) {
                                navigate(item.link);
                                return;
                            }
                            setSnb(prev =>
                                prev.map(element => {
                                    if (
                                        element.link === item.link &&
                                        item.sub
                                    ) {
                                        return {
                                            ...element,
                                            isSubOpen: !element.isSubOpen,
                                        };
                                    }
                                    return element;
                                }),
                            );
                        }}>
                        <div className='main-nav-item-img-wrapper'>
                            <img src={item.icon} alt='' />
                        </div>
                        <div className='main-nav-item-label'>{item.title}</div>
                        {item.sub && (
                            <img
                                src={
                                    item?.isSubOpen ? cheveronUp : cheveronDown
                                }
                                alt=''
                            />
                        )}
                    </div>
                    {item?.isSubOpen && (
                        <div className='sub-nav-item-wrapper'>
                            {item.sub.map((item, index) => {
                                return (
                                    <div className={'sub-nav-item'}>
                                        <div
                                            className={
                                                window.location.pathname.includes(
                                                    item.link,
                                                )
                                                    ? 'sub-nav-item-label selected'
                                                    : 'sub-nav-item-label'
                                            }
                                            onClick={() => {
                                                setSelectedTab(item.id);

                                                if (
                                                    !item.hasOwnProperty(
                                                        'isSubOpen',
                                                    )
                                                ) {
                                                    navigate(item.link);
                                                    return;
                                                }
                                                setSnb(prev =>
                                                    prev.map(element => {
                                                        if (
                                                            element.link ===
                                                            item.link &&
                                                            item.sub
                                                        ) {
                                                            return {
                                                                ...element,
                                                                isSubOpen:
                                                                    !element.isSubOpen,
                                                            };
                                                        }
                                                        return element;
                                                    }),
                                                );
                                            }}>
                                            {item.title}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            );
        },
        [selectedTab],
    );

    return (
        <div
            id={'SNB-main'}
            className={cn({
                'nav2-active': snbMainStyle === 'nav2-active',
                'nav2-hide': snbMainStyle === 'nav2-hide',
                common: snbMainStyle === 'common',
            })}>
            <div
                className='main-nav'
                onMouseEnter={() => setOpenSubMenu(true)}
                onMouseLeave={() => setOpenSubMenu(false)}>
                {snb.map(renderNav)}
            </div>
            <div id='SNB-nav2-wrapper'>
                <div className='SNB-nav2-title'>{subMenu?.title}</div>
                {subMenu?.menuList?.map((item, index) => {
                    return (
                        <div
                            className={classNames('snb-nav2-menu-wrapper', {
                                active: location.pathname.includes(item.link),
                            })}
                            onClick={() => onClickMenu2(item)}
                            key={`snb-nav2-${index}`}>
                            <div className={`snb-nav2-menu`}>
                                <span className='snb-nav2-menu-title'>
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SNB;
