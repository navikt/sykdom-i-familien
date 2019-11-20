import React from 'react';
import bemUtils from '../../../../utils/bemUtils';
import RocketSVG from '../assets/rocketSVG';
import styles from '../../../../styles';
import CircleMask from '../../../elements/circle-mask/CircleMask';
import './sidebarMenu.less';
import SectionLinks from '../section-links/SectionLinks';
import { SectionMenuItem } from '../PageWithMenu';

interface Props {
    items: SectionMenuItem[];
    activeSectionSlug?: string;
    footer?: React.ReactNode;
}

const bem = bemUtils('sidebarMenu');

const SidebarMenu: React.FunctionComponent<Props> = ({ items, footer, activeSectionSlug }) => {
    return (
        <nav className={bem.block}>
            <div className={bem.element('icon')}>
                <CircleMask color={styles.colors.theme} size="5rem">
                    <RocketSVG size="3rem" />
                </CircleMask>
            </div>
            <div className={bem.element('items')}>
                <SectionLinks items={items} activeSectionSlug={activeSectionSlug} />
            </div>
            {footer && <div className={bem.element('footer')}>{footer}</div>}
        </nav>
    );
};

export default SidebarMenu;
