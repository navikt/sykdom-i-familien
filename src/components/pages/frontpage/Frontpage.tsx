import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import { RouterProps } from '@reach/router';

interface Props {
    header?: React.ReactNode;
    menu?: React.ReactNode;
}

const PageContent = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    padding: 2rem 2rem 4rem 2rem;
`;

import './frontpage.less';
import PageWrapper from '../page-wrapper/PageWrapper';

const Frontpage: React.FunctionComponent<Props & InjectedIntlProps & RouterProps> = ({ children, header }) => {
    return (
        <PageWrapper>
            {header && <>{header}</>}
            <PageContent>
                <article>{children}</article>
            </PageContent>
        </PageWrapper>
    );
};

export default injectIntl(Frontpage);
