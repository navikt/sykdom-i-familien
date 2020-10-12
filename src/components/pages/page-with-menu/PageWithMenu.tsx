import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import useActiveSections from '../../../hooks/useActiveSection';
import bemUtils from '../../../utils/bemUtils';
import { isBrowser } from '../../../utils/build';
import FlexSticky from '../../layout/flex-sticky/FlexSticky';
import Breadcrumbs from '../page-wrapper/components/global-page-header/breadcrumbs/Breadcrumbs';
import PageWrapper from '../page-wrapper/PageWrapper';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import './pageWithMenu.less';

export interface SectionMenuItem {
    label: string;
    slug: string;
}

interface Props {
    showLanguageToggle: boolean;
    pageTitle: string;
    pageMetadescription: string;
    sectionMenuItems?: SectionMenuItem[];
    menuFooter?: React.ReactNode;
    children: React.ReactNode;
    header?: React.ReactNode;
    slug: string;
    showBreadcrumbs?: boolean;
}

const bem = bemUtils('pageWithMenu');

const PageWithMenu: React.FunctionComponent<Props> = ({
    pageTitle,
    pageMetadescription,
    showLanguageToggle,
    sectionMenuItems = [],
    menuFooter,
    header,
    slug,
    children,
    showBreadcrumbs = true
}) => {
    const sectionIds = sectionMenuItems.map((section) => section.slug);
    const [activSectionSlug, setActiceSectionSlug] = useState<string | undefined>(undefined);

    useActiveSections(
        sectionIds,
        (s: any) => {
            setActiceSectionSlug(s);
        },
        -64
    );

    const renderSidebar = () => (
        <div className={bem.element('sidebar')}>
            <FlexSticky>
                <SidebarMenu items={sectionMenuItems} activeSectionSlug={activSectionSlug} footer={menuFooter} />
            </FlexSticky>
        </div>
    );

    const hasMenu = sectionMenuItems.length > 0;

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
            <div className={bem.classNames(bem.block, bem.modifierConditional('noSidebar', hasMenu === false))}>
                {hasMenu && !isBrowser && renderSidebar()}
                {hasMenu && isBrowser && (
                    <>
                        <MediaQuery minWidth={1072}>{renderSidebar()}</MediaQuery>
                        <MediaQuery maxWidth={1071}>
                            <aside className={bem.element('mobilMenu')}>
                                <MobileMenu
                                    pageTitle={pageTitle}
                                    items={sectionMenuItems}
                                    activeSectionSlug={activSectionSlug}
                                    footer={menuFooter}
                                />
                            </aside>
                        </MediaQuery>
                    </>
                )}
                <article className={bem.element('article')}>{children}</article>
            </div>
        </PageWrapper>
    );
};

export default PageWithMenu;
