import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { InjectedIntlProps } from 'gatsby-plugin-intl';
import bemUtils from '../../../utils/bemUtils';
import { getSiteTitle, Site } from '../../../utils/site';
import PageBannerCompact from '../frontpage/components/page-banner_compact/PageBannerCompact';
import PageWrapper from '../page-wrapper/PageWrapper';
import './customPage.less';

export interface SectionMenuItem {
    label: string;
    slug: string;
}

interface Props {
    site: Site;
    showLanguageToggle: boolean;
    pageTitle: string;
    pageMetadescription: string;
    menuFooter?: React.ReactNode;
    children: React.ReactNode;
    header?: React.ReactNode;
    slug: string;
}

const bem = bemUtils('customPage');

const CustomPage: React.FunctionComponent<Props & InjectedIntlProps> = ({
    site,
    pageTitle,
    pageMetadescription,
    showLanguageToggle,
    slug,
    children,
    intl,
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
        <PageWrapper
            pageTitle={pageTitle}
            pageMetaDescription={pageMetadescription}
            showFrontpageLink={false}
            showLanguageToggle={showLanguageToggle}>
            {
                <div className={bem.element('header')}>
                    <PageBannerCompact title={siteTitle} />
                </div>
            }
            <div className={bem.block}>
                <article className={bem.element('article')}>{children}</article>
            </div>
        </PageWrapper>
    );
};

export default CustomPage;
