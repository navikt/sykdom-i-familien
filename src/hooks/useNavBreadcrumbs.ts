import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { isBrowser } from '../utils/build';
import { getFrontpageUrlForSite, Site } from '../utils/site';

const useNavBreadcrumbs = (site: Site, pageTitle: string, slug: string, locale: string) => {
    useEffect(() => {
        if (isBrowser) {
            const url = getFrontpageUrlForSite(site, locale);
            console.log(url, site);

            setBreadcrumbs([
                { title: 'Sykdom i familien', url },
                { title: pageTitle, url: slug },
            ]);
        }
    }, [site, pageTitle, slug, locale]);
};

export default useNavBreadcrumbs;
