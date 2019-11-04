import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { changeLocale, injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../../i18n/locale';
import { Normaltekst } from 'nav-frontend-typografi';
import { RouterProps } from '@reach/router';
import LanguageToggle from './components/language-toggle/LanguageToggle';
import './pageWrapper.less';

interface Props {
    title?: string;
}

const PageWrapper: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    title: pageTitle,
    children,
    intl
}) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <Normaltekst tag="div">
            <Helmet encodeSpecialCharacters={false} htmlAttributes={{ lang: `${intl.locale}-NO` }}>
                <meta charSet="utf-8" />
                <title>{pageTitle || data.site.siteMetadata.title}</title>
            </Helmet>
            <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
            {children}
        </Normaltekst>
    );
};

export default injectIntl(PageWrapper);
