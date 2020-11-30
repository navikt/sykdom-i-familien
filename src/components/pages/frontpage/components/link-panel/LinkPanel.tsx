import React from 'react';
import { Link, useIntl } from 'gatsby-plugin-intl';
import { HoyreChevron } from 'nav-frontend-chevron';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../../../../utils/bemUtils';
import { Site, sites } from '../../../../../utils/site';
import './linkPanel.less';
import { Locale } from '../../../../../i18n/locale';

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

export const getPageUrl = (url: string, locale: string, site?: Site): string => {
    return site && site !== Site.sykdomIFamilien ? `/${locale}${sites[site].path}${url}` : url;
};

const LinkPanel: React.FunctionComponent<Props> = ({
    title,
    url,
    site,
    image,
    layout = 'frontpageImageAbove',
    children,
}) => {
    const { locale } = useIntl();
    const includeChevron = layout === 'plain' || layout === 'wideWithImage';
    const customContent = (
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
    return site === Site.sykdomIFamilien ? (
        <div className={bem.block}>
            {url.isPageSlug ? (
                <Link tabIndex={0} to={getPageUrl(url.url, locale, site)}>
                    {customContent}
                </Link>
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
                <Undertittel className="frontpageLenkepanel__title">{title}</Undertittel>
                {children && <div>{children}</div>}
            </div>
        </LenkepanelBase>
    );
};

export default LinkPanel;
