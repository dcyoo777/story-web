import { useCallback } from 'react';

const debounceFunction = (callback, delay) => {
    let timer;
    return (...args) => {
        // 실행한 함수(setTimeout())를 취소
        clearTimeout(timer);
        // delay가 지나면 callback 함수를 실행
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

const useDebounce = (callback, delay, dependency) => {
    const debounce = useCallback(debounceFunction(callback, delay), dependency);
    return { debounce };
};

export default useDebounce;
