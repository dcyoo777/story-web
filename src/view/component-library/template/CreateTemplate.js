import React, { useState } from 'react';
import './CreateTemplate.scss';
import GridInputTable from '../table/GridInputTable';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';
import C1 from 'view/components/container/C1';
import DataView from 'view/components/data/DataView';
import ButtonWrapper from '../../components/ButtonWrapper';

function CreateTemplate({
    data,
    setData,
    headers,
    onCreate,
    isPossibleCreate,
    title='create'
}) {
    const { t } = useTranslation('translation');

    return (
        <C1 className={'create-template'}>
            <GridInputTable
                title={title}
                headers={headers}
                data={data}
                setData={setData}
                isEditable={true}
            />
            <ButtonWrapper>
                <Button
                    className={'primary'}
                    onClick={onCreate}
                    disabled={!isPossibleCreate}>
                    {t('create')}
                </Button>
            </ButtonWrapper>
        </C1>
    );
}

export default CreateTemplate;
