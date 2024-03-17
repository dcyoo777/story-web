import React from 'react';
import './FileUploader.scss';
import { useTranslation } from 'react-i18next';
import { FileUploader } from 'react-drag-drop-files';
import uploadFileIcon from 'view/assets/image/upload-file.png';

const FileUploader_ = props => {
    const { t } = useTranslation('translation');
    const { key, types, onLoadFile } = props || {};

    return (
        <FileUploader
            handleChange={onLoadFile}
            name={`${key}`}
            types={types}
            maxSize={1024}
            minSize={0}>
            {props.children ?? (
                <div className="file-uploader">
                    <div className="file-uploader-content">
                        <img
                            className="file-uploader-content-image"
                            src={uploadFileIcon}
                            alt=""
                        />
                        <div className="file-uploader-content-text">
                            {t('click-or-drop-image')}
                        </div>
                    </div>
                </div>
            )}
        </FileUploader>
    );
};

export default FileUploader_;
