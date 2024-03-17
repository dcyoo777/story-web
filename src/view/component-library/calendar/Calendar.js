import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Calendar.scss';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday'; // load on demand
import classNames from 'classnames'; // use plugin
import i18n from 'locales';
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

function Calendar({ renderDateContent = date => null }) {
    const [calendar, setCalendar] = useState({
        year: dayjs().year(),
        month: dayjs().month(),
    });

    const [isSelectMonth, setIsSelectMonth] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState({
        year: dayjs().year(),
        month: dayjs().month(),
    });

    const firstDay = useMemo(
        () =>
            dayjs(new Date(calendar.year, calendar.month, 1))
                .weekday(0)
                .add(-new Date().getTimezoneOffset(), 'minutes'),
        [calendar],
    );

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsSelectMonth(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="calendar">
            <div className="header">
                <button
                    className="move-button"
                    onClick={() => {
                        setCalendar(prev => ({ ...prev, year: prev.year - 1 }));
                    }}>
                    {'<<'}
                </button>
                <button
                    className="move-button"
                    onClick={() => {
                        setCalendar(prev => ({
                            ...prev,
                            ...(prev.month === 0 && { year: prev.year - 1 }),
                            month:
                                prev.month === 0 ? 11 : (prev.month - 1) % 12,
                        }));
                    }}>
                    {'<'}
                </button>
                <div className="title-wrapper-out">
                    <div className="title-wrapper-in">
                        <button
                            className="title"
                            onClick={() => setIsSelectMonth(prev => !prev)}>
                            {calendar.year}.{calendar.month + 1}
                        </button>
                        {isSelectMonth && (
                            <div className="select-month" ref={wrapperRef}>
                                <select
                                    size={5}
                                    value={selectedMonth.year}
                                    onChange={e =>
                                        setSelectedMonth(prev => ({
                                            ...prev,
                                            year: e.target.value,
                                        }))
                                    }>
                                    {new Array(100).fill(0).map((_, index) => (
                                        <option value={dayjs().year() + index}>
                                            {dayjs().year() + index}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    size={5}
                                    value={selectedMonth.month}
                                    onChange={e =>
                                        setSelectedMonth(prev => ({
                                            ...prev,
                                            month: e.target.value,
                                        }))
                                    }>
                                    {new Array(12).fill(0).map((_, index) => (
                                        <option value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => {
                                        setCalendar({
                                            year: Number(selectedMonth.year),
                                            month:
                                                Number(selectedMonth.month) - 1,
                                        });
                                        setIsSelectMonth(false);
                                    }}>
                                    확인
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    className="move-button"
                    onClick={() => {
                        setCalendar(prev => ({
                            ...prev,
                            ...(prev.month === 11 && { year: prev.year + 1 }),
                            month:
                                prev.month === 11 ? 0 : (prev.month + 1) % 12,
                        }));
                    }}>
                    {'>'}
                </button>
                <button
                    className="move-button"
                    onClick={() => {
                        setCalendar(prev => ({ ...prev, year: prev.year + 1 }));
                    }}>
                    {'>>'}
                </button>
            </div>
            <div className="weekday">
                {new Array(7).fill(0).map((_, weekdayIndex) => (
                    <div
                        key={`head_${weekdayIndex}`}
                        className={classNames('weekday-cell', {
                            sunday: weekdayIndex === 0,
                            saturday: weekdayIndex === 6,
                        })}>
                        {WEEKDAYS[weekdayIndex]}
                    </div>
                ))}
            </div>
            {calendar.month >= 0 && calendar.month < 13 && (
                <div className="date-container">
                    {new Array(6).fill(0).map((_, weekIndex) => {
                        if (
                            dayjs(new Date(firstDay))
                                .add(weekIndex * 7, 'day')
                                .month() ===
                            calendar.month + 1
                        ) {
                            return null;
                        }
                        return new Array(7).fill(0).map((_, weekdayIndex) => {
                            const date = dayjs(new Date(firstDay)).add(
                                weekIndex * 7 + weekdayIndex,
                                'day',
                            );
                            return (
                                <div
                                    key={`cell_${weekIndex * 7 + weekdayIndex}`}
                                    className={classNames('date-cell', {
                                        'not-this-month':
                                            date.month() !== calendar.month,
                                    })}>
                                    <div
                                        className={classNames(
                                            'date-cell-label',
                                            {
                                                sunday: weekdayIndex === 0,
                                                saturday: weekdayIndex === 6,
                                            },
                                        )}>
                                        {date.date()}
                                    </div>
                                    {date.month() === calendar.month &&
                                        renderDateContent(date)}
                                </div>
                            );
                        });
                    })}
                </div>
            )}
        </div>
    );
}

export default Calendar;
