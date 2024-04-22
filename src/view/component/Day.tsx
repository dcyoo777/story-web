import React, {useEffect, useState} from 'react';
import './Day.scss'
import cn from "classnames";
import {animated, config, useSprings} from "@react-spring/web";
import {useDrag} from "@use-gesture/react";
import {StoryInterface, storyReq} from "../../service/story/story";
import StoryView from "./StoryView";
import dayjs from "dayjs";

export type DayProps = {
    date: string,
    stories: StoryInterface[],
    setStories: (stories: any) => void,
    refresh: Function,
}

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const dayOffset = (timestamp: string | undefined) => {
    if (!timestamp) {
        return 0
    }
    return dayjs(timestamp).diff(dayjs(timestamp).hour(0).minute(0).second(0), 'minute')
}

const MAX_HEIGHT = 2400
const MAX_OFFSET = 1440
const MIN_TIME = 10

const fnBody =
    (stories: StoryInterface[], active = false, originalIndex = 0) =>
        (index: number) => {
            return active && index === originalIndex
                ? {
                    top: `${dayOffset(stories[index]?.start) / MAX_OFFSET * MAX_HEIGHT}px`,
                    height: `${(dayOffset(stories[index]?.end) - dayOffset(stories[index]?.start)) / MAX_OFFSET * MAX_HEIGHT}px`,
                    immediate: (key: string) => key === 'zIndex',
                    config: (key: string) => (key === 'y' ? config.stiff : config.default),
                }
                : {
                    top: `${dayOffset(stories[index]?.start) / MAX_OFFSET * MAX_HEIGHT}px`,
                    height: `${(dayOffset(stories[index]?.end) - dayOffset(stories[index]?.start)) / MAX_OFFSET * MAX_HEIGHT}px`,
                    immediate: false,
                }

        }

const fnStart =
    (stories: StoryInterface[], active = false, originalIndex = 0) =>
        (index: number) => {
            return active && index === originalIndex
                ? {
                    top: `${dayOffset(stories[index]?.start) / MAX_OFFSET * MAX_HEIGHT}px`,
                    immediate: (key: string) => key === 'zIndex',
                    config: (key: string) => (key === 'y' ? config.stiff : config.default),
                }
                : {
                    top: `${dayOffset(stories[index]?.start) / MAX_OFFSET * MAX_HEIGHT}px`,
                    immediate: false,
                }
        }

const fnEnd =
    (stories: StoryInterface[], active = false, originalIndex = 0) =>
        (index: number) => {
            return active && index === originalIndex
                ? {
                    top: `${dayOffset(stories[index]?.end) / MAX_OFFSET * MAX_HEIGHT - 10}px`,
                    immediate: (key: string) => key === 'zIndex',
                    config: (key: string) => (key === 'y' ? config.stiff : config.default),
                }
                : {
                    top: `${dayOffset(stories[index]?.end) / MAX_OFFSET * MAX_HEIGHT - 10}px`,
                    immediate: false,
                }
        }

function Day({date, stories, setStories, refresh}: DayProps) {

    const [items, setItems] = useState<StoryInterface[]>(stories);

    const [springsBody, apiBody] = useSprings(items?.length, fnBody(items))
    const [springsStart, apiStart] = useSprings(items?.length, fnStart(items))
    const [springsEnd, apiEnd] = useSprings(items?.length, fnEnd(items))

    const bind = useDrag(({args: [originalIndex], active, movement: [, y]}) => {
        setItems(stories?.map((story, i) => {
            if (i === originalIndex) {
                let move = y < 0 ?
                    Math.max(
                        y,
                        (originalIndex === 0 ?
                            -dayOffset(stories[originalIndex].start)
                            :
                            dayOffset(stories[originalIndex - 1].end) - dayOffset(stories[originalIndex].start)) / MAX_OFFSET * MAX_HEIGHT
                    )
                    :
                    Math.min(
                        y,
                        (originalIndex === stories.length - 1 ?
                            MAX_OFFSET - dayOffset(stories[originalIndex].end)
                            :
                            dayOffset(stories[originalIndex + 1].start) - dayOffset(stories[originalIndex].end)) / MAX_OFFSET * MAX_HEIGHT
                    );
                return {
                    ...story,
                    start: dayjs(story.start).add(move / MAX_HEIGHT * MAX_OFFSET, 'minute').format(TIMESTAMP_FORMAT),
                    end: dayjs(story.end).add(move / MAX_HEIGHT * MAX_OFFSET, 'minute').format(TIMESTAMP_FORMAT)
                }
            }
            return story
        }))
        apiBody.start(fnBody(items, active, originalIndex));
        apiStart.start(fnStart(items, active, originalIndex));
        apiEnd.start(fnEnd(items, active, originalIndex));
        if (!active) {
            storyReq.update(items[originalIndex]).then((res) => {
                if (res.data.result) {
                    refresh()
                }
            })
        }
    })

    const bindStart = useDrag(({args: [originalIndex], active, movement: [, y]}) => {
        setItems(stories?.map((story, i) => {
            if (i === originalIndex) {
                let move = y < 0 ?
                    Math.max(
                        y,
                        (originalIndex === 0 ?
                            -dayOffset(stories[originalIndex].start)
                            :
                            dayOffset(stories[originalIndex - 1].end) - dayOffset(stories[originalIndex].start)) / MAX_OFFSET * MAX_HEIGHT
                    )
                    :
                    Math.min(
                        y,
                        (dayOffset(stories[originalIndex].end) - dayOffset(stories[originalIndex].start) - MIN_TIME) / MAX_OFFSET * MAX_HEIGHT
                    );
                return {
                    ...story,
                    start: dayjs(story.start).add(move / MAX_HEIGHT * MAX_OFFSET, 'minute').format(TIMESTAMP_FORMAT),
                }
            }
            return story
        }))
        apiStart.start(fnStart(items, active, originalIndex));
        apiBody.start(fnBody(items, active, originalIndex));
        if (!active) {
            storyReq.update(items[originalIndex]).then((res) => {
                if (res.data.result) {
                    refresh()
                }
            })
        }
    })

    const bindEnd = useDrag(({args: [originalIndex], active, movement: [, y]}) => {
        setItems(stories?.map((story, i) => {
            if (i === originalIndex) {
                let move = y < 0 ?
                    Math.max(
                        y,
                        (-(dayOffset(stories[originalIndex].end) - dayOffset(stories[originalIndex].start) - MIN_TIME)) / MAX_OFFSET * MAX_HEIGHT
                    )
                    :
                    Math.min(
                        y,
                        (originalIndex === stories.length - 1 ?
                            MAX_OFFSET - dayOffset(stories[originalIndex].end)
                            :
                            dayOffset(stories[originalIndex + 1].start) - dayOffset(stories[originalIndex].end)) / MAX_OFFSET * MAX_HEIGHT
                    );

                return {
                    ...story,
                    end: dayjs(story.end).add(move / MAX_HEIGHT * MAX_OFFSET, 'minute').format(TIMESTAMP_FORMAT),
                }
            }
            return story
        }))
        apiEnd.start(fnEnd(items, active, originalIndex));
        apiBody.start(fnBody(items, active, originalIndex));
        if (!active) {
            storyReq.update(items[originalIndex]).then((res) => {
                if (res.data.result) {
                    refresh()
                }
            })
        }
    })

    useEffect(() => {
        setItems(stories)
    }, [stories]);

    return (
        <div className={cn("day")}>
            <h2 className={cn("day-header-date")}>{date}</h2>
            <div className={cn("day-timeline")}>
                {new Array(25).fill(0).map((_: any, i) => <div className={cn("indicator")}
                                                               style={{top: i * 100 - 5}}
                                                               key={`q${i}`}>
                    <div className={cn("indicator-time")}>{i}</div>
                    <div className={cn("indicator-line")}/>
                </div>)}
                <div style={{marginLeft: 20}}>
                    {springsBody.map((_, i) => (
                        <div className={cn("story")} key={"story_" + i}>
                            <animated.div
                                className={cn("animated_story")}
                                {...bind(i)}
                                key={i}
                                style={{
                                    ...springsBody[i],
                                }}>
                                <StoryView story={stories[i]} refresh={refresh}/>
                            </animated.div>
                            <animated.div
                                className={cn("story-border start")}
                                {...bindStart(i)}
                                key={"border_start_" + i}
                                style={{
                                    ...springsStart[i]
                                }}/>
                            <animated.div
                                className={cn("story-border end")}
                                {...bindEnd(i)}
                                key={"border_end_" + i}
                                style={{
                                    ...springsEnd[i]
                                }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Day;
