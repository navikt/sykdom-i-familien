import React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Link } from 'gatsby-plugin-intl';
import SiteTitle from '../../page-wrapper/components/global-page-header/site-title/SiteTitle';

interface Props {}

const SiteLink: React.FunctionComponent<Props> = (props) => (
    <div className="breadcrumbs">
        <div aria-hidden={true}>
            <NavFrontendChevron type="venstre" />
        </div>
        <Link to="/">
            <SiteTitle />
        </Link>
    </div>
);

export default SiteLink;
