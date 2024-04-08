import dayjs from 'dayjs';

export const toLocalDateTime = datetime => {
    if (datetime === null) return dayjs().format('YYYY-MM-DDTHH:mm');
    return dayjs(datetime).format('YYYY-MM-DDTHH:mm');
};

export const UTCTimestamp = date => {
    // dayjs().utcOffset()
    const form = dayjs(date).format('YYYY-MM-DD HH:mm') + '(UTC)';
    if (form === 'Invalid date') return '';
    return form;
};
