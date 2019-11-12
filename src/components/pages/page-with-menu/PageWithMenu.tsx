import React, { useState, useRef } from 'react';
import MediaQuery from 'react-responsive';
import bemUtils from '../../../utils/bemUtils';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import { RouterProps } from '@reach/router';
import Breadcrumbs from '../page-wrapper/components/breadcrumbs/Breadcrumbs';
import PageWrapper from '../page-wrapper/PageWrapper';
import { isBrowser } from '../../../utils/build';
import useActiveSections from '../../../hooks/useActiveSection';
import useScrollPosition, { ScrollPositionChangeEvent } from '../../../hooks/useScrollPosition';
import './pageWithMenu.less';
import useWindowSize from '../../../hooks/useWindowSize';

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

enum Direction {
    'up' = 'up',
    'down' = 'down'
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

    // useWindowSize((size) => {
    //     console.log(size);
    // });

    useActiveSections(
        sectionIds,
        (slug: any) => {
            setActiceSectionSlug(slug);
        },
        -64
    );

    return (
        <PageWrapper pageTitle={pageTitle}>
            {header && <div className={bem.element('header')}>{header}</div>}
            <div className={bem.block}>
                <MediaQuery minWidth={1072}>
                    <div className={bem.element('sidebar')} ref={sidebarContainer}>
                        <div
                            className={bem.element('sidebarSticky')}
                            ref={sidebarMenu}
                            style={scrollInfo ? { top: scrollInfo.y * -1, position: 'sticky' } : undefined}>
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
