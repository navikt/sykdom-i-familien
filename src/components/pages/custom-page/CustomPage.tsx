import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import Breadcrumbs from '../page-wrapper/components/global-page-header/breadcrumbs/Breadcrumbs';
import PageWrapper from '../page-wrapper/PageWrapper';
import './customPage.less';

export interface SectionMenuItem {
    label: string;
    slug: string;
}

interface Props {
    showLanguageToggle: boolean;
    pageTitle: string;
    pageMetadescription: string;
    menuFooter?: React.ReactNode;
    children: React.ReactNode;
    header?: React.ReactNode;
    slug: string;
    showBreadcrumbs?: boolean;
}

const bem = bemUtils('customPage');

const CustomPage: React.FunctionComponent<Props> = ({
    pageTitle,
    pageMetadescription,
    showLanguageToggle,
    header,
    slug,
    children,
    showBreadcrumbs = true
}) => {
    return (
        <PageWrapper
            pageTitle={pageTitle}
            pageMetaDescription={pageMetadescription}
            showFrontpageLink={false}
            showLanguageToggle={showLanguageToggle}>
            {header && <div className={bem.element('header')}>{header}</div>}
            {showBreadcrumbs && (
                <div className={bem.element('breadcrumbs')}>
                    <Breadcrumbs slug={slug} title={pageTitle} />
                </div>
            )}
            <div className={bem.block}>
                <article className={bem.element('article')}>{children}</article>
            </div>
        </PageWrapper>
    );
};

export default CustomPage;
