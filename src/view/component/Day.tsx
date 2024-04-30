import React, {useCallback, useState} from 'react';
import './Day.scss'
import cn from "classnames";
import {Story, StoryInterface, storyReq} from "../../service/story/story";
import dayjs from "dayjs";
import DayStories from "./DayStories";
import {MAX_HEIGHT, MAX_OFFSET, roundOffset, TIMESTAMP_FORMAT} from "../../util/timelineUtil";

export type DayProps = {
    date: string,
    stories: StoryInterface[],
    setStories: (stories: any) => void,
    refresh: Function,
}

function Day({date, stories, setStories, refresh}: DayProps) {

    const [isLoaded, setIsLoaded] = useState(true)

    const refreshDay = useCallback(async (rerender = false) => {
        if (rerender){
            setIsLoaded(false)
        }
        await refresh();
        if (rerender){
            setIsLoaded(true)
        }
    }, [refresh]);

    const onClickTimeline = useCallback(async (e: any) => {

        const start = roundOffset(e.nativeEvent.offsetY) / MAX_HEIGHT * MAX_OFFSET
        const end = start + 60

        const response = await storyReq.create(new Story({
            title: "New Story",
            start: dayjs(date).add(start, 'minute').format(TIMESTAMP_FORMAT),
            end: dayjs(date).add(end, 'minute').format(TIMESTAMP_FORMAT),
            content: "",
            place: "",
        }))

        if(response.data.result){
            await refreshDay(true)
        }
    }, [date, refreshDay])

    return (
        <div className={cn("day")}>
            <h2 className={cn("day-header-date")}>{date}</h2>
            <div className={cn("day-timeline")} onDoubleClick={onClickTimeline}>
                {new Array(25).fill(0).map((_: any, i) => <div className={cn("indicator")}
                                                               style={{top: i * 100 - 5}}
                                                               key={`q${i}`}>
                    <div className={cn("indicator-time")}>{i}</div>
                    <div className={cn("indicator-line")}/>
                </div>)}
                {isLoaded && <DayStories date={date} stories={stories} setStories={setStories} refresh={refreshDay} />}
            </div>
        </div>

    );
}

export default Day;
