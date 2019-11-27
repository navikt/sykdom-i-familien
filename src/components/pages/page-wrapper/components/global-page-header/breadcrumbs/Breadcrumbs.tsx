import React from 'react';
import bemUtils from '../../../../../../utils/bemUtils';
import useWindowSize from '../../../../../../hooks/useWindowSize';
import { Link } from 'gatsby-plugin-intl';
import NavFrontendChevron from 'nav-frontend-chevron';
import SiteTitle from '../site-title/SiteTitle';
import './breadcrumbs.less';

const cls = bemUtils('breadcrumbs');

interface OwnProps {
    slug: string;
    title: string;
}

type Props = OwnProps;

const Breadcrumbs = (props: Props) => {
    const { width } = useWindowSize();
    const { title } = props;
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
                    <SiteTitle />
                </Link>
            </div>
        );
    } else {
        crumbs.push(
            <div key="tilbake" className={cls.element('item')}>
                <Link to={frontpageUrl} title="Gå til forrige side">
                    <SiteTitle />
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

export default Breadcrumbs;
