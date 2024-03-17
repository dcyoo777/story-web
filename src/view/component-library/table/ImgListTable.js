import './ImgListTable.scss';
import { useTranslation } from 'react-i18next';
import Button from '../button/Button';

function ImgListTable(props) {
    const { headers, data = [], setData, colgroup, isOrdering, style } = props;
    const { t } = useTranslation('translation');

    const onChangeOrder = (e, key) => {
        const { value } = e.target;
        setData(prev => {
            const newData = prev.map(item => {
                if (item.securityTokenImageId === key) {
                    return {
                        ...item,
                        order: value,
                    };
                }
                return item;
            });
            return newData;
        });
    };

    return (
        <div className="img-list-table" style={style}>
            <div className="img-list-table__header">
                {headers.map((header, index) => (
                    <div
                        className="img-list-table__header-label"
                        style={{ width: colgroup[index] }}
                        key={header.key + index}>
                        {header.label}
                    </div>
                ))}
            </div>
            <div className="img-list-table__content">
                {data.map((item, index) => (
                    <div
                        className="img-list-table__row"
                        key={index + 'data' + item.id}>
                        {headers.map((header, headerIndex) => (
                            <div
                                className="img-list-table__cell"
                                key={'headerKey-' + header.key}
                                style={{ width: colgroup[headerIndex] }}>
                                {header.type === 'image-preview' && (
                                    <img
                                        src={item[header.key]}
                                        alt=""
                                        className="img-list-table__cell-img"
                                    />
                                )}
                                {header.type === 'ordering' && (
                                    <>
                                        {isOrdering ? (
                                            <input
                                                value={item[header.key]}
                                                onChange={e =>
                                                    onChangeOrder(
                                                        e,
                                                        item[
                                                            'securityTokenImageId'
                                                        ],
                                                    )
                                                }
                                            />
                                        ) : (
                                            <div className="img-list-table__cell__value">
                                                {item[header.key]}
                                            </div>
                                        )}
                                    </>
                                )}
                                {header.type === 'text' && (
                                    <div className="img-list-table__cell__value">
                                        {item[header.key]}
                                    </div>
                                )}
                                {header.type === 'button' && (
                                    <Button
                                        className="error"
                                        style={{ margin: '10px' }}
                                        onClick={() =>
                                            header.onClick(
                                                item.securityTokenImageId,
                                            )
                                        }>
                                        {t('st-image-delete')}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImgListTable;
