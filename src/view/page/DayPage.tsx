import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './DayPage.scss'
import {StoryInterface, storyReq} from "../../service/story/story";
import Day from "../component/Day";
import dayjs from "dayjs";
import {midnight} from "../../util/timelineUtil";
import cn from "classnames";
import {useSearchParams} from "react-router-dom";

DayPage.propTypes = {
};

function DayPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [items, setItems] = useState<StoryInterface[]>([]);

    const validDate = useMemo(() => {
        const dateParam = searchParams.get('date');
        return midnight(dateParam ? dayjs(dateParam) : dayjs());
    }, [searchParams]);

    const refresh = useCallback(async () => {
        const response = await storyReq.getAll({
            startFrom: validDate.format("YYYY-MM-DD 00:00:00"),
            startTo: validDate.add(1, 'day').format("YYYY-MM-DD 00:00:00"),
        })
        setItems(response);
        return response;
    }, [validDate])

    useEffect(() => {
        refresh().finally();
    }, [refresh]);

    return (
        <div id={"DayPage"}>
            <h3 className={cn('day-title')}>{validDate.format("M.D")}</h3>
            <Day date={validDate} stories={items} setStories={setItems} refresh={refresh} indicator={true}/>
        </div>
    );
}

export default DayPage;
