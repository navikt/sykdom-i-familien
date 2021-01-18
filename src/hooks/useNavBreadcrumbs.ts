import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { isBrowser } from '../utils/build';
import { getFrontpageUrlForSite, getPageUrl, getSiteCrumbs, Site } from '../utils/site';

const useNavBreadcrumbs = (site: Site, pageTitle: string, slug: string, locale: string) => {
    useEffect(() => {
        if (isBrowser) {
            const url = getFrontpageUrlForSite(site, locale);
            const siteCrumbs = getSiteCrumbs(site);

            const crumbs = [
                ...siteCrumbs,
                { title: 'Sykdom i familien', url },
                { title: pageTitle, url: getPageUrl(slug, locale, site) },
            ];
            setBreadcrumbs(crumbs);
        }
    }, [site, pageTitle, slug, locale]);
};

export default useNavBreadcrumbs;
