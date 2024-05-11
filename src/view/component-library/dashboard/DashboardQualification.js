import React, { useCallback, useMemo, useState } from 'react';
import DashboardQualificationIcon from '../../assets/image/dashboard-qualification.png';
import GridTable from '../../component-library/table/GridTable';
import { DashBoardAbstractContainer } from '../../page/Dashboard';
import useInit from '../../../hooks/useInit';
import { actionHandler } from '../../../action/util/parseAction';
import { getQualificationsAction } from '../../../action/userAction';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './DashboardQualification.scss';

function DashboardQualification(props) {
    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    const [qualificationList, setQualifcationList] = useState([])
    const [maxCount, setMaxCount] = useState(0)

    useInit(
        useCallback(async () => {
            actionHandler(getQualificationsAction(), result => {
                setQualifcationList(result.list);
                setMaxCount(result.totalCount);
            });
        }, []),
    );

    const QualificationRequest = ({count}) => {
        return (
            <div className='qualification-request' onClick={() => navigate('/appUser/qualification/list')}>
                {`${count}건의 요청이 있어요`}
            </div>
        )
    }

    const headers = useMemo(
        () => [
            {
                key: 'user',
                label: t('requester'),
                type: 'text',
                readOnly: true,
                flex: 3,
            },
            {
                key: 'role',
                label: t('qualification-role'),
                type: 'text',
                readOnly: true,
                flex: 3,
            }
        ],
        [t],
    );

    return (
        <DashBoardAbstractContainer
            title={'투자자격 변경 신청'}
            icon={DashboardQualificationIcon}
            headerOption={<QualificationRequest count={maxCount}/>}
        >
            <GridTable
                style={{ width: '100%' }}
                headers={headers}
                data={qualificationList}
                onClick={item => {
                    navigate(`/user/qualification/${item.qualificationId}/info`);
                }}
            />
        </DashBoardAbstractContainer>
    );
}

export default DashboardQualification;
