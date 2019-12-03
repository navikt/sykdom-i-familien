import React from 'react';
import bemUtils from '../../../../utils/bemUtils';
import { Element } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import MenuItemsIndicator from '../menu-items-indicator/MenuItemsIndicator';
import { SectionMenuItem } from '../PageWithMenu';

interface Props {
    isOpen: boolean;
    pageTitle: string;
    items: SectionMenuItem[];
    activeSectionSlug?: string;
    onClick: () => void;
}

const bem = bemUtils('mobileMenu').child('header');

const MobileMenuHeader: React.FunctionComponent<Props> = ({ items, activeSectionSlug, pageTitle, isOpen, onClick }) => {
    return (
        <>
            <div className={bem.classNames(bem.block, bem.modifierConditional('expanded', isOpen))} onClick={onClick}>
                <div className={bem.element('title')}>
                    <Element className={bem.element('titleText')}>{pageTitle}</Element>
                    <div className={bem.element('indicator')}>
                        <MenuItemsIndicator items={items} activeSectionSlug={activeSectionSlug} />
                    </div>
                </div>
                <div className={bem.element('chevron')}>
                    <NavFrontendChevron stor={true} type={isOpen ? 'opp' : 'ned'} />
                </div>
            </div>
        </>
    );
};

export default MobileMenuHeader;
