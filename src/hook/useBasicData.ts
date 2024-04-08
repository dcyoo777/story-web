import { actionHandler } from '../action/parseAction';
import { useCallback, useState } from 'react';
import useInit from './useInit';

const useBasicData = (getListAction: Function) => {
    const [data, setData] = useState([]);

    useInit(
        useCallback(() => {
            actionHandler(getListAction(), setData);
        }, [getListAction]),
    );

    return { data };
};

export default useBasicData;
