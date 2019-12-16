import React from 'react';
import Helmet from 'react-helmet';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { RouterProps } from '@reach/router';
import GlobalPageHeader from './components/global-page-header/GlobalPageHeader';
import '../../../styles/main.less';

interface Props {
    showLanguageToggle: boolean;
    pageTitle: string;
    pageMetaDescription: string;
    showFrontpageLink?: boolean;
}

const PageWrapper: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    showLanguageToggle,
    pageTitle,
    pageMetaDescription,
    children,
    showFrontpageLink,
    intl
}) => {
    return (
        <Normaltekst tag="div">
            <Helmet encodeSpecialCharacters={false} htmlAttributes={{ lang: `${intl.locale}-NO` }}>
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
                <meta name="description" content={pageMetaDescription} />
            </Helmet>
            <GlobalPageHeader showFrontpageLink={showFrontpageLink} showLanguageToggle={showLanguageToggle} />
            {children}
        </Normaltekst>
    );
};

export default injectIntl(PageWrapper);
