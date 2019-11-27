import React, { useState } from 'react';
import { SectionMenuItem } from '../PageWithMenu';
import bemUtils from '../../../../utils/bemUtils';
import MobileMenuHeader from './MobileMenuHeader';
import SectionLinks from '../section-links/SectionLinks';

import './mobileMenu.less';

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

    const getTitle = (): string | undefined => {
        const item = items.find((i) => i.slug === activeSectionSlug);
        return item ? item.label : undefined;
    };

    const title = getTitle();

    return (
        <nav className={bem.classNames(bem.block, bem.modifierConditional('hidden', activeSectionSlug === undefined))}>
            <MobileMenuHeader
                isOpen={isOpen}
                pageTitle={pageTitle}
                title={title || 'Velg seksjon'}
                onClick={() => toggleMenu(!isOpen)}
            />
            {isOpen && (
                <>
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
