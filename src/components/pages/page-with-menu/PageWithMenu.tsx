import React, { useState, useRef } from 'react';
import MediaQuery from 'react-responsive';
import bemUtils from '../../../utils/bemUtils';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import PageWrapper from '../page-wrapper/PageWrapper';
import useActiveSections from '../../../hooks/useActiveSection';
import useScrollPosition, { ScrollPositionChangeEvent } from '../../../hooks/useScrollPosition';

import './pageWithMenu.less';
import { isBrowser } from '../../../utils/build';
import Breadcrumbs from '../page-wrapper/components/global-page-header/breadcrumbs/Breadcrumbs';

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
    slug: string;
    showBreadcrumbs?: boolean;
}

enum Direction {
    'up' = 'up',
    'down' = 'down'
}

const bem = bemUtils('pageWithMenu');

const PageWithMenu: React.FunctionComponent<Props> = ({
    pageTitle,
    sectionMenuItems,
    menuFooter,
    header,
    slug,
    children,
    showBreadcrumbs = true
}) => {
    const sectionIds = sectionMenuItems.map((section) => section.slug);
    const [activSectionSlug, setActiceSectionSlug] = useState<string | undefined>(undefined);
    const sidebarContainer = useRef<HTMLDivElement | null>(null);
    const sidebarMenu = useRef<HTMLDivElement | null>(null);

    const [scrollInfo, setScrollInfo] = useState<{ y: number; direction: Direction } | undefined>(undefined);

    useScrollPosition((pos: ScrollPositionChangeEvent) => {
        if (sidebarMenu && sidebarMenu.current && sidebarContainer && sidebarContainer.current) {
            const { offsetHeight } = sidebarMenu.current;
            const { top } = sidebarContainer.current.getBoundingClientRect();
            const availableHeight = window.innerHeight;
            const windowIsToSmall = availableHeight < offsetHeight;

            const direction: Direction = pos.currPos.y < pos.prevPos.y ? Direction.down : Direction.up;
            const changedDirection = scrollInfo === undefined || scrollInfo.direction !== direction;

            if (!changedDirection || windowIsToSmall === false) {
                return;
            }
            if (availableHeight < offsetHeight) {
                const overflow = offsetHeight - availableHeight;
                const hasScrolledBy = top * -1 > overflow;
                if (hasScrolledBy && (scrollInfo === undefined || changedDirection)) {
                    setScrollInfo({ y: overflow, direction });
                } else if (scrollInfo !== undefined && !hasScrolledBy) {
                    setScrollInfo(undefined);
                }
            }
        }
    }, []);

    useActiveSections(
        sectionIds,
        (s: any) => {
            setActiceSectionSlug(s);
        },
        -64
    );

    const renderSidebar = () => (
        <div className={bem.element('sidebar')} ref={sidebarContainer}>
            <div
                className={bem.element('sidebarSticky')}
                ref={sidebarMenu}
                style={scrollInfo ? { top: scrollInfo.y * -1, position: 'sticky' } : undefined}>
                <SidebarMenu items={sectionMenuItems} activeSectionSlug={activSectionSlug} footer={menuFooter} />
            </div>
        </div>
    );

    return (
        <PageWrapper pageTitle={pageTitle} showFrontpageLink={false}>
            {header && <div className={bem.element('header')}>{header}</div>}
            {showBreadcrumbs && (
                <div className={bem.element('breadcrumbs')}>
                    <Breadcrumbs slug={slug} title={pageTitle} />
                </div>
            )}
            <div className={bem.block}>
                {!isBrowser && renderSidebar()}
                {isBrowser && (
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
