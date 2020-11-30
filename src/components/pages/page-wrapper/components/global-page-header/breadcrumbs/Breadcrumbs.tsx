import React from 'react';
import { Link, useIntl } from 'gatsby-plugin-intl';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lenke from 'nav-frontend-lenker';
import useWindowSize from '../../../../../../hooks/useWindowSize';
import bemUtils from '../../../../../../utils/bemUtils';
import { getFrontpageUrlForSite, getSiteTitleForSite, Site, sites } from '../../../../../../utils/site';
import SiteTitle from '../site-title/SiteTitle';
import './breadcrumbs.less';

const cls = bemUtils('breadcrumbs');

interface OwnProps {
    site: Site;
    slug: string;
    title: string;
    locale: string;
}

type Props = OwnProps;

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { title, site } = props;
    const frontpageUrl = getFrontpageUrlForSite(site, props.locale);

    const crumbs: React.ReactNode[] = [];
    if (width && width < 576) {
        crumbs.push(
            <div key="chevron" aria-hidden={true}>
                <NavFrontendChevron type="venstre" />
            </div>
        );
        crumbs.push(
            <div key="tilbake-mobile" className={cls.element('item')}>
                <Link to={frontpageUrl} title="Gå til forrige side">
                    <SiteTitle />
                </Link>
            </div>
        );
    } else {
        if (site && site !== Site.sykdomIFamilien) {
            crumbs.push(
                <div key="lenke_nav" className={cls.element('item')}>
                    <Lenke href="https://www.nav.no/" title="Gå til NAV.no">
                        nav.no
                    </Lenke>
                </div>
            );
            crumbs.push(
                <div key={`chevron_nav`} aria-hidden={true}>
                    <NavFrontendChevron type="høyre" />
                </div>
            );
            crumbs.push(
                <div key="lenke_område" className={cls.element('item')}>
                    <Lenke href="https://www.nav.no/no/bedrift">Arbeidsgiver</Lenke>
                </div>
            );
            crumbs.push(
                <div key={`chevron_område`} aria-hidden={true}>
                    <NavFrontendChevron type="høyre" />
                </div>
            );
            crumbs.push(
                <div key="tilbake" className={cls.element('item')}>
                    <Link to={`/${site}/`}>{getSiteTitleForSite(site)}</Link>
                </div>
            );
        } else {
            crumbs.push(
                <div key="tilbake" className={cls.element('item')}>
                    <Link to={frontpageUrl}>
                        <SiteTitle />
                    </Link>
                </div>
            );
        }
        crumbs.push(
            <div key={`chevron_site_page`} aria-hidden={true}>
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

export default Breadcrumbs;
