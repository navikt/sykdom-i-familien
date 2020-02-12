import { StringBlockValue } from '../parts';
import { defaultLocale } from '../../../i18n/locale';

export interface LocaleStringObject {
    nb: string;
    nn?: string;
}

export interface LocaleSimpleTextObject {
    nb: string;
    nn?: string;
}

export interface LocaleRichTextObject {
    nb: StringBlockValue;
    nn?: StringBlockValue;
}

export type LocaleObject = LocaleStringObject | LocaleRichTextObject | LocaleSimpleTextObject;

export const isValidLocaleObject = (obj: any): obj is LocaleObject =>
    obj !== undefined && obj[defaultLocale] !== undefined;

export const isValidLocaleStringObject = (obj: any): obj is LocaleStringObject =>
    obj !== undefined && obj[defaultLocale] !== undefined && typeof obj[defaultLocale] === 'string';
