import React, { useState } from 'react';
import { MenuItem } from '../PageWithMenu';
import bemUtils from '../../../../utils/bemUtils';
import Lenke from 'nav-frontend-lenker';
import MobileMenuHeader from './MobileMenuHeader';

import './mobileMenu.less';

interface Props {
    items: MenuItem[];
    footer?: React.ReactNode;
}

const bem = bemUtils('mobileMenu');
const bemItem = bem.child('item');

const MobileMenu: React.FunctionComponent<Props> = ({ items, footer }) => {
    const [isOpen, toggleMenu] = useState<boolean>(false);
    const colDivider = items.length / 2;

    const closeInItemClicked = (evt: React.SyntheticEvent<HTMLElement>) => {
        const target = evt.target as HTMLElement;
        if (target.classList.contains('lenke')) {
            toggleMenu(false);
        }
    };

    return (
        <nav className={bem.block}>
            <MobileMenuHeader isOpen={isOpen} title={'Meny'} onClick={() => toggleMenu(!isOpen)} />
            {isOpen && (
                <>
                    <div className={bem.element('items')} onClick={closeInItemClicked}>
                        {items.map((item, index) => (
                            <div
                                key={item.slug}
                                className={bemItem.classNames(
                                    bemItem.block,
                                    bemItem.modifierConditional('col2', index > colDivider)
                                )}>
                                <Lenke href={`#${item.slug}`}>{item.label}</Lenke>
                            </div>
                        ))}
                    </div>
                    {footer && <div className={bem.element('footer')}>{footer}</div>}
                </>
            )}
        </nav>
    );
};

export default MobileMenu;
