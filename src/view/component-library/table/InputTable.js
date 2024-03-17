import React, { useCallback, useRef, useState } from 'react';
import './InputTable.scss';
import Select from '../input/Select';
import { UTCTimestamp } from '../../../utils/TimeUtils';
import _ from 'lodash';
import Button from '../button/Button';
import { MdAddCircleOutline } from 'react-icons/md';
import { iconSize } from 'view/styles/variable';

const InputByType = props => {
    const { header, data, onChageData, setData } = props || {};

    const inputRef = useRef(null);

    const uploadFile = e => {
        if (inputRef.current.files[0]) {
            const file = inputRef.current.files[0];
            const reader = new FileReader();
            switch (e.target.accept) {
                case 'text/html':
                    reader.onload = e => {
                        const contents = e.target.result;
                        header?.setPreview(contents);
                    };
                    reader.readAsText(file);
                    break;
                default:
            }
            reader.onloadend = () => {
                if (file.size > 2 * 1024 * 1024 * 1024) {
                    alert('2GB OVER');
                    return;
                } else {
                    onChageData({
                        target: {
                            name: `${header.key}`,
                            type: 'file',
                            value: file,
                        },
                    });
                    header.setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    switch (header.type) {
        case 'select':
            return (
                <Select
                    id={`${header.key}`}
                    name={`${header.key}`}
                    value={data[header.key]}
                    {...header}
                    onChange={onChageData}
                    disabled={!setData}
                />
            );
        case 'bool':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={'checkbox'}
                    checked={data[header.key] ? true : false}
                    onChange={onChageData}
                    disabled={!setData}
                />
            );
        case 'datetime':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    value={UTCTimestamp(data[header.key])}
                    onChange={onChageData}
                    disabled={!setData}
                />
            );
        case 'textarea':
            return (
                <textarea
                    id={`${header.key}`}
                    name={`${header.key}`}
                    value={data[header.key]}
                    onChange={onChageData}
                    disabled={!setData}
                />
            );
        case 'file':
            return (
                <input
                    id={`${header.key}`}
                    ref={inputRef}
                    name={`${header.key}`}
                    type={header.type}
                    {...header}
                    onChange={uploadFile}
                    disabled={!setData}
                />
            );
        case 'html-preview':
            return (
                <div dangerouslySetInnerHTML={{ __html: data[header.key] }} />
            );
        case 'image-preview':
            return <img src={data[header.key]} alt={'preview'} />;
        default:
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    {...header}
                    value={data[header.key] ?? ''}
                    onChange={onChageData}
                    disabled={!setData}
                />
            );
    }
};

const initialNewRow = {
    key: '',
    label: '',
    type: '',
};

function InputTable(props) {
    const { headers, data, setData, addRow } = props || {};

    const [newRow, setNewRow] = useState(initialNewRow);
    const [isEdit, setIsEdit] = useState(false);

    const onChageData = e => {
        const { name, value, type, checked } = e.target || {};
        const valueByType = type => {
            switch (type) {
                case 'checkbox':
                    return checked ? 1 : 0;
                case 'select-one':
                    return Number(value);
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

    const onClickNewRow = useCallback(() => {
        setIsEdit(true);
    }, []);

    const onClickAddRow = useCallback(() => {
        addRow(prev => [...prev, newRow]);
        setNewRow(initialNewRow);
        setIsEdit(false);
    }, [addRow, newRow]);

    return (
        <table className={'input-table'}>
            <tbody>
                {headers.map(header => (
                    <tr key={`input-${header.key}`}>
                        <th>
                            <label htmlFor={`${header.key}`}>
                                {header.label}
                            </label>
                        </th>
                        <td>
                            <div>
                                <InputByType
                                    header={header}
                                    data={data}
                                    onChageData={onChageData}
                                    setData={setData}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
                {addRow && (
                    <>
                        {isEdit ? (
                            <tr>
                                <th>
                                    <input
                                        value={newRow.label}
                                        onChange={e => {
                                            setNewRow(prev => ({
                                                ...prev,
                                                label: e.target.value,
                                                key: _.snakeCase(
                                                    e.target.value,
                                                ),
                                            }));
                                        }}
                                        disabled={!setData}
                                    />
                                </th>
                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Select
                                            value={newRow.type}
                                            options={[
                                                {
                                                    label: 'Text',
                                                    key: 'text',
                                                },
                                                {
                                                    label: 'Number',
                                                    key: 'number',
                                                },
                                            ]}
                                            placeholder={'Select data type'}
                                            onChange={e => {
                                                setNewRow(prev => ({
                                                    ...prev,
                                                    type: e.target.value,
                                                }));
                                            }}
                                        />
                                        <Button
                                            disabled={
                                                !newRow.key || !newRow.type
                                            }
                                            onClick={onClickAddRow}
                                            style={{ margin: '0 6px' }}
                                        >
                                            Add
                                        </Button>
                                        <Button
                                            onClick={() => setIsEdit(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan={2}>
                                    <button
                                        onClick={onClickNewRow}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    >
                                        <MdAddCircleOutline size={iconSize} />
                                    </button>
                                </td>
                            </tr>
                        )}
                    </>
                )}
            </tbody>
        </table>
    );
}

export default InputTable;
