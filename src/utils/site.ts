import { Locale } from '../i18n/locale';

export enum Site {
    sykdomIFamilien = 'sykdom-i-familien',
    arbeidsgiver = 'arbeidsgiver',
    samarbeid = 'samarbeid',
}
interface SiteMetaGraphQLMetadata {
    site: {
        siteMetadata: {
            title_nb: string;
            title_nn: string;
        };
    };
}

export interface SiteMetadata {
    title_nb: string;
    title_nn: string;
}

export const getSiteTitles = (data: SiteMetaGraphQLMetadata): SiteMetadata => {
    return {
        ...data.site.siteMetadata,
    };
};

export const getSiteTitle = (data: SiteMetaGraphQLMetadata, locale: Locale | string): string => {
    const metadata = getSiteTitles(data);
    return metadata[`title_${locale}`];
};

export const getSiteTitleForSite = (site: Site) => {
    switch (site) {
        case Site.arbeidsgiver:
            return 'Sykdom i familien';
        case Site.samarbeid:
            return 'Sykdom i familien';
        default:
            return 'Sykdom i familien';
    }
};
