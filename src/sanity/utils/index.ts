import { defaultLocale, Locale } from '../../i18n/locale';
import { SanityContentHeadingLevel } from '../types';
import {
    isValidLocaleObject,
    isValidLocaleStringObject,
    LocaleObject,
    LocaleStringObject,
} from '../types/locale-objects';
import { BlockContentType } from '../types/parts';

const hasLocaleValue = (obj?: LocaleObject, locale: Locale | string = defaultLocale): boolean =>
    obj !== undefined &&
    ((obj[locale] !== undefined && obj[locale] !== '') ||
        (obj[defaultLocale] !== undefined && obj[defaultLocale] !== ''));

export const getLocaleObject = (
    obj: LocaleObject | undefined,
    locale: Locale | string = defaultLocale
): object | string | undefined => (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[defaultLocale] : undefined);

export const getLocaleString = (obj: LocaleStringObject, locale: Locale | string = defaultLocale): string =>
    obj[locale] || obj[defaultLocale];

export const getOptionalLocaleValue = (obj?: LocaleObject, locale?: Locale | string): object | string | undefined =>
    isValidLocaleObject(obj) ? getLocaleObject(obj, locale) : undefined;

export const getOptionalLocaleString = ({
    obj,
    locale,
}: {
    obj?: LocaleObject;
    locale: Locale | string;
}): string | undefined => {
    return isValidLocaleStringObject(obj) ? getLocaleString(obj, locale) : undefined;
};

export const getLocaleBlockContent = (
    obj: LocaleObject | undefined,
    locale: Locale | string = defaultLocale
): BlockContentType => (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[defaultLocale] : []);

export const getHeadingLevelForChild = (headingLevel: SanityContentHeadingLevel): SanityContentHeadingLevel => {
    switch (headingLevel) {
        case 1:
            return 2;
        case 2:
            return 3;
        case 3:
            return 4;
        case 4:
            return 5;
        case 5:
            return 6;
        default:
            return 3;
    }
};

export const getHeadingTag = (headingLevel: SanityContentHeadingLevel): string => {
    return `h${headingLevel || 3}`;
};
