import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { changeLocale, injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../../i18n/locale';
import { Normaltekst } from 'nav-frontend-typografi';
import { RouterProps } from '@reach/router';
import LanguageToggle from './components/language-toggle/LanguageToggle';
import { getSiteTitle } from '../../../utils/site';
import ScreenOnly from '../../elements/screen-only/ScreenOnly';

import '../../../styles/main.less';

interface Props {
    pageTitle?: string;
}

const toggleLanguageAvailable = true;

const PageWrapper: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    pageTitle,
    children,
    intl
}) => {
    const siteMetadata = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title_nb
                    title_nn
                }
            }
        }
    `);
    const siteTitle = getSiteTitle(siteMetadata, intl.locale);
    return (
        <Normaltekst tag="div">
            <Helmet encodeSpecialCharacters={false} htmlAttributes={{ lang: `${intl.locale}-NO` }}>
                <meta charSet="utf-8" />
                <title>{pageTitle || siteTitle}</title>
            </Helmet>
            {toggleLanguageAvailable && (
                <ScreenOnly>
                    <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
                </ScreenOnly>
            )}
            {children}
        </Normaltekst>
    );
};

export default injectIntl(PageWrapper);
