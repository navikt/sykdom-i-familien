import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { RouterProps } from '@reach/router';
import PageWrapper from '../page-wrapper/PageWrapper';
import bemUtils from '../../../utils/bemUtils';

import './frontpage.less';

interface Props {
    showLanguageToggle: boolean;
    pageTitle: string;
    pageMetaDescription: string;
    header?: React.ReactNode;
    menu?: React.ReactNode;
    useWhiteBackground: boolean;
}

const bem = bemUtils('frontpage');

const Frontpage: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    children,
    showLanguageToggle,
    pageTitle,
    pageMetaDescription,
    header,
    useWhiteBackground,
}) => {
    return (
        <PageWrapper
            pageTitle={pageTitle}
            pageMetaDescription={pageMetaDescription}
            showLanguageToggle={showLanguageToggle}>
            <div className={bem.classNames(bem.block, bem.modifierConditional('whiteBkg', useWhiteBackground))}>
                {header && <>{header}</>}
                <div className={bem.element('content')}>
                    <article>{children}</article>
                </div>
            </div>
        </PageWrapper>
    );
};

export default injectIntl(Frontpage);
