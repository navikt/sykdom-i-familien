import React from 'react';
import { useIntl } from 'gatsby-plugin-intl';
import { HoyreChevron } from 'nav-frontend-chevron';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import { SanityContentHeadingLevel } from '../../../../../sanity/types';
import { getHeadingLevelForChild, getHeadingTag } from '../../../../../sanity/utils';
import bemUtils from '../../../../../utils/bemUtils';
import { getPageUrl, Site } from '../../../../../utils/site';
import './linkPanel.less';

type LinkPanelLayout = 'frontpageImageAbove' | 'wideWithImage' | 'plain';

interface Props {
    image?: React.ReactNode;
    title: string;
    site: Site;
    url: {
        url: string;
        isPageSlug: boolean;
    };
    layout?: LinkPanelLayout;
    headingLevel?: SanityContentHeadingLevel;
}

const bem = bemUtils('linkPanel');

const LinkPanel: React.FunctionComponent<Props> = ({
    title,
    url,
    site,
    image,
    layout = 'frontpageImageAbove',
    children,
    headingLevel = 2,
}) => {
    const { locale } = useIntl();
    const includeChevron = layout === 'plain' || layout === 'wideWithImage';
    const titleHeadingLevel = getHeadingLevelForChild(headingLevel);
    const customContent = (
        <>
            {image && <div className={bem.element('image')}>{image}</div>}
            <div className={bem.element('content')}>
                <Undertittel tag={getHeadingTag(titleHeadingLevel)} className={bem.element('title')}>
                    {title}
                </Undertittel>
                <div>{children}</div>
            </div>
            {includeChevron && (
                <div className={bem.element('chevron')}>
                    <HoyreChevron />
                </div>
            )}
        </>
    );
    return site === Site.sykdomIFamilien ? (
        <div className={bem.block}>
            {url.isPageSlug ? (
                <a tabIndex={0} href={getPageUrl(url.url, locale, site)} style={{ display: 'block' }}>
                    {customContent}
                </a>
            ) : (
                <a href={url.url} rel="noopener">
                    {customContent}
                </a>
            )}
        </div>
    ) : (
        <LenkepanelBase border={true} href={url.isPageSlug ? getPageUrl(url.url, locale, site) : url.url}>
            <div className={bem.classNames('frontpageLenkepanel')}>
                {image && <div className="frontpageLenkepanel__image">{image}</div>}
                <Undertittel
                    tag={getHeadingTag(titleHeadingLevel)}
                    className="frontpageLenkepanel__title lenkepanel__heading">
                    {title}
                </Undertittel>
                {children && <p>{children}</p>}
            </div>
        </LenkepanelBase>
    );
};

export default LinkPanel;
