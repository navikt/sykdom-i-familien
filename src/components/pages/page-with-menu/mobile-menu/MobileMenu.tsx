import React, { useState } from 'react';
import { SectionMenuItem } from '../PageWithMenu';
import bemUtils from '../../../../utils/bemUtils';
import MobileMenuHeader from './MobileMenuHeader';
import SectionLinks from '../section-links/SectionLinks';
import SiteLink from '../site-link/SiteLink';

import './mobileMenu.less';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    pageTitle: string;
    items: SectionMenuItem[];
    activeSectionSlug?: string;
    footer?: React.ReactNode;
}

const bem = bemUtils('mobileMenu');

const MobileMenu: React.FunctionComponent<Props> = ({ items, pageTitle, activeSectionSlug, footer }) => {
    const [isOpen, toggleMenu] = useState<boolean>(false);

    const closeInItemClicked = (evt: React.SyntheticEvent<HTMLElement>) => {
        const target = evt.target as HTMLElement;
        if (target.classList.contains('lenke')) {
            toggleMenu(false);
        }
    };

    return (
        <nav className={bem.classNames(bem.block, bem.modifierConditional('hidden', activeSectionSlug === undefined))}>
            <MobileMenuHeader
                isOpen={isOpen}
                pageTitle={pageTitle}
                items={items}
                activeSectionSlug={activeSectionSlug}
                onClick={() => toggleMenu(!isOpen)}
            />
            {isOpen && (
                <>
                    <div className={bem.element('pageTitle')}>
                        <SiteLink />
                    </div>
                    <Undertittel className={bem.element('itemsHeader')}>Velg seksjon</Undertittel>
                    <div className={bem.element('items')} onClick={closeInItemClicked}>
                        <SectionLinks items={items} activeSectionSlug={activeSectionSlug} columns={2} />
                    </div>
                    {footer && <div className={bem.element('footer')}>{footer}</div>}
                </>
            )}
        </nav>
    );
};

export default MobileMenu;
