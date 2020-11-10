import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Link } from 'gatsby-plugin-intl';
import bemUtils from '../../../../../utils/bemUtils';

import './linkPanel.less';
import { Site } from '../../../../../utils/site';

type LinkPanelLayout = 'frontpageImageAbove' | 'wideWithImage' | 'plain';

interface Props {
    image?: React.ReactNode;
    title: string;
    site?: Site;
    url: {
        url: string;
        isPageSlug: boolean;
    };
    layout?: LinkPanelLayout;
}

const bem = bemUtils('linkPanel');

const getPageUrl = (url: string, site?: Site): string => {
    return site && site !== Site.sykdomIFamilien ? `/${site}${url}` : url;
};

const LinkPanel: React.FunctionComponent<Props> = ({
    title,
    url,
    site,
    image,
    layout = 'frontpageImageAbove',
    children,
}) => {
    const includeChevron = layout === 'plain' || layout === 'wideWithImage';
    const content = (
        <>
            {image && <div className={bem.element('image')}>{image}</div>}
            <div className={bem.element('content')}>
                <Undertittel className={bem.element('title')}>{title}</Undertittel>
                <div>{children}</div>
            </div>
            {includeChevron && (
                <div className={bem.element('chevron')}>
                    <HoyreChevron />
                </div>
            )}
        </>
    );
    return (
        <div className={bem.block}>
            {url.isPageSlug ? (
                <Link tabIndex={0} to={getPageUrl(url.url, site)}>
                    {content}
                </Link>
            ) : (
                <a href={url.url} rel="noopener">
                    {content}
                </a>
            )}
        </div>
    );
};

export default LinkPanel;
