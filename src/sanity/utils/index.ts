import {
    LocaleStringObject,
    LocaleObject,
    isValidLocaleObject,
    isValidLocaleStringObject
} from '../types/locale-objects';
import { defaultLocale, Locale } from '../../i18n/locale';
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

export const getOptionalLocaleString = (obj?: LocaleObject, locale?: Locale | string): string | undefined =>
    isValidLocaleStringObject(obj) ? getLocaleString(obj, locale) : undefined;

export const getLocaleBlockContent = (
    obj: LocaleObject | undefined,
    locale: Locale | string = defaultLocale
): BlockContentType => (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[defaultLocale] : []);
