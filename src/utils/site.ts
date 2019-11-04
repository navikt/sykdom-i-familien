import { Locale } from '../i18n/locale';

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
        ...data.site.siteMetadata
    };
};

export const getSiteTitle = (data: SiteMetaGraphQLMetadata, locale: Locale | string): string => {
    const metadata = getSiteTitles(data);
    return metadata[`title_${locale}`];
};
