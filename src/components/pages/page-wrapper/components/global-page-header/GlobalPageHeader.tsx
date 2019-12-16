import React from 'react';
import ScreenOnly from '../../../../elements/screen-only/ScreenOnly';
import LanguageToggle from './language-toggle/LanguageToggle';
import { changeLocale, injectIntl, InjectedIntlProps, Link } from 'gatsby-plugin-intl';
import bemUtils from '../../../../../utils/bemUtils';
import { Locale } from '../../../../../i18n/locale';
import { getSiteTitle } from '../../../../../utils/site';
import { useStaticQuery, graphql } from 'gatsby';
import PageContentWrapper from '../../../../elements/page-content-wrapper/PageContentWrapper';

import './globalPageHeader.less';

interface Props {
    showFrontpageLink?: boolean;
}

const bem = bemUtils('globalPageHeader');

const showLanguageToggle = process.env.GATSBY_LANGUAGE_TOGGLE === 'true';

const GlobalPageHeader: React.FunctionComponent<Props & InjectedIntlProps> = ({ intl, showFrontpageLink }) => {
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
    const frontpageUrl = `/`;

    if (!showLanguageToggle && !showFrontpageLink) {
        return null;
    }
    return (
        <ScreenOnly>
            <div className={bem.block}>
                <PageContentWrapper className={bem.element('content')}>
                    <div className={bem.element('sitelink')}>
                        {showFrontpageLink && (
                            <Link to={frontpageUrl} title="Gå til forsiden">
                                {siteTitle}
                            </Link>
                        )}
                    </div>
                    {showLanguageToggle && (
                        <div className={bem.element('language')}>
                            <LanguageToggle locale={intl.locale as Locale} toggle={(locale) => changeLocale(locale)} />
                        </div>
                    )}
                </PageContentWrapper>
            </div>
        </ScreenOnly>
    );
};

export default injectIntl(GlobalPageHeader);
