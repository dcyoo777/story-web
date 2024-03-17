import React, { useState } from 'react';
import './ListTemplate.scss';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';
import C1 from 'view/components/container/C1';
import GridTable from 'view/component-library/table/GridTable';
import Pagination from 'view/component-library/pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonWrapper from '../../components/ButtonWrapper';
import FilterIcon from '../../assets/image/icon-filter.png'

function ListTemplate(
    {
        id,
        data,
        headers,
        useCreate = true,
        useDetail = true,
        maxCount = 0,
        limit = 10,
        title = 'list',
        hasFilter = false,
        setIsFilterOpen
    }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation('translation');

    const onClickFilter = () => {
        setIsFilterOpen(true)
    }

    return (
        <C1 className={'list-template'}>
            <div className='list-template-header'>
                <span className='list-template-title'>{t(`${title}`)}</span>
                {hasFilter &&
                    <div className='list-template-filter' onClick={() => onClickFilter()}>
                        <img className='list-template-filter-icon' src={FilterIcon} alt='' />
                        <span>필터</span>
                    </div>
                }
            </div>
            <GridTable
                hasFilter={hasFilter}
                title={title}
                headers={headers}
                data={data}
                onClick={item => {
                    if (!useDetail) {
                        return;
                    }
                    navigate(`${item[id]}`);
                }}
            />
            {maxCount > 0 && <Pagination maxCount={maxCount} limit={limit} />}
            {useCreate && (
                <>
                    <div className='dash-line' />
                    <ButtonWrapper>
                        <Button
                            className={'primary'}
                            onClick={() =>
                                navigate('create')

                            }>
                            {t('create')}
                        </Button>
                    </ButtonWrapper>

                </>
            )}
        </C1>
    );
}

export default ListTemplate;
