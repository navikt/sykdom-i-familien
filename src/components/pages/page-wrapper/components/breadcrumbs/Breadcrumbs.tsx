import React, { ReactNodeArray } from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import TypografiBase from 'nav-frontend-typografi';
import bemUtils from '../../../../../utils/bemUtils';
import useWindowSize from '../../../../../hooks/useWindowSize';
import { Link, FormattedMessage, InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { getSiteTitle } from '../../../../../utils/site';

import './breadcrumbs.less';

const cls = bemUtils('breadcrumbs');

const parsePath = (path: string) => {
    const parts = path.split('/');

    // Remove any trailing slash ("/")
    if (parts.length > 1 && parts[parts.length - 1] === '') {
        parts.pop();
    }

    parts.shift(); // Remove language

    return parts.map((part, index) => {
        const recombinedParts = parts.slice(0, index + 1);
        const url = recombinedParts.length === 1 ? '/' : recombinedParts.join('/');

        return {
            url,
            label: `route.${part}`
        };
    });
};

interface OwnProps {
    path: string;
    currentPageTitle: string;
}

type Props = OwnProps;

const Breadcrumbs = (props: Props & InjectedIntlProps) => {
    const { width } = useWindowSize();
    const { path, currentPageTitle, intl } = props;
    const siteMetadata = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title_nb
                    title_nn
                }
            }
        }
    `);
    const siteTitle = getSiteTitle(siteMetadata, intl.locale);
    const breadcrumbChain: ReactNodeArray = [];
    const parsedPath = parsePath(path);

    if (width && width < 576) {
        const routeLength = parsedPath.length;
        const lastUrl = parsedPath[routeLength - 2].url;

        breadcrumbChain.push(
            <div key="chevron" aria-hidden={true}>
                <NavFrontendChevron type="venstre" />
            </div>
        );

        breadcrumbChain.push(
            <TypografiBase
                aria-label="Gå til forrige side"
                key="tilbake"
                type="normaltekst"
                className={cls.element('item')}>
                <Link to={lastUrl}>
                    <FormattedMessage id="breadcrumbs.tilbake" />
                </Link>
            </TypografiBase>
        );
    } else {
        parsedPath.forEach((part, index) => {
            if (index !== 0) {
                breadcrumbChain.push(
                    <div key={`chevron${index}`} aria-hidden={true}>
                        <NavFrontendChevron type="høyre" />
                    </div>
                );
            }

            const current = index === parsedPath.length - 1;
            breadcrumbChain.push(
                <TypografiBase
                    aria-label={current ? 'Denne siden' : 'Tidligere side'}
                    key={`crumb${index}`}
                    type="normaltekst"
                    className={classNames(cls.element('item'), {
                        [cls.element('current')]: current
                    })}>
                    {current ? (
                        currentPageTitle
                    ) : (
                        <Link to={part.url}>{index === 0 ? siteTitle : <FormattedMessage id={part.label} />}</Link>
                    )}
                </TypografiBase>
            );
        });
    }

    return (
        <nav aria-label="Du er her" className={cls.block}>
            {breadcrumbChain}
        </nav>
    );
};

export default injectIntl(Breadcrumbs);
