import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import { getSiteTitle } from '../../../../../../utils/site';

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
