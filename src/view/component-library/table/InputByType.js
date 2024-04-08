import { useMemo, useRef } from 'react';
import './InputByType.scss';
import Select from '../input/Select';
// import { UTCTimestamp } from '../../../util/timeUtils';
import {UTCTimestamp} from "../../../util/timeUtils";
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import MobileView from '../MobileView';
import { addComma, getKeyByValue } from '../../../util/commonUtils';
import { FileUploader } from 'react-drag-drop-files';
// import uploadFileIcon from 'view/assets/image/upload-file.png';
import TimeInput from '../input/TimeInput';
// import { addColon } from '../../../util/parseUtil';

const VALID_PROPS_KEY = [
    'accept',
    'placeholder',
    'options',
    'labelKey',
    'valueKey',
    'className',
];

const InputByType = props => {
    const { t } = useTranslation('translation');
    const { header, data, onChangeData, setData, isReadOnly } = props || {};
    const uploadFile = files => {
        const file = files;
        const reader = new FileReader();

        switch (file.type) {
            case 'text/html':
                reader.onload = e => {
                    const contents = e.target.result;
                    header?.setPreview(contents);
                };
                reader.readAsText(file);
                break;
            default:
                reader.readAsDataURL(file);
        }
        reader.onloadend = () => {
            if (file.size > 2 * 1024 * 1024 * 1024) {
                alert('2GB OVER');
                return;
            } else {
                onChangeData({
                    target: {
                        name: `${header.key}`,
                        type: 'file',
                        value: file,
                    },
                });
                if (header?.setPreview) {
                    header?.setPreview(reader.result);
                }
            }
        };
    };

    const params = useMemo(
        () =>
            Object.keys(header).reduce((acc, cur) => {
                return {
                    ...acc,
                    ...(VALID_PROPS_KEY.includes(cur) && {
                        [cur]: header[cur],
                    }),
                };
            }, {}),
        [header],
    );

    switch (header.type) {
        case 'select':
            return isReadOnly(header) ? (
                <div className='read-only-container'>
                    {params.options?.find(
                        el => el[params?.valueKey ?? 'value'] === data[header.key],
                    ) ? (
                        params.options?.find(
                            el =>
                                el[params?.valueKey ?? 'value'] ===
                                data[header.key],
                        )[params?.labelKey ?? 'label']
                    ) : (
                        ''
                    )}
                </div>
            ) : (
                <Select
                    id={`${header.key}`}
                    name={`${header.key}`}
                    value={data[header.key] ?? ''}
                    {...params}
                    onChange={onChangeData}
                    disabled={isReadOnly(header)}
                />
            );
        case 'bool':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={'checkbox'}
                    checked={Boolean(data[header.key]) ? true : false}
                    onChange={onChangeData}
                    disabled={isReadOnly(header)}
                />
            );
        case 'datetime':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    value={UTCTimestamp(data[header.key])}
                    onChange={onChangeData}
                    disabled={isReadOnly(header)}
                />
            );
        case 'textarea':
            return (
                <textarea
                    id={`${header.key}`}
                    name={`${header.key}`}
                    value={data[header.key]}
                    onChange={onChangeData}
                    disabled={isReadOnly(header)}
                />
            );
        case 'file':
            return (
                <FileUploader
                    handleChange={uploadFile}
                    name={`${header.key}`}
                    types={header.types}
                    // types={['JPEG', 'JPG', 'PNG', 'GIF', 'HTML', 'PDF']}
                    maxSize={1024}
                    minSize={0}>
                    <div className="upload-file">
                        <div className="upload-file-content">
                            <img
                                className="upload-file-content-image"
                                src={""}
                                alt=""
                            />
                            <div className="upload-file-content-text">
                                {data[header.key]?.name ??
                                    t('click-or-drop-image')}
                            </div>
                        </div>
                    </div>
                </FileUploader>
            );
        case 'html-preview':
            return (
                <MobileView>
                    <div
                        dangerouslySetInnerHTML={{ __html: data[header.key] }}
                    />
                </MobileView>
            );
        case 'uri-preview':
            return (
                <MobileView>
                    <iframe
                        title={t('preview')}
                        src={data[header.key]}
                        alt={t('preview')}
                        style={{ width: '100%', height: '100%' }}
                    />
                </MobileView>
            );
        case 'image-preview':
            return (
                <div className="image-preview">
                    {data[header.key] && (
                        <img className='preview-image-wrapper' src={data[header.key]} alt={t('preview')} />
                    )}
                </div>
            );
        case 'link':
            return (
                <div className={'link-input'}
                    {...(header.link && {
                        onClick: () => {
                            window.open(header.link(data[header.key]));
                        },
                    })}>
                    {data[header.key]}
                </div>
            );
        case 'termsVersion':
            return (
                <div>
                    {data.termsVersions.map(el => {
                        return (
                            <div
                                style={{
                                    display: 'flex',
                                }}>
                                {el.isRequired === 1 ? (
                                    <div style={{ width: '50px' }}>최신</div>
                                ) : (
                                    <div style={{ width: '50px' }} />
                                )}
                                <div style={{ marginRight: '20px' }}>
                                    version id: {el.termsVersionId}
                                </div>
                                <div style={{ marginRight: '20px' }}>
                                    terms id: {el.termsId}
                                </div>
                                <div>
                                    createdAt:{' '}
                                    {dayjs(el.createdAt).format(
                                        'YYYY. MM. DD. HH:mm',
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        case 'positiveNumber':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    value={
                        addComma(data[header.key]) === '-'
                            ? ''
                            : addComma(data[header.key])
                    }
                    onChange={onChangeData}
                    min={0}
                    {...params}
                    disabled={isReadOnly(header)}
                />
            );
        case 'image-list':
            return (
                <div className="image-list">
                    {data[header.key]?.map((item, index) => {
                        return (
                            <img
                                src={item.imageUri}
                                alt=""
                                className="image-list-item"
                                key={'image-list-item' + index}
                            />
                        );
                    })}
                </div>
            );
        case 'text-status':
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    value={
                        getKeyByValue(header.statusObj, data[header.key]) ?? ''
                    }
                    onChange={onChangeData}
                    {...params}
                    disabled={isReadOnly(header)}
                />
            );
        case 'time':
            return (
                <TimeInput
                    className="time"
                    id={`${header.key}`}
                    name={`${header.key}`}
                    value={data[header.key] ?? ''}
                    onChange={onChangeData}
                    {...params}
                    disabled={isReadOnly(header)}
                />
            );
        default:
            return (
                <input
                    id={`${header.key}`}
                    name={`${header.key}`}
                    type={header.type}
                    value={data[header.key] ?? ''}
                    onChange={onChangeData}
                    {...params}
                    disabled={isReadOnly(header)}
                />
            );
    }
};

export default InputByType;
