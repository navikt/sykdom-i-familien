import React from 'react';
import { MenuItem } from '../PageWithMenu';
import Lenke from 'nav-frontend-lenker';
import bemUtils from '../../../../utils/bemUtils';
import CircleMask from '../../../circle-mask/CircleMask';
import RocketSVG from '../../../../assets/rocketSVG';
import styles from '../../../../styles';

import './sidebarMenu.less';

interface Props {
    items: MenuItem[];
    footer?: React.ReactNode;
}

const bem = bemUtils('sidebarMenu');

const SidebarMenu: React.FunctionComponent<Props> = ({ items, footer }) => {
    return (
        <nav className={bem.block}>
            <div className={bem.element('icon')}>
                <CircleMask color={styles.colors.theme} size="5rem">
                    <RocketSVG />
                </CircleMask>
            </div>
            <div className={bem.element('items')}>
                {items.map((item) => (
                    <div key={item.slug} className={bem.element('item')}>
                        <Lenke href={`#${item.slug}`}>{item.label}</Lenke>
                    </div>
                ))}
            </div>
            {footer && <div className={bem.element('footer')}>{footer}</div>}
        </nav>
    );
};

export default SidebarMenu;
