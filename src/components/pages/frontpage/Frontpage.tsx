import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { RouterProps } from '@reach/router';
import PageWrapper from '../page-wrapper/PageWrapper';
import bemUtils from '../../../utils/bemUtils';

import './frontpage.less';

interface Props {
    pageTitle: string;
    pageMetaDescription: string;
    header?: React.ReactNode;
    menu?: React.ReactNode;
}

const bem = bemUtils('frontpage');

const Frontpage: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({
    children,
    pageTitle,
    pageMetaDescription,
    header
}) => {
    return (
        <PageWrapper pageTitle={pageTitle} pageMetaDescription={pageMetaDescription}>
            <div className={bem.block}>
                {header && <>{header}</>}
                <div className={bem.element('content')}>
                    <article>{children}</article>
                </div>
            </div>
        </PageWrapper>
    );
};

export default injectIntl(Frontpage);
