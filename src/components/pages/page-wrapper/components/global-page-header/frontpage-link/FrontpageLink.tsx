import React from 'react';
import bemUtils from '../../../../../../utils/bemUtils';
import useWindowSize from '../../../../../../hooks/useWindowSize';
import { InjectedIntlProps, injectIntl, FormattedMessage, Link } from 'gatsby-plugin-intl';
import { useStaticQuery, graphql } from 'gatsby';
import { getSiteTitle } from '../../../../../../utils/site';
import NavFrontendChevron from 'nav-frontend-chevron';
import './breadcrumbs.less';

const cls = bemUtils('breadcrumbs');

interface OwnProps {
    slug: string;
    title: string;
}

type Props = OwnProps;

const Breadcrumbs = (props: Props & InjectedIntlProps) => {
    const { width } = useWindowSize();
    const { title, intl } = props;
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
    const frontpageUrl = `/`;

    const crumbs: React.ReactNode[] = [];
    if (width && width < 576) {
        crumbs.push(
            <div key="chevron" aria-hidden={true}>
                <NavFrontendChevron type="venstre" />
            </div>
        );
        crumbs.push(
            <div key="tilbake" className={cls.element('item')}>
                <Link to={frontpageUrl} title="Gå til forrige side">
                    <FormattedMessage id="breadcrumbs.tilbake" />
                </Link>
            </div>
        );
    } else {
        crumbs.push(
            <div key="tilbake" className={cls.element('item')}>
                <Link to={frontpageUrl} title="Gå til forrige side">
                    {siteTitle}
                </Link>
            </div>
        );
        crumbs.push(
            <div key={`chevron_page`} aria-hidden={true}>
                <NavFrontendChevron type="høyre" />
            </div>
        );
        crumbs.push(<div key={`currentPage`}>{title}</div>);
    }
    return (
        <nav aria-label="Du er her" className={cls.block}>
            {crumbs}
        </nav>
    );
};

export default injectIntl(Breadcrumbs);
