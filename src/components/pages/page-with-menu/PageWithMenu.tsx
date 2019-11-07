import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import bemUtils from '../../../utils/bemUtils';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import { RouterProps } from '@reach/router';
import Breadcrumbs from '../page-wrapper/components/breadcrumbs/Breadcrumbs';
import PageWrapper from '../page-wrapper/PageWrapper';
import { isBrowser } from '../../../utils/build';
import useActiveSections from '../../../hooks/useActiveSection';

import './pageWithMenu.less';

export interface SectionMenuItem {
    label: string;
    slug: string;
}

interface Props {
    pageTitle: string;
    sectionMenuItems: SectionMenuItem[];
    menuFooter?: React.ReactNode;
    children: React.ReactNode;
    header?: React.ReactNode;
}

const bem = bemUtils('pageWithMenu');

const PageWithMenu: React.FunctionComponent<Props & RouterProps> = ({
    pageTitle,
    sectionMenuItems,
    menuFooter,
    header,
    children
}) => {
    const sectionIds = sectionMenuItems.map((section) => section.slug);
    const [activSectionSlug, setActiceSectionSlug] = useState<string | undefined>(undefined);

    useActiveSections(
        sectionIds,
        (slug) => {
            setActiceSectionSlug(slug);
        },
        -64
    );

    return (
        <PageWrapper pageTitle={pageTitle}>
            {header && <div className={bem.element('header')}>{header}</div>}
            <div className={bem.block}>
                <MediaQuery minWidth={1072}>
                    <div className={bem.element('sidebar')}>
                        <div className={bem.element('sidebarSticky')}>
                            <SidebarMenu
                                items={sectionMenuItems}
                                activeSectionSlug={activSectionSlug}
                                footer={menuFooter}
                            />
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={1071}>
                    <aside className={bem.element('mobilMenu')}>
                        <MobileMenu items={sectionMenuItems} activeSectionSlug={activSectionSlug} footer={menuFooter} />
                    </aside>
                </MediaQuery>
                <div>
                    {isBrowser && (
                        <div className={bem.element('breadcrumbs')}>
                            <Breadcrumbs path={location.pathname} currentPageTitle={pageTitle} />
                        </div>
                    )}
                    <article className={bem.element('article')}>{children}</article>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PageWithMenu;
