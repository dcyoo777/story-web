import React from 'react';
import './MobileView.scss';
import { useTranslation } from 'react-i18next';
import Button from '../component-library/button/Button';

function UpdateButtonSet({
    isEditable,
    setIsEditable,
    onUpdate,
    isAbleUpdate,
}) {
    const { t } = useTranslation('translation');

    return (
        <>
            {isEditable ? (
                <>
                    <Button
                        className="default"
                        onClick={() => setIsEditable(false)}>
                        {t('cancel')}
                    </Button>
                    <Button
                        className="primary"
                        disabled={!isAbleUpdate}
                        onClick={onUpdate}>
                        {t('update')}
                    </Button>
                </>
            ) : (
                <Button className="secondary" onClick={() => setIsEditable(true)}>
                    {t('edit')}
                </Button>
            )}
        </>
    );
}

export default UpdateButtonSet;
