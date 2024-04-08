import { actionHandler } from '../action/parseAction';
import QueryString from 'qs';
import { useCallback, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useInit from './useInit';

const LIMIT = 20;

const usePagination = (
    getListAction: Function,
    limit = LIMIT,
    args?: Object,
) => {
    const { search } = useLocation();
    const { page: currentPageString } = QueryString.parse(search, {
        ignoreQueryPrefix: true,
    });

    const currentPage = useMemo(
        () => Number(currentPageString ?? 1),
        [currentPageString],
    );

    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState([]);

    useInit(
        useCallback(async () => {
            actionHandler(
                getListAction({
                    ...args,
                    limit,
                    offset: (currentPage - 1) * limit,
                    isCount: true,
                    order: 'DESC',
                }),
                result => {
                    setData(result.list);
                    setTotalCount(result.totalCount);
                },
            );
        }, [getListAction, limit, currentPage, args]),
    );

    return { data, totalCount };
};

export default usePagination;
