import React, {useCallback, useMemo} from 'react';
import './Main.scss'
import {Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import cn from "classnames";
import dayjs from "dayjs";

function Main() {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const queryDate = useMemo(() => searchParams.get('date') ?? dayjs().format('YYYY-MM-DD'), [searchParams])
    const viewName: 'day' | 'week' = useMemo(() => {
        if (location.pathname.includes('/day')) {
            return 'day'
        } else if (location.pathname.includes('/week')) {
            return 'week'
        } else {
            return 'day'
        }
    }, [location])

    const onPrev = useCallback(() => {
        const prev = dayjs(queryDate).add(-1, viewName).format('YYYY-MM-DD')
        setSearchParams({date: prev})
    }, [viewName, queryDate, setSearchParams])

    const onNext = useCallback(() => {
        const next = dayjs(queryDate).add(1, viewName).format('YYYY-MM-DD')
        setSearchParams({date: next})
    }, [viewName, queryDate, setSearchParams])

    return (
        <div id={"Main"}>
            <div className={"main-content"}>
                <Outlet />
            </div>
            <nav className={"bottom-nav"}>
                {/*<button className={cn("bottom-nav-button")} onClick={() => navigate('/year')}>year</button>*/}
                {/*<button className={cn("bottom-nav-button")} onClick={() => navigate('/month')}>month</button>*/}
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/week')}>week</button>
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/day')}>day</button>
                <button className={cn("bottom-nav-button")} onClick={onPrev}>prev</button>
                <button className={cn("bottom-nav-button")} onClick={onNext}>next</button>
            </nav>
        </div>
    );
}

export default Main;
