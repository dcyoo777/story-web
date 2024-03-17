import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './JsonCreator.scss';
import Select from '../input/Select';
import { MdAddCircleOutline } from 'react-icons/md';
import { iconSize } from 'view/styles/variable';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import cancelBlack from 'view/assets/image/cancel-black.png';
import i18n from 'locales';
import { FileUploader } from 'react-drag-drop-files';
import uploadFileIcon from 'view/assets/image/upload-file.png';
import { PDF_OR_HTML_TYPES } from 'view/assets/constant';
import dropdownOpen from '../../assets/image/dropdownOpen.png';
import dropdownClose from '../../assets/image/dropdownClose.png';

export const DEFAULT_DETAIL = [
    {
        type: 'container',
        key: '컨테이너1',
        value: [
            { type: 'text', key: '규모', value: '-' },
            { type: 'text', key: '연면적', value: '-' },
            {
                type: 'text',
                key: '가레 연면적',
                value: '-',
            },
            { type: 'line', key: 'line1' },
            { type: 'text', key: '건폐율', value: '-' },
            { type: 'text', key: '용적률', value: '-' },
            { type: 'text', key: '주용도', value: '-' },
            { type: 'text', key: '준공년월', value: '-' },
            { type: 'line', key: 'line2' },
            { type: 'text', key: '주차', value: '-' },
        ],
    },
    {
        type: 'container',
        key: '컨테이너2',
        value: [
            { type: 'text', key: '공모대상', value: '-' },
            { type: 'text', key: '증권 종류', value: '-' },
            { type: 'text', key: '발행인', value: '-' },
            {
                type: 'text',
                key: '발행 증권 수',
                value: '-',
            },
            { type: 'text', key: '발행 가액', value: '-' },
            { type: 'text', key: '총 모집액', value: '-' },
            { type: 'text', key: '청약일정', value: '-' },
            { type: 'text', key: '배당주기', value: '-' },
            { type: 'text', key: '최초배당기준일', value: '-' },
        ],
    },
    {
        type: 'page-group',
        key: '관련문서',
        value: [
            {
                type: 'page',
                key: '공적 문서',
                value: [
                    {
                        type: 'webview',
                        key: '등기부등본',
                        value: '',
                    },
                    {
                        type: 'webview',
                        key: '토지이용계획',
                        value: '',
                    },
                ],
            },
            {
                type: 'page',
                key: '투자관련 문서',
                value: [],
            },
        ],
    },
    {
        type: 'page-group',
        key: '자료',
        value: [
            {
                type: 'page',
                key: '공시자료',
                value: [
                    {
                        type: 'page',
                        key: '공모 청약 확정 안내',
                        value: [],
                    },
                    {
                        type: 'page',
                        key: '공모 청약 안내',
                        value: [],
                    },
                ],
            },
        ],
    },
];

const LIST_TYPE = ['container', 'page-group', 'page'];

const getTypes = type => {
    switch (type) {
        case 'container':
            return [
                {
                    label: i18n.t('text'),
                    key: 'text',
                },
                {
                    label: i18n.t('line'),
                    key: 'line',
                },
            ];
        case 'page-group':
            return [
                {
                    label: i18n.t('page'),
                    key: 'page',
                },
            ];
        case 'page':
            return [
                {
                    label: i18n.t('page'),
                    key: 'page',
                },
                {
                    label: i18n.t('webview'),
                    key: 'webview',
                },
            ];
        default:
            return [
                {
                    label: i18n.t('text'),
                    key: 'text',
                },
                {
                    label: i18n.t('container'),
                    key: 'container',
                },
                {
                    label: i18n.t('page-group'),
                    key: 'page-group',
                },
                {
                    label: i18n.t('page'),
                    key: 'page',
                },
                {
                    label: i18n.t('line'),
                    key: 'line',
                },
                {
                    label: i18n.t('webview'),
                    key: 'webview',
                },
            ];
    }
};

const InputByType = props => {
    const { t } = useTranslation('translation');
    const {
        subscriptionId,
        item,
        setData,
        onChangeData,
        routes,
        isReadOnly,
        isEditable,
        uploadFileServer,
    } = props || {};
    const inputRef = useRef(null);

    const uploadFile = async file => {
        const reader = new FileReader();
        switch ('dsf') {
            case 'text/html':
                reader.onload = e => {
                    const contents = e.target.result;
                    item?.setPreview(contents);
                };
                reader.readAsText(file);
                break;
            default:
                reader.readAsDataURL(file);
        }
        reader.onloadend = async () => {
            if (file.size > 2 * 1024 * 1024 * 1024) {
                alert('2GB OVER');
                return;
            } else {
                onChangeData({
                    target: {
                        name: `${item.key}`,
                        type: 'webview',
                        value: await uploadFileServer(file),
                    },
                });
                // if (item?.setPreview) {
                //     item?.setPreview(reader.result);
                // }
            }
        };
    };

    switch (item.type) {
        case 'container':
        case 'page-group':
        case 'page':
            return (
                <JsonCreator
                    containerType={item.type}
                    subscriptionId={subscriptionId}
                    data={item.value}
                    setData={setData}
                    routes={[...(routes ?? []), item.key]}
                    isEditable={isEditable}
                    uploadFile={uploadFileServer}
                />
            );
        case 'webview':
            return (
                <FileUploader
                    handleChange={uploadFile}
                    name={`${item.key}`}
                    types={PDF_OR_HTML_TYPES}
                    disabled={isReadOnly(item)}
                    maxSize={1024}
                    minSize={0}>
                    {isReadOnly(item) ? (
                        <div className='upload-file'>
                            {item.value?.split('/')?.slice(-1)[0]}
                        </div>
                    ) : (
                        <div className='upload-file'>
                            <div className='upload-file-content'>
                                <img
                                    className='upload-file-content-image'
                                    src={uploadFileIcon}
                                    alt=''
                                />
                                <div className='upload-file-content-text'>
                                    {item.value?.split('/')?.slice(-1)[0] === ''
                                        ? t('click-or-drop-image')
                                        : item.value?.split('/')?.slice(-1)[0]}
                                </div>
                            </div>
                        </div>
                    )}
                </FileUploader>
            );
        case 'line':
            return <div />;
        default:
            return (
                <input
                    id={`${item.key}`}
                    name={`${item.key}`}
                    type={item.type}
                    value={item.value ?? ''}
                    onChange={onChangeData}
                    disabled={isReadOnly(item)}
                />
            );
    }
};

const initialNewRow = {
    key: '',
    type: '',
    value: '',
};

export const isHeadFrame = (item) => LIST_TYPE.includes(item.type);


function JsonCreator(props) {
    const { t } = useTranslation('translation');
    const {
        containerType,
        subscriptionId,
        data,
        setData,
        routes,
        isEditable,
        uploadFile,
    } = props || {};

    const [newRow, setNewRow] = useState(initialNewRow);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (!isEditable) {
            setIsEdit(false);
        }
    }, [isEditable]);


    const isReadOnly = item =>
        isEditable ? !setData || item.readOnly || item.type === 'line' : true;

    const onChangeData = e => {
        const { name, value, type, checked } = e.target || {};
        const valueByType = type => {
            switch (type) {
                case 'checkbox':
                    return !!checked;
                case 'select-one':
                    return Number(value);
                default:
                    return value;
            }
        };
        if (setData) {
            setData(prev => {
                const makeData = (list, keys, value) =>
                    list.map(el => {
                        if (keys.length > 1 && el.key === keys[0]) {
                            return {
                                ...el,
                                value: makeData(
                                    el.value,
                                    keys.slice(1, keys.length),
                                    value,
                                ),
                            };
                        } else if (el.key === keys[0]) {
                            return { ...el, value };
                        }
                        return el;
                    });
                return makeData(
                    [...prev],
                    [...(routes ?? []), name],
                    valueByType(type),
                );
            });
        }
    };

    const onClickNewRow = useCallback(() => {
        setIsEdit(true);
    }, []);

    const onClickAddRow = useCallback(() => {
        setData(prev => {
            const makeData = (list, keys) => {
                if (keys.length === 0) {
                    return [...list, newRow];
                }
                return list.map(el => {
                    if (keys.length > 1 && el.key === keys[0]) {
                        return {
                            ...el,
                            value: makeData(
                                el.value,
                                keys.slice(1, keys.length),
                            ),
                        };
                    } else if (el.key === keys[0]) {
                        return { ...el, value: [...el.value, newRow] };
                    }
                    return el;
                });
            };

            return makeData([...prev], [...(routes ?? [])]);
        });
        setNewRow(initialNewRow);
        setIsEdit(false);
    }, [setData, routes, newRow]);


    return (
        <div className={'json-creator'}>
            {data?.map((item, index) => (
                <JsonCreatorField
                    subscriptionId={subscriptionId}
                    item={item}
                    key={index}
                    index={index}
                    setData={setData}
                    onChangeData={onChangeData}
                    routes={routes}
                    isReadOnly={isReadOnly}
                    isEditable={isEditable}
                    uploadFile={uploadFile}
                />
            ))}
            {setData && isEditable && (
                <>
                    {isEdit ? (
                        <div className='row'>
                            <div className='header'>
                                <input
                                    value={newRow.key}
                                    onChange={e => {
                                        setNewRow(prev => ({
                                            ...prev,
                                            key: e.target.value,
                                        }));
                                    }}
                                    disabled={!setData}
                                />
                            </div>
                            <div
                                className='frame'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                <Select
                                    value={newRow.type}
                                    options={getTypes(containerType)}
                                    valueKey='key'
                                    placeholder={t('select-type')}
                                    onChange={e => {
                                        setNewRow(prev => ({
                                            ...prev,
                                            type: e.target.value,
                                            value: LIST_TYPE.includes(
                                                e.target.value,
                                            )
                                                ? []
                                                : '',
                                        }));
                                    }}
                                />
                                <button
                                    className='add-button'
                                    disabled={!newRow.key || !newRow.type}
                                    onClick={onClickAddRow}>
                                    {t('add')}
                                </button>
                                <button
                                    className='cancel-button'
                                    style={{ whiteSpace: 'nowrap' }}
                                    onClick={() => setIsEdit(false)}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className='new-row-button'
                            onClick={onClickNewRow}>
                            <MdAddCircleOutline size={iconSize} />
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default JsonCreator;

export const JsonCreatorField = (
    {
        subscriptionId,
        item,
        index,
        setData,
        onChangeData,
        routes,
        isReadOnly,
        isEditable,
        uploadFile,
    }) => {
    const makeDataForDeleteRow = (list, keys, key) => {
        if (keys.length === 0) {
            return list.filter(
                el => el.key !== key,
            );
        }
        return list.map(el => {
            if (
                keys.length > 1 &&
                el.key === keys[0]
            ) {
                return {
                    ...el,
                    value: makeDataForDeleteRow(
                        el.value,
                        keys.slice(
                            1,
                            keys.length,
                        ),
                        key,
                    ),
                };
            } else if (el.key === keys[0]) {
                return {
                    ...el,
                    value: el.value.filter(
                        el =>
                            el.key !== key,
                    ),
                };
            }
            return el;
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(!isHeadFrame(item)){
            setIsOpen(true)
        }
    },[item])

    useEffect(() => {
        if(isEditable && isHeadFrame(item)){
            setIsOpen(true)
        }
    },[isEditable, item])

    const onClickHeadFrame = () => {
        if(isHeadFrame(item) && !isEditable && item.value.length !== 0){
            setIsOpen(prev => !prev)
        }
    }

    return (
        <div
            className={classNames({
                'head-frame': isHeadFrame(item),
                row: !isHeadFrame(item),
            })}
            key={`json-creator-key ${index}`}>
            <div className='header' onClick={() => onClickHeadFrame()}>
                {item.key} [{item.type}]
                {
                    (isHeadFrame(item) && !isEditable && item.value.length !== 0) &&
                    <img
                        className='dropdown-img'
                        src={isOpen ? dropdownOpen : dropdownClose}
                        alt={''}
                    />
                }
                {isEditable && (
                    <button
                        className='delete-row'
                        onClick={() => {
                            setData(prev => {
                                return makeDataForDeleteRow(
                                    [...prev],
                                    [...(routes ?? [])],
                                    item.key,
                                );
                            });
                        }}>
                        <img src={cancelBlack} alt='' />
                    </button>
                )}
            </div>
            {
                isOpen &&
                <div
                    className={classNames({
                        body: isHeadFrame(item),
                        frame: !isHeadFrame(item),
                        readOnly: isReadOnly(item),
                    })}>
                    <InputByType
                        subscriptionId={subscriptionId}
                        item={item}
                        setData={setData}
                        onChangeData={onChangeData}
                        routes={routes}
                        isReadOnly={isReadOnly}
                        isEditable={isEditable}
                        uploadFileServer={uploadFile}
                    />
                </div>
            }
        </div>
    )

};
