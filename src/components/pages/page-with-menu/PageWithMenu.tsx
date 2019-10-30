import React from 'react';
import MediaQuery from 'react-responsive';
import bemUtils from '../../../utils/bemUtils';
import MobileMenu from './mobile-menu/MobileMenu';
import SidebarMenu from './sidebar-menu/SidebarMenu';
import { RouterProps } from '@reach/router';
import Breadcrumbs from '../page-wrapper/components/breadcrumbs/Breadcrumbs';
import PageWrapper from '../page-wrapper/PageWrapper';
import { isBrowser } from '../../../utils/build';

import './pageWithMenu.less';

export interface MenuItem {
    label: string;
    slug: string;
}

interface Props {
    title: string;
    menuItems: MenuItem[];
    menuFooter?: React.ReactNode;
    children: React.ReactNode;
}

const bem = bemUtils('pageWithMenu');

const PageWithMenu: React.FunctionComponent<Props & RouterProps> = ({
    title: pageTitle,
    menuItems,
    menuFooter,
    children
}) => {
    return (
        <PageWrapper title={pageTitle}>
            <div className={bem.block}>
                <MediaQuery minWidth={1072}>
                    <div className={bem.element('sidebar')}>
                        <div className={bem.element('sidebarSticky')}>
                            <SidebarMenu items={menuItems} footer={menuFooter} />
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={1071}>
                    <aside className={bem.element('mobilMenu')}>
                        <MobileMenu items={menuItems} footer={menuFooter} />
                    </aside>
                </MediaQuery>
                <div>
                    {isBrowser() && (
                        <div className={bem.element('breadcrumbs')}>
                            <Breadcrumbs path={location.pathname} />
                        </div>
                    )}
                    <article className={bem.element('article')}>{children}</article>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PageWithMenu;
