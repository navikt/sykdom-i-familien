import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import LanguageToggle from '../language-toggle/LanguageToggle';
import { changeLocale, injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../i18n/locale';
import { Normaltekst } from 'nav-frontend-typografi';
import { RouterProps } from '@reach/router';

interface Props {
    title?: string;
}

import './page.less';

const Page: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
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
            <Helmet encodeSpecialCharacters={false}>
                <meta charSet="utf-8" />
                <title>{pageTitle || data.site.siteMetadata.title}</title>
            </Helmet>
            <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
            {children}
        </Normaltekst>
    );
};

export default injectIntl(Page);