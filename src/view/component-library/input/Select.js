import React, { useMemo } from 'react';
import './Select.scss';

function Select({
    options,
    valueOptions,
    valueKey = 'value',
    labelKey = 'label',
    placeholder,
    ...rest
}) {
    /*
     *
     * Select 를 대체하는 component입니다. 기존의 Select 로는 상위 component와 Select간에
     * 선택된 option이 일치하지 않는 문제가 발생했습니다. 이에 value를 받아 sync를 맞출수 있도록 개선했습니다.
     *
     *
     * options: object List로 가지고 있는 데이터를 온전히 사용해도 괜찮습니다.
     *          화면에 표시될 label과 특정을 위한 value로 사용될 값이 필요합니다.
     *
     * valueKey, labelKey: options에서 각각 어떤 key의 값을 value와 label로 사용할지를 지정할 수 있습니다.
     *                     기본 설정 - value, label
     *
     * placeholder: 가장 먼저 표시되는 string입니다.
     *
     * value: 현재 선택된 option의 value에 해당하는 값을 넘겨주세요.
     *
     * 기존코드와의 호환성을 위해 valueOptions는 그대로 두었으나 options만 사용하는 것을 권장합니다.
     *
     * */

    const optionList = useMemo(() => {
        let tempList = options;
        if (!options || options.length === 0) {
            return [{ [labelKey]: placeholder, [valueKey]: 'DEFAULT' }];
        }
        if (typeof options[0] === 'string') {
            if (
                valueOptions !== undefined &&
                valueOptions?.length === options?.length
            ) {
                tempList = options.map((option, index) => {
                    return {
                        [labelKey]: option,
                        [valueKey]: valueOptions[index],
                    };
                });
            } else if (valueOptions === undefined) {
                tempList = options.map(option => {
                    return {
                        [labelKey]: option,
                        [valueKey]: option,
                    };
                });
            }
        }
        if (placeholder)
            return [{ [labelKey]: placeholder, [valueKey]: 'DEFAULT' }].concat(
                tempList,
            );
        return tempList;
    }, [options, valueOptions]);

    return (
        <select className={'main-select'} {...rest}>
            {Array.isArray(optionList) &&
                optionList.length > 0 &&
                optionList.map(option => (
                    <option value={option[valueKey]} key={option[valueKey]}>
                        {option[labelKey]}
                    </option>
                ))}
        </select>
    );
}

export default Select;
