import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import './WeekPage.scss'
import {StoryInterface, storyReq} from "../../service/story/story";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import i18n from "../../locales";
import {midnight} from "../../util/timelineUtil";
import Day from "../component/Day";
import cn from "classnames";
import {useSearchParams} from "react-router-dom";
import {StoryEditContext} from "./Main"; // load on demand
dayjs.extend(weekday);

const WEEKDAYS = [
    i18n.t('weekday-sun'),
    i18n.t('weekday-mon'),
    i18n.t('weekday-tue'),
    i18n.t('weekday-wed'),
    i18n.t('weekday-thu'),
    i18n.t('weekday-fri'),
    i18n.t('weekday-sat'),
];

WeekPage.propTypes = {
};

function WeekPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const {setRefresh} = useContext(StoryEditContext);

    const [items, setItems] = useState<StoryInterface[]>([]);

    const validDate = useMemo(() => {
        const dateParam = searchParams.get('date');
        return midnight(dateParam ? dayjs(dateParam) : dayjs());
    }, [searchParams]);

    const weekFirstDay = useMemo(
        () =>
            validDate.weekday(0),
        [validDate],
    );

    const refresh = useCallback(async () => {
        const response = await storyReq.getAll({
            startFrom: weekFirstDay.format("YYYY-MM-DD 00:00:00"),
            startTo: weekFirstDay.add(7, 'day').format("YYYY-MM-DD 00:00:00"),
        })
        setItems(response);
        return response;
    }, [weekFirstDay])

    useEffect(() => {
        setRefresh(refresh)
        refresh().finally();
    }, [refresh, setRefresh]);

    return (
        <div id={"WeekPage"}>
            {new Array(7).fill(0).map((_, i) => {
                const indexDay = weekFirstDay.add(i, 'day')
                return <div className={cn('weekday')} key={`weekday_${i}`}>
                    <h3 className={cn('weekday-title')}>{indexDay.date()}({WEEKDAYS[i]})</h3>
                    <Day date={indexDay}
                         stories={items.filter((story) => dayjs(story.start).isSame(indexDay, 'day'))}
                         setStories={setItems}
                         refresh={refresh}
                         indicator={i === 0}/>
                </div>
            })}
        </div>
    );
}

export default WeekPage;
