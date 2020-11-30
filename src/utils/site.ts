import { Locale } from '../i18n/locale';

export enum Site {
    sykdomIFamilien = 'sykdom-i-familien',
    arbeidsgiver = 'arbeidsgiver',
    samarbeid = 'samarbeid',
}

export const sites = {
    [Site.sykdomIFamilien]: {
        key: 'sykdom-i-familien',
        path: '/',
        context: 'privatperson',
        breadcrumbs: [
            {
                url: 'https://www.nav.no/familie/sykdom-i-familien/',
                title: 'Sykdom i familien',
            },
        ],
    },
    [Site.arbeidsgiver]: {
        key: 'arbeidsgiver',
        path: '/arbeidsgiver',
        context: 'arbeidsgiver',
        breadcrumbs: [
            {
                url: 'https://www.nav.no/familie/sykdom-i-familien/arbeidsgiver',
                title: 'Sykdom i familien',
            },
        ],
    },
    [Site.samarbeid]: {
        key: 'samarbeid',
        path: '/samarbeidspartner',
        context: 'samarbeidspartner',
        breadcrumbs: [
            {
                url: 'https://www.nav.no/',
                title: 'nav.no',
            },
        ],
    },
};

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

export const getFrontpageUrlForSite = (site: Site, locale: string = 'nb'): string => {
    return `/${locale}${sites[site].path}`;
};
