import './Pagination.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const LIMIT = 10;

function Pagination({ maxCount = 0, limit = LIMIT }) {
    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    const { search } = useLocation();
    const { page: currentPageString } = qs.parse(search, {
        ignoreQueryPrefix: true,
    });

    const currentPage = useMemo(
        () => Number(currentPageString ?? 1),
        [currentPageString],
    );

    const maxPage = useMemo(
        () => Math.ceil(maxCount / limit),
        [maxCount, limit],
    );

    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        setInputPage(currentPage);
    }, [currentPage]);

    const paginationNumbers = useMemo(() => {
        const pageIndex = Math.floor((currentPage - 1) / 10);
        return new Array(10)
            .fill(0)
            .map((_, index) => pageIndex * 10 + index + 1)
            .filter(pageNum => pageNum <= maxPage);
    }, [currentPage, maxPage]);

    const Pagination = useCallback(
        ({ page }) => {
            let pageNum = page;
            if(pageNum < 10){
                pageNum = `0${pageNum}`
            }
            return (
                <Link
                    className={`pagination-numbers-button${
                        currentPage === page ? ' active' : ''
                    }`}
                    to={`${window.location.pathname}?page=${page}`}>
                    {pageNum}
                </Link>
            )
        }, [currentPage],
    );

    const isAbleGoto = useMemo(() => {
        return Number(inputPage) > 0 && Number(inputPage) <= maxPage;
    }, [inputPage, maxPage]);

    const onGoto = useCallback(() => {
        if (!isAbleGoto) {
            return;
        }
        navigate(`${window.location.pathname}?page=${inputPage}`);
    }, [navigate, inputPage, isAbleGoto]);

    return (
        <div className="pagination">
            <div className="pagination-goto">
                <input
                    className="pagination-goto-input"
                    min={1}
                    max={maxPage}
                    type="number"
                    value={inputPage}
                    onChange={e => setInputPage(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            onGoto();
                        }
                    }}
                />
                <button
                    className={classNames('pagination-goto-button')}
                    disabled={!isAbleGoto}
                    onClick={onGoto}>
                    {t('pagination-goto')}
                </button>
            </div>
            <div className="pagination-numbers">
                <Link
                    className={classNames('pagination-numbers-button-link', {
                        disabled: currentPage === 1,
                    })}
                    to={`${window.location.pathname}?page=${Math.max(
                        currentPage - 1,
                        1,
                    )}`}>
                    {t('pagination-prev')}
                </Link>
                {paginationNumbers.map((pagination, index) => (
                    <Pagination page={pagination} key={`r_${index}`}>
                        {pagination}
                    </Pagination>
                ))}
                <Link
                    className={classNames('pagination-numbers-button-link', {
                        disabled: currentPage === maxPage,
                    })}
                    to={`${window.location.pathname}?page=${Math.min(
                        currentPage + 1,
                        maxPage,
                    )}`}>
                    {t('pagination-next')}
                </Link>
            </div>
        </div>
    );
}

export default Pagination;
