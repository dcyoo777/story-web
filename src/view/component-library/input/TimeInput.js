import React, { useCallback } from 'react';
import './TimeInput.scss';
import { addColon } from '../../../util/parseUtil';

function TimeInput(props) {
    const { value: realValue, onChange, ...rest } = props;
    const onChangeInput = useCallback(
        e => {
            const { name, value, type } = e.target || {};
            const filteredValue = value
                .split('')
                .filter(c => '0123456789'.includes(c))
                .join('');
            let result = '';
            if (filteredValue + ':' === realValue) {
                result = filteredValue.slice(0, 1);
            } else {
                result = addColon(filteredValue);
            }
            return onChange({
                target: {
                    name,
                    type,
                    value: result,
                },
            });
        },
        [onChange, realValue],
    );

    return (
        <input
            type={'text'}
            value={realValue}
            onChange={onChangeInput}
            {...rest}
        />
    );
}

export default TimeInput;
