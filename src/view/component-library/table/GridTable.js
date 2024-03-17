import React, { useCallback, useMemo } from 'react';
import './GridTable.scss';
import { addComma } from 'utils/commonUtils';
import dayjs from 'dayjs';

function GridTable(props) {
    const { headers, data, onClick, onSort, title, hasFilter = false, ...rest } = props || {};
    const gridTemplateColumns = useMemo(
        () =>
            headers.reduce((acc, cur) => {
                return `${acc} ${cur?.flex ?? 1}fr`;
            }, ''),
        [headers],
    );

    const parseDataType = useCallback((item, type, header, originItem) => {
        if (!type) {
            return item;
        }
        switch (type) {
            case 'bool':
                return item ? 'TRUE' : 'FALSE';
            case 'datetime':
                return dayjs(item).format('YYYY.MM.DD HH:mm:ss');
            case 'datetime-short':
                return dayjs(item).format('YY. MM. DD HH:mm A');
            case 'chain-data':
                return item?.slice(0, 10) + ' ... ' + item?.slice(-6);
            case 'number':
                return addComma(item);
            case 'image':
                return <img className="grid-table-image" src={item} alt="" />;
            case 'select':
                try {
                    return header?.options?.find(
                        option => option[header?.valueKey ?? 'value'] === item,
                    )[header?.labelKey ?? 'label'];
                } catch {
                    return '';
                }
            case 'custom':
                const CustomVew = header.customView;
                return <CustomVew value={item} originItem={originItem}/>
            default:
                return item;
        }
    }, []);

    return (
        <div className="grid-table" {...rest}>
            {/*<div className='grid-table-header'>*/}
            {/*    <span className="grid-table-header-title">{title}</span>*/}
            {/*    {hasFilter && <div>필터</div>}*/}
            {/*</div>*/}
            <div className="grid-table-head" style={{ gridTemplateColumns }}>
                {headers.map((head, index) => (
                    <div className="grid-table-head-cell" key={`h_${index}`}>
                        {head.label}
                    </div>
                ))}
            </div>
            {[...data]?.map((item, index) => (
                <div
                    className="row"
                    key={`r_${index}`}
                    onClick={() => {
                        if (onClick) {
                            onClick(item);
                        }
                    }}
                    style={{
                        gridTemplateColumns,
                        ...(Boolean(onClick) && {
                            cursor: 'pointer',
                        }),
                    }}>
                    {headers.map((col, index) => (
                        <div
                            className="cell"
                            key={`c_${index}`}
                            {...(col.link && {
                                onClick: () => {
                                    window.open(col.link(item[col.key]));
                                },
                                style: {
                                    cursor: 'pointer',
                                    color: '#1D74FF',
                                },
                            })}>
                            {parseDataType(item[col.key], col.type, col, item)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GridTable;
