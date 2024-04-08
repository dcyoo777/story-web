import { useEffect } from 'react';

const useInit = (initFunc = () => {}) => {
    useEffect(() => {
        initFunc();
    }, [initFunc]);
};

export default useInit;
