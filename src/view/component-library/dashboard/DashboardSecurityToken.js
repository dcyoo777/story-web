import React, { useCallback, useMemo, useState } from 'react';
import { DashBoardAbstractContainer } from '../../page/Dashboard';
import DashboardTokenIcon from '../../assets/image/dashboard-token.png';
import { useTranslation } from 'react-i18next';
import { actionHandler } from '../../../action/util/parseAction';
import { getSTListAction } from '../../../action/securityTokenAction';
import useInit from '../../../hooks/useInit';
import GridTable from '../../component-library/table/GridTable';
import { useLocation, useNavigate } from 'react-router-dom';

function DashboardSecurityToken(props) {
    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const location = useLocation();

    const [securityTokenList, setSecurityTokenList] = useState([])

    const headers = useMemo(
        () => [
            { label: t('name'), key: 'name', flex: 2 },
            { label: t('quantity'), key: 'quantity', flex: 2, type: 'number' },
            { label: t('price'), key: 'price', flex: 2, type: 'number' },
            // { label: t('floating-rate'), key: 'floatingRate', flex: 2, type: 'number' },
            // { label: t('fixed-rate'), key: 'fixedRate', flex: 2, type: 'number' },
            { label: t('liquidation-date'), key: 'liquidationDate', flex: 2, type: 'datetime-short' },
        ],
        [t],
    );

    const init = useCallback(async () => {
        actionHandler(getSTListAction({limit: 20, offset: 0}), result => {
            setSecurityTokenList(result.list);
        });
    }, []);

    useInit(init);

    return (
        <DashBoardAbstractContainer
            title={'토큰 증권'}
            icon={DashboardTokenIcon}
            type={'long'}
        >
            <GridTable
                style={{width: '100%'}}
                headers={headers}
                data={securityTokenList}
                onClick={item => {
                    navigate(`/security-token/${item.securityTokenId}/info`);
                }}
            />
        </DashBoardAbstractContainer>
    );
}

export default DashboardSecurityToken;
