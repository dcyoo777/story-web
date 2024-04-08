import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './launges/en.json';
import ko from './launges/ko.json';

const resources = {
    ko,
    en,
};
// Get supported languages
export function getLanguages() {
    return {
        ko: '한국어',
        en: 'English',
    };
}

let locale = navigator.language || navigator.userLanguage;

const sessionLan = sessionStorage.getItem('language');

if (sessionLan) {
    locale = sessionLan;
} else {
    switch (locale) {
        case 'ko':
        case 'ko-KR':
            locale = 'ko';
            break;
        case 'en':
        case 'en-US':
            locale = 'en';
            break;
        default:
    }
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: locale,
    //TODO:: 콘솔 창을 위해 임시로 false로 변경
    debug: false,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export const text = key => i18n.t(key);

export default i18n;
