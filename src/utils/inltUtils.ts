import { InjectedIntl, MessageValue } from 'gatsby-plugin-intl';
import { Locale, defaultLocale } from '../i18n/locale';

const intlHelper = (intl: InjectedIntl, id: string, value?: { [key: string]: MessageValue }): string =>
    intl.formatMessage({ id }, value);

export const getLocale = (intl: InjectedIntl): Locale => (intl ? (intl.locale as Locale) : defaultLocale);

export default intlHelper;
