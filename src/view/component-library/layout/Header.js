import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Header.scss';

function Header(props) {
    // const { t } = useTranslation('translation');
    //
    // const wrapperRef = useRef(null);
    //
    // const account = useSelector(account_info);
    // const userId = account.userId;
    // const roleName = useMemo(() => {
    //     switch (account.roleId) {
    //         case ROLE.ADMINISTRATOR:
    //             return 'administrator';
    //         case ROLE.MANAGER:
    //             return 'manager';
    //         default:
    //             return 'unknown';
    //     }
    // }, [account]);
    //
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    //
    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (
    //             wrapperRef.current &&
    //             !wrapperRef.current.contains(event.target)
    //         ) {
    //             setIsOpenMenu(false);
    //         }
    //     }
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [wrapperRef]);

    return (
        <header className={'root-header'}>
            {/*<div id={'header-general'}>*/}
            {/*    <RouteView />*/}
            {/*</div>*/}
            {/*<div className="personal-wrapper">*/}
            {/*    <div id={'header-personal'} onClick={() => setIsOpenMenu(true)}>*/}
            {/*        <div className="header-option account">*/}
            {/*            /!* <MdOutlineAccountCircle size="30" color="#fff" /> *!/*/}
            {/*            <div className="role">{t(roleName)}</div>*/}
            {/*            <div className="name">{account.name}</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    {isOpenMenu && (*/}
            {/*        <div className="personal-menu" ref={wrapperRef}>*/}
            {/*            <button onClick={() => logoutAction(userId)}>*/}
            {/*                {t('logout')}*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </header>
    );
}

export default Header;
