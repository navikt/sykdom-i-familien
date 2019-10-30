import { Locale, defaultLocale } from '../../i18n/locale';

export const getSanityContentWithLocale = (data: any, locale: Locale | string) => {
    if (!data) {
        return undefined;
    }
    if (data && data[locale]) {
        return data[locale];
    }
    return data[defaultLocale];
};
