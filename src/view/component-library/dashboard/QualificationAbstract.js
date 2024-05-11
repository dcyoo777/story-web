import React, { useCallback, useEffect, useState } from 'react';
import './QualificationAbstract.scss';
import { useTranslation } from 'react-i18next';
import C1 from '../container/C1';
import { getQualificationsAction } from 'action/userAction';
import { Link } from 'react-router-dom';

function QualificationAbstract(props) {
    const { t } = useTranslation('translation');

    const [qualifications, setQualifications] = useState([]);

    const init = useCallback(async () => {
        const { result, error } = await getQualificationsAction();
        if (error) {
            return;
        }
        setQualifications(result.list);
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <C1 className="qualification-abstract">
            <div className="qualification-abstract-label">
                {t('qualification-abstract')}
            </div>
            <div className="qualification-abs-container">
                {qualifications.length === 0 && (
                    <div className="no-qualification-abs">
                        {t('no-qualification-abs')}
                    </div>
                )}
                {qualifications.length > 0 &&
                    qualifications.map(qualification => (
                        <Link
                            className="qualification-abs-item"
                            key={`qualification_${qualification.qualificationId}`}
                            to={`/user/qualification/${qualification.qualificationId}/info`}>
                            <div className="qualification-abs-item-label">
                                {t('appUser-name')}
                            </div>
                            <div className="qualification-abs-item-value">
                                {qualification.user}
                            </div>
                            <div className="qualification-abs-item-label">
                                {t('proposed-appUser-role')}
                            </div>
                            <div className="qualification-abs-item-value">
                                {qualification.role}
                            </div>
                            <div className="qualification-abs-item-label">
                                {t('attachment-number')}
                            </div>
                            <div className="qualification-abs-item-value">
                                {qualification.qualificationFiles?.length}
                            </div>
                        </Link>
                    ))}
            </div>
            <Link
                className={'link-to-qualification'}
                to={`/user/qualification/list`}>
                {t('link-to-qualifications')}
            </Link>
        </C1>
    );
}

export default QualificationAbstract;
