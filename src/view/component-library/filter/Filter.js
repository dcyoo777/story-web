import { useCallback, useEffect, useState } from 'react';
import css from './Filter.scss';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonWrapper from '../../components/ButtonWrapper';
import { bindStyle } from '../../../utils/classNamesUtils';
import FilterIcon from '../../assets/image/icon-filter.png';
import CloseIcon from '../../assets/image/close.png';

const cn = bindStyle(css);

function Filter({ isFilterOpen, setIsFilterOpen, initialFilter, initialFilterOptions, setFilter }) {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [filterOptions, setFilterOptions] = useState(initialFilterOptions);

    const onClear = useCallback(() => {
        navigate(`${window.location.pathname}`);
        setFilter(initialFilter);
        setFilterOptions(initialFilterOptions)
    }, [navigate, initialFilter, setFilter, initialFilterOptions])

    const onFilter = useCallback(() => {
        navigate(`${window.location.pathname}?page=1`);
        setFilter(
            filterOptions.reduce((res, option) => {
                return { ...res, [option.key]: option.value };
            }, {}),
        );
    }, [navigate, filterOptions, setFilter]);

    const renderFilterOption = useCallback(
        (option, index) => {
            switch (option.type) {
                case 'select':
                    return (
                        <div className='option' key={`option_${index}`}>
                            <div className='option-label'>
                                {t(option?.label ?? option.key)}
                            </div>
                            <select className='filter-select' onChange={e =>
                                setFilterOptions(prev => {
                                    return prev.map(el => {
                                        if (el.key === option.key) {
                                            if(e.target.value === '-1'){
                                                return {
                                                    ...option,
                                                    value: undefined
                                                }
                                            }
                                            return {
                                                ...option,
                                                value: e.target.value
                                            };
                                        }
                                        return el;
                                    });
                                })
                            }>
                                <option selected={option.value === undefined} value={-1}>선택 안함</option>
                                {option.options.map((option, index) => (
                                    <option value={option.value} key={`filter_option_${index}`}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {/*<Select*/}
                            {/*    options={option.options}*/}
                            {/*    value={option.value}*/}
                            {/*    onChange={e =>*/}
                            {/*        setFilterOptions(prev => {*/}
                            {/*            return prev.map(el => {*/}
                            {/*                if (el.key === option.key) {*/}
                            {/*                    return {*/}
                            {/*                        ...option,*/}
                            {/*                        value: e.target.value ?? undefined*/}
                            {/*                    };*/}
                            {/*                }*/}
                            {/*                return el;*/}
                            {/*            });*/}
                            {/*        })*/}
                            {/*    }*/}
                            {/*/>*/}
                            {/*<div className='option-select-row'>*/}
                            {/*    <label className='option-select-label'>*/}
                            {/*        <input*/}
                            {/*            type='radio'*/}
                            {/*            name={option.key}*/}
                            {/*            checked={option.value === undefined}*/}
                            {/*            value={undefined}*/}
                            {/*            onChange={e =>*/}
                            {/*                setServiceFilterOptions(prev => {*/}
                            {/*                    return prev.map(el => {*/}
                            {/*                        if (el.key === option.key) {*/}
                            {/*                            return {*/}
                            {/*                                ...option,*/}
                            {/*                                value: undefined,*/}
                            {/*                            };*/}
                            {/*                        }*/}
                            {/*                        return el;*/}
                            {/*                    });*/}
                            {/*                })*/}
                            {/*            }*/}
                            {/*        />*/}
                            {/*        {t('option-select-clear')}*/}
                            {/*    </label>*/}
                            {/*    {option.options.map((item, index) => (*/}
                            {/*        <label*/}
                            {/*            className='option-select-label'*/}
                            {/*            key={`o_${index}`}>*/}
                            {/*            <input*/}
                            {/*                type='radio'*/}
                            {/*                name={option.key}*/}
                            {/*                value={item.value}*/}
                            {/*                onChange={e =>*/}
                            {/*                    setServiceFilterOptions(prev => {*/}
                            {/*                        return prev.map(el => {*/}
                            {/*                            if (*/}
                            {/*                                el.key ===*/}
                            {/*                                option.key*/}
                            {/*                            ) {*/}
                            {/*                                return {*/}
                            {/*                                    ...option,*/}
                            {/*                                    value: e.target*/}
                            {/*                                        .value,*/}
                            {/*                                };*/}
                            {/*                            }*/}
                            {/*                            return el;*/}
                            {/*                        });*/}
                            {/*                    })*/}
                            {/*                }*/}
                            {/*            />*/}
                            {/*            {item.label}*/}
                            {/*        </label>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    );
                case 'multi-select':
                    return (
                        <div className='option' key={`option_${index}`}>
                            <div className='option-label'>
                                {t(option?.label ?? option.key)}
                            </div>
                            <div className='option-multi-selects'>
                                {!option?.notUseClear && (
                                    <label className='option-multi-select-row'>
                                        <input
                                            type='checkbox'
                                            name={option.key}
                                            checked={option.value?.length === 0}
                                            onChange={e =>
                                                setFilterOptions(prev => {
                                                    return prev.map(el => {
                                                        if (
                                                            el.key ===
                                                            option.key
                                                        ) {
                                                            return {
                                                                ...option,
                                                                value: [],
                                                            };
                                                        }
                                                        return el;
                                                    });
                                                })
                                            }
                                        />
                                        {t('option-select-clear')}
                                    </label>
                                )}
                                {option.options.map((item, index) => (
                                    <label
                                        className='option-multi-select-row'
                                        key={`o_${index}`}>
                                        <input
                                            type='checkbox'
                                            name={option.key}
                                            checked={option.value?.includes(
                                                item[
                                                option?.valuekey ?? 'value'
                                                    ],
                                            )}
                                            onChange={e =>
                                                setFilterOptions(prev => {
                                                    return prev.map(el => {
                                                        if (
                                                            el.key ===
                                                            option.key
                                                        ) {
                                                            if (
                                                                option.value?.includes(
                                                                    item[
                                                                    option?.valuekey ??
                                                                    'value'
                                                                        ],
                                                                )
                                                            ) {
                                                                return {
                                                                    ...option,
                                                                    value: option.value.filter(
                                                                        element =>
                                                                            element !==
                                                                            item[
                                                                            option?.valuekey ??
                                                                            'value'
                                                                                ],
                                                                    ),
                                                                };
                                                            } else {
                                                                return {
                                                                    ...option,
                                                                    value: [
                                                                        ...el.value,
                                                                        item[
                                                                        option?.valuekey ??
                                                                        'value'
                                                                            ],
                                                                    ],
                                                                };
                                                            }
                                                        }
                                                        return el;
                                                    });
                                                })
                                            }
                                        />
                                        {item[option?.labelkey ?? 'label']}
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className='option' key={`option_${index}`}>
                            <label className='option-label'>
                                {t(option?.label ?? option.key)}
                            </label>
                            <input
                                type={option.type}
                                value={option.value}
                                placeholder='키워드를 입력하세요'
                                onChange={e =>
                                    setFilterOptions(prev => {
                                        return prev.map(el => {
                                            if (el.key === option.key) {
                                                return {
                                                    ...option,
                                                    value: e.target.value,
                                                };
                                            }
                                            return el;
                                        });
                                    })
                                }
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        onFilter();
                                    }
                                }}
                            />
                        </div>
                    );
            }
        },
        [t, onFilter],
    );

    useEffect(() => {
        if (isFilterOpen && initialFilterOptions) {
            setFilterOptions(initialFilterOptions);
        }
    }, [initialFilterOptions, isFilterOpen]);

    useEffect(() => {
        setIsFilterOpen(false);
    }, [location.pathname]);

    return (
        <div className={cn('filter', { open: isFilterOpen })}>
            <div className='filter-header'>
                <div className='filter-left'>
                    <img className='filter-icon' src={FilterIcon} alt='' />
                    <span className='filter-title'>필터</span>
                </div>
                <img onClick={() => setIsFilterOpen(false)} className='filter-close' src={CloseIcon} alt='' />
            </div>
            <div className='filter-content'>
                <div className='filter-options'>
                    {filterOptions.map(renderFilterOption)}
                </div>
                <ButtonWrapper>
                    <Button className={'default'} onClick={onClear}>
                        {t('clear-filter')}
                    </Button>
                    <Button className={'primary'} onClick={onFilter}>
                        {t('attach-filter')}
                    </Button>
                </ButtonWrapper>
            </div>
        </div>
    );
}

export default Filter;
