import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './SNB.scss';
import useMenu from '../../../hooks/useMenu';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/APND.png';
import arrow from '../../assets/image/snb-arrow.png';
import { bindStyle } from '../../../utils/classNamesUtils';
import css from './SNBMain.scss';

const cn = bindStyle(css);

const TAB_HEIGHT = 42;

export const getTargetPath = (path, target = 'root', customIndex) => {
    if (target === 'custom') {
        return path.split('/')[customIndex];
    }
    if (target === 'subRoot') {
        return path.split('/')[2];
    }
    if (target === 'tab') {
        return path.split('/')[4];
    }
    return path.split('/')[1];
};

function SNB() {
    const { snb } = useMenu();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        const allMenus = snb.map(category => category.menu)
            .reduce((acc, cur) => [...acc, ...cur], []);
        const currentMenu = allMenus.find(menu => menu.root === getTargetPath(location.pathname));
        setSelectedMenu(currentMenu);
    }, [snb, location]);

    return (
        <div id={'SNB'}>
            <Link className='snb-logo' to={'/'}>
                <img src={logo} alt='apnd' />
            </Link>
            <div className='snb-container'>
                {snb.map((snb,index) => (<Category selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} snb={snb} key={index}/>))}
            </div>
        </div>
    );
}

export default SNB;

function Category({ selectedMenu, setSelectedMenu, snb }) {
    return (
        <div className='category'>
            {snb.category && <span className='category-name'>{snb.category}</span>}
            {snb.menu.map((menu, index) => (<Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menu={menu} key={index}/>))}
        </div>
    );
}

function Menu({ selectedMenu, setSelectedMenu, menu }) {
    const navigate = useNavigate();
    const isSelectedMenu = useMemo(() => selectedMenu && selectedMenu.id === menu.id, [menu, selectedMenu]);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    const hasSubMenu = useMemo(() => {
        return menu.hasOwnProperty('sub') && menu.sub.length !== 0;
    }, [menu]);

    const currentHeight = useMemo(() => {
        if (!isSubMenuOpen) {
            return 0;
        }
        if (!isSelectedMenu) {
            return 0;
        }
        return TAB_HEIGHT * menu.sub.length;
    }, [isSelectedMenu, isSubMenuOpen, menu]);

    const onClickMenu = useCallback(() => {
        if (!hasSubMenu) {
            navigate(menu.link);
            return;
        }
        setSelectedMenu(menu);
    }, [hasSubMenu, menu]);

    useEffect(() => {
        if (isSelectedMenu && hasSubMenu) {
            setIsSubMenuOpen(true);
            return;
        }
        setIsSubMenuOpen(false);
    }, [hasSubMenu, isSelectedMenu]);

    return (
        <div className='menu'>
            <div className={cn('menu-container', { selected: isSelectedMenu })} onClick={() => onClickMenu()}>
                <div className='menu-detail'>
                    <img className='menu-icon' src={menu.icon} alt='menu' />
                    <span className={cn('menu-name', { selected: isSelectedMenu })}>{menu.title}</span>
                </div>
                {hasSubMenu && <img src={arrow} alt='arrow' style={{ rotate: isSelectedMenu ? '180deg' : '0deg' }} />}
            </div>
            {hasSubMenu &&
                <SliderContainer currentHeight={currentHeight} isOpen={isSubMenuOpen}>
                    {menu.sub.map((subMenu,index) => <SubMenu menu={menu} isSelectedMenu={isSelectedMenu} subMenu={subMenu} key={index}/>)}
                </SliderContainer>
            }
        </div>
    );
}

function SubMenu({ menu, subMenu, isSelectedMenu }) {
    const navigate = useNavigate();
    const location = useLocation();

    const onClickSubMenu = () => {
        navigate(subMenu.link);
    };

    const isSelectedSubMenu = useMemo(() => {
        return isSelectedMenu && menu.root === getTargetPath(location.pathname, 'root') && subMenu.subRoot === getTargetPath(location.pathname, 'subRoot');
    }, [location, menu, isSelectedMenu, subMenu]);

    return (
        <div className={cn('sub-menu', { selected: isSelectedSubMenu })} onClick={() => onClickSubMenu()}>
            <div className='space' />
            <span className={cn('sub-menu-name', { selected: isSelectedSubMenu })}>- {subMenu.title}</span>
        </div>
    );
}

function SliderContainer({ currentHeight, isOpen = true, children }) {
    const sliderStyle = useMemo(() => {
        const defaultSliderStyle = {
            height: currentHeight,
        };
        if (isOpen) {
            return {
                ...defaultSliderStyle,
                overflow: 'visible',
                opacity: 1,
            };
        }
        return defaultSliderStyle;
    }, [currentHeight, isOpen]);

    return (
        <div className='slider-container' style={{ ...sliderStyle }}>
            {children}
        </div>
    );
}
