import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { getSiteTitle } from '../../../../../../utils/site';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';

const SiteTitle: React.FunctionComponent<InjectedIntlProps> = ({ intl }) => {
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

    return <span>{siteTitle}</span>;
};

export default injectIntl(SiteTitle);
