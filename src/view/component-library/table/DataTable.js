import { useEffect, useState } from 'react';
import './DataTable.scss';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import InputByType from '../input/InputByType';
import { Tooltip } from 'react-tooltip'

function DataTable(props) {
    const { t } = useTranslation('translation');
    const { headers, data, setData, addRow, title = 'detail-info', isEditable } = props || {};
    const isReadOnly = header =>
        isEditable ? !setData || header.readOnly : true;

    useEffect(()=>{
        if(setData && data.isComplaint === 0){
            setData(prev => {
                return {
                    ...prev,
                    'isComplaint': false,
                };
            });
        }
    },[data])



    const onChangeData = e => {
        const { name, value, type, checked } = e.target || {};
        const valueByType = type => {
            switch (type) {
                case 'checkbox':
                    return checked ? true : false;
                case 'select-one':
                    return _.isNaN(Number(value)) ? value : Number(value);
                default:
                    return value;
            }
        };
        if (setData) {
            setData(prev => {
                return {
                    ...prev,
                    [name]: valueByType(type),
                };
            });
        }
    };

    return (
        <div className="data-view">
            <div className="data-view-title">{t(`${title}`)}</div>
            <div className={'data-view-container'}>
                {headers.map((header, index) => (
                    // (data[header.key] || isEditable) && (
                    <div className="data-view-pair" key={`h_${index}`}>
                        <label
                            htmlFor={`${header.key}`}
                            style={{display:'flex', justifyContent:'space-between'}}
                            key={`input-table-header-${header.key}`}>
                            <div className="data-view-pair-label">
                                {header.label}
                            </div>
                            {
                                header?.explanation &&
                                <img data-tooltip-id={'data-tooltip'} data-tooltip-content={header?.explanation} className={'question-mark-image'} alt={''} src={''}/>
                            }
                            <Tooltip
                                id={'data-tooltip'}
                                place={'bottom'}
                                content={header?.explanation}/>
                        </label>
                        <div
                            className={`data-view-pair-value ${
                                isReadOnly(header) && 'readOnly'
                            }`}>
                            <InputByType
                                header={header}
                                data={data}
                                onChangeData={onChangeData}
                                setData={setData}
                                isReadOnly={isReadOnly}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataTable;
