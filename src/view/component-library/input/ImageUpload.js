import React, { useEffect, useRef, useState } from 'react';
import './ImageUpload.scss';

function ImageUpload({ name, image, setImage, disabled, ...rest }) {
    const fileRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);

    const uploadImage = () => {
        if (fileRef.current.files[0]) {
            const file = fileRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (file.size > 2 * 1024 * 1024 * 1024) {
                    alert('2GB OVER');
                    return;
                } else {
                    setImage(file);
                }
            };
        }
    };
    useEffect(() => {
        if (!image) {
            return;
        } else if (typeof image === 'string') {
            setPreviewImage(image);
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
        }
    }, [image]);

    return (
        <div className={'image-upload'}>
            <input
                id={name}
                type="file"
                name="image"
                accept="image/*"
                ref={fileRef}
                onChange={e => {
                    uploadImage(e);
                }}
                disabled={disabled}
                {...rest}
            />
            <label
                htmlFor={name}
                style={{ cursor: disabled ? 'default' : 'pointer' }}>
                <div className={'preview'}>
                    {image ? (
                        <img
                            src={previewImage}
                            className={'preview-image'}
                            alt={'image'}
                        />
                    ) : (
                        'preview'
                    )}
                </div>
                {!disabled && (
                    <>
                        <div
                            className={`image-upload-file-name${
                                image ? '' : ' null'
                            }`}>
                            {image ? image?.name : 'upload file name'}
                        </div>
                        <div className={'upload-button'}>Upload</div>
                    </>
                )}
            </label>
        </div>
    );
}

export default ImageUpload;
