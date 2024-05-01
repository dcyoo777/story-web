import dayjs from "dayjs";

export const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const dayOffset = (timestamp: string | undefined) => {
    if (!timestamp) {
        return 0
    }
    return dayjs(timestamp).diff(dayjs(timestamp).hour(0).minute(0).second(0), 'minute')
}

export const midnight = (dayjs: dayjs.Dayjs) => dayjs.hour(0).minute(0).second(0).millisecond(0)

export const MAX_HEIGHT = 2400
export const MAX_OFFSET = 1440
export const MIN_TIME = 15
export const MIN_OFFSET = MAX_HEIGHT / MAX_OFFSET * MIN_TIME

export const roundOffset = (offset: number) => Math.round(offset / MIN_OFFSET) * MIN_OFFSET
