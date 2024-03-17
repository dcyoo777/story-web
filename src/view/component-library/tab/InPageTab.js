import React, { useEffect, useMemo, useState } from 'react';
import css from './InPageTab.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTargetPath } from '../../components/layout/SNB';
import SpaceComponent from '../space/SpaceComponent';
import { bindStyle } from '../../../utils/classNamesUtils';
const cn = bindStyle(css)

function InPageTab({ tabs, children, tabConfig = {
    target: 'tab',
    customIndex: 0
} }) {
    const location = useLocation();
    const [currentTabId, setCurrentTabId] = useState(null)

    useEffect(() => {
        let currentTabRoot;
        if(tabConfig.target === 'custom'){
            currentTabRoot = getTargetPath(location.pathname, tabConfig.target, tabConfig.customIndex);
        }else{
            currentTabRoot = getTargetPath(location.pathname, tabConfig.target);
        }
        const currentTab = tabs.find(tab => tab.root === currentTabRoot);
        if(currentTab){
            setCurrentTabId(currentTab.id);
            return;
        }
        setCurrentTabId(null);
    },[location, tabs, tabConfig])

    return (
        <div id={'InPageTab'}>
            <div className='tab-container'>
                {tabs.map((tab,index) => <Tab currentTabId={currentTabId} tab={tab} key={index}/>)}
            </div>
            <SpaceComponent/>
            {children}
        </div>
    );
}

export default InPageTab;

const Tab = ({currentTabId, tab}) => {
    const navigate = useNavigate();
    const isSelectedTab = useMemo(() => currentTabId === tab.id,[currentTabId, tab])

    const onClickTab = () => {
        navigate(tab.route);
    }

    return (
        <div onClick={() => onClickTab()} className={cn('tab', {selected: isSelectedTab})}>
            {tab.label}
        </div>
    )
}
