import BigNumber from 'bignumber.js';
import { toLocalDateTime } from './timeUtils';

BigNumber.config({
    FORMAT: {
        prefix: '',
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
        suffix: '',
    },
});

const _ = require('lodash');

export const camelCase = obj => {
    if (Array.isArray(obj)) {
        return obj.map(v => camelCase(v));
    } else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            return {
                ...result,
                [_.camelCase(key)]: camelCase(obj[key]),
            };
        }, {});
    }
    return obj;
};

export const addComma = value => {
    if (typeof value === 'number') {
        if (value === 0) {
            return '0';
        }
        return value
            ? BigNumber(value.toString().replaceAll(',', '')).toFormat()
            : '-';
    }
    if (typeof value === 'string') {
        if (value === '') {
            return '0';
        }
        return value && !BigNumber(value?.replaceAll(',', '')).isNaN()
            ? BigNumber(value?.replaceAll(',', '')).toFormat()
            : '-';
    }
};

export const removeComma = value => {
    if (typeof value !== 'string') {
        return '0';
    }
    if (!value) {
        return '0';
    }
    return value?.replaceAll(',', '');
};

export const parseTimeToLocalInObject = (termsData, keyList) => {
    const res = { ...termsData };
    keyList.forEach(key => {
        res[key] = toLocalDateTime(res[key]);
    });
    return res;
};

export const parseBooleanInObject = (obj, keyList) => {
    let parsedObject = { ...obj };
    keyList.forEach(key => {
        parsedObject[key] = Boolean(parsedObject[key]);
    });
    return parsedObject;
};

export const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
};
