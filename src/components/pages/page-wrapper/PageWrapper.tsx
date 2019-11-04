import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { changeLocale, injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../../i18n/locale';
import { Normaltekst } from 'nav-frontend-typografi';
import { RouterProps } from '@reach/router';
import LanguageToggle from './components/language-toggle/LanguageToggle';
import './pageWrapper.less';
import { getSiteTitle } from '../../../utils/site';

interface Props {
    pageTitle?: string;
}

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
            <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
            {children}
        </Normaltekst>
    );
};

export default injectIntl(PageWrapper);
