import React from 'react';
import bemUtils from '../../../../utils/bemUtils';
import './menuItemsIndicator.less';
import { SectionMenuItem } from '../PageWithMenu';

interface Props {
    items: SectionMenuItem[];
    activeSectionSlug?: string;
}

const bem = bemUtils('menuItemsIndicator');

const MenuItemsIndicator: React.FunctionComponent<Props> = ({ items, activeSectionSlug }) => {
    const currentItemIndex = items.findIndex((i) => i.slug === activeSectionSlug);
    return (
        <div className={bem.block} role="presentation" aria-hidden={true}>
            {items.map((item, idx) => {
                return (
                    <span
                        key={item.slug}
                        className={bem.element('item', idx <= currentItemIndex ? 'active' : undefined)}
                    />
                );
            })}
        </div>
    );
};

export default MenuItemsIndicator;
