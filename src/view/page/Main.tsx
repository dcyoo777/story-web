import React, {useCallback, useEffect, useState} from 'react';
import './Main.scss'
import {StoryInterface, storyReq} from "../../service/story/story";
import Day from "../component/Day";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import cn from "classnames";

Main.propTypes = {

};

function Main() {

    const navigate = useNavigate();

    const [items, setItems] = useState<StoryInterface[]>([]);

    const refresh = useCallback(async () => {
        const response = await storyReq.getAll({
            startFrom: "2024-04-21 00:00:00",
            startTo: "2024-04-22 00:00:00",
        })
        setItems(response);
        return response;
    }, [])

    useEffect(() => {
        refresh();
    }, [refresh]);

    return (
        <div id={"Main"}>
            <div className={"main-content"}>
                <Day date={dayjs(items[0]?.start).format("YYYY-MM-DD")} stories={items} setStories={setItems} refresh={refresh}/>
            </div>
            <nav className={"bottom-nav"}>
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/year')}>year</button>
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/month')}>month</button>
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/week')}>week</button>
                <button className={cn("bottom-nav-button")} onClick={() => navigate('/day')}>day</button>
            </nav>
        </div>
    );
}

export default Main;
