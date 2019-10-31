import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { RouterProps } from '@reach/router';
import PageWrapper from '../page-wrapper/PageWrapper';

interface Props {
    header?: React.ReactNode;
    menu?: React.ReactNode;
}

import './frontpage.less';
import bemUtils from '../../../utils/bemUtils';

const bem = bemUtils('frontpage');

const Frontpage: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({ children, header }) => {
    return (
        <PageWrapper>
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
