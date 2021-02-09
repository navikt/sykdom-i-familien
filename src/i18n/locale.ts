export type Locale = 'nb' | 'nn';

export const defaultLocale: Locale = 'nb';

export const getLocaleToUse = (showLanguageToggle: boolean, locale: string | Locale): Locale => {
    return showLanguageToggle ? (locale as Locale) : defaultLocale;
};
