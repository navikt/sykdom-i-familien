import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { useIntl } from 'gatsby-plugin-intl';
import useActiveSections from '../../../hooks/useActiveSection';
import bemUtils from '../../../utils/bemUtils';
import { isBrowser } from '../../../utils/build';
import { Site } from '../../../utils/site';
import FlexSticky from '../../layout/flex-sticky/FlexSticky';
import PageWrapper from '../page-wrapper/PageWrapper';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import useNavBreadcrumbs from '../../../hooks/useNavBreadcrumbs';
import './pageWithMenu.less';

export interface SectionMenuItem {
    label: string;
    slug: string;
}

interface Props {
    site: Site;
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
    site,
    pageTitle,
    pageMetadescription,
    showLanguageToggle,
    sectionMenuItems = [],
    menuFooter,
    header,
    slug,
    children,
}) => {
    const sectionIds = sectionMenuItems.map((section) => section.slug);
    const { locale } = useIntl();
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
    console.log(slug);

    useNavBreadcrumbs(site, pageTitle, slug, locale);

    return (
        <PageWrapper
            pageTitle={pageTitle}
            pageMetaDescription={pageMetadescription}
            showFrontpageLink={false}
            showLanguageToggle={showLanguageToggle}>
            {header && <div className={bem.element('header')}>{header}</div>}
            <div className={bem.classNames(bem.block, bem.modifierConditional('noSidebar', hasMenu === false))}>
                {hasMenu && !isBrowser && renderSidebar()}
                {hasMenu && isBrowser && (
                    <>
                        <MediaQuery minWidth={1072}>{renderSidebar()}</MediaQuery>
                        <MediaQuery maxWidth={1071}>
                            <aside className={bem.element('mobilMenu')} aria-label="Sideinnhold">
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
