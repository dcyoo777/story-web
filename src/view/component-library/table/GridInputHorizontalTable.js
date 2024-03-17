import { useCallback, useMemo } from 'react';
import './GridInputHorizonalTable.scss';
import { useTranslation } from 'react-i18next';
import { addComma } from 'utils/commonUtils';

function GridInputHorizontalTable(props) {
    const { headers, data, setData, onClick, onSort, title, ...rest } =
        props || {};

    const { t } = useTranslation('translation');

    const gridTemplateColumns = useMemo(
        () =>
            headers.reduce((acc, cur) => {
                return `${acc} ${cur?.flex ?? 1}fr`;
            }, ''),
        [headers],
    );

    const parseDataType = useCallback((item, type) => {
        if (!type) {
            return item;
        }
        switch (type) {
            case 'bool':
                return item ? 'TRUE' : 'FALSE';
            case 'datetime':
                return new Date(item).toLocaleString();
            case 'chain-data':
                return item?.slice(0, 6) + '...' + item?.slice(-6);
            case 'number':
                return addComma(item);
            default:
                return item;
        }
    }, []);

    const totalUtilityToken = useMemo(() => {
        return data?.reduce((acc, cur) => {
            return acc + Number(cur.utilityTokenAmount);
        }, 0);
    }, [data]);
    const totalSuccessUtilityToken = useMemo(() => {
        return data?.reduce((acc, cur) => {
            return acc + Number(cur.successUtilityTokenAmount);
        }, 0);
    }, [data]);
    const totalFailUtilityToken = useMemo(() => {
        return data?.reduce((acc, cur) => {
            return acc + Number(cur.failUtilityTokenAmount);
        }, 0);
    }, [data]);
    const totalRefundAmount = useMemo(() => {
        return data?.reduce((acc, cur) => {
            return acc + Number(cur.refundAmount);
        }, 0);
    }, [data]);
    return (
        <div className="grid-horizonal-input-table" {...rest}>
            {title && <div className="grid-table-title">{title}</div>}
            <div className="row head" style={{ gridTemplateColumns }}>
                {headers.map((head, index) => (
                    <div className="cell" key={`h_${index}`}>
                        {head.label}
                    </div>
                ))}
            </div>
            {data?.length > 0 ? (
                <>
                    {data?.map((item, index) => (
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
                            {headers.map((header, headerIndex) => (
                                <div
                                    className="cell"
                                    key={`c_${headerIndex}`}
                                    {...(header.link && {
                                        onClick: () => {
                                            window.open(
                                                header.link(item[header.key]),
                                            );
                                        },
                                        style: {
                                            cursor: 'pointer',
                                            color: '#1D74FF',
                                        },
                                    })}>
                                    {header.isEditable ? (
                                        <input
                                            type={header.type}
                                            value={item[header.key]}
                                            onChange={e => {
                                                let newData = [...data];
                                                newData[index][header.key] =
                                                    e.target.value;
                                                newData[index][
                                                    'failUtilityTokenAmount'
                                                ] =
                                                    Number(
                                                        item.utilityTokenAmount,
                                                    ) - Number(e.target.value);
                                                setData(newData);
                                            }}
                                            min={header.min}
                                        />
                                    ) : (
                                        <>
                                            {parseDataType(
                                                item[header.key],
                                                header.type,
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <div className="row">
                    <div
                        className="cell"
                        style={{
                            padding: '30px 0',
                            textAlign: 'center',
                            fontWeight: 900,
                            fontSize: '25px',
                        }}>
                        {t('no-data')}
                    </div>
                </div>
            )}
            <div className="row" style={{ padding: 0 }}>
                <div className="total-utility-token-wrapper">
                    <div className="total-utility-token-label">
                        {t('total-utility-token')}
                    </div>
                    <div className="total-utility-token-value ">
                        {addComma(totalUtilityToken)}
                    </div>
                    <div className="total-utility-token-value success">
                        {addComma(totalSuccessUtilityToken)}
                    </div>
                    <div className="total-utility-token-value fail">
                        {addComma(totalFailUtilityToken)}
                    </div>
                    <div className="total-utility-token-value refund">
                        {addComma(totalRefundAmount)}
                    </div>
                </div>
            </div>{' '}
        </div>
    );
}

export default GridInputHorizontalTable;
