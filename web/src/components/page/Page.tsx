import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import LanguageToggle from '../language-toggle/LanguageToggle';
import { changeLocale, injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../types/locale';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { RouterProps } from '@reach/router';
import Box from '../box/Box';

interface Props {
    header?: React.ReactNode;
    menu?: React.ReactNode;
}

const PageContent = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    padding: 2rem 2rem 4rem 2rem;
`;

import './page.less';

const Page: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    children,
    header,
    menu,
    intl,
    location
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
                <title>{data.site.siteMetadata.title}</title>
            </Helmet>
            <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
            {header && <>{header}</>}
            <PageContent>
                <Box padBottom="xl" className="breadcrumbs">
                    {location && <Breadcrumbs path={location.pathname} />}
                </Box>

                {menu ? (
                    <div className="pageWithMenu">
                        <aside className="pageWithMenu__sidebar">{menu}</aside>
                        <article className="pageWithMenu__content">{children}</article>
                    </div>
                ) : (
                    <article>{children}</article>
                )}
            </PageContent>
        </Normaltekst>
    );
};

export default injectIntl(Page);
