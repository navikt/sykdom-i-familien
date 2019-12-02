import React from 'react';
import bemUtils from '../../../../utils/bemUtils';
// import CircleMask from '../../../elements/circle-mask/CircleMask';
// import RocketSVG from '../assets/rocketSVG';
// import styles from '../../../../styles';
import { Element } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import SiteTitle from '../../page-wrapper/components/global-page-header/site-title/SiteTitle';
import { Link } from 'gatsby-plugin-intl';
import MenuItemsIndicator from '../menu-items-indicator/MenuItemsIndicator';
import { SectionMenuItem } from '../PageWithMenu';

interface Props {
    isOpen: boolean;
    title: string;
    pageTitle: string;
    items: SectionMenuItem[];
    activeSectionSlug?: string;
    onClick: () => void;
}

const bem = bemUtils('mobileMenu').child('header');

const MobileMenuHeader: React.FunctionComponent<Props> = ({
    title,
    items,
    activeSectionSlug,
    pageTitle,
    isOpen,
    onClick
}) => {
    return (
        <>
            <div className={bem.element('pageTitle')}>
                <div className="breadcrumbs">
                    <div aria-hidden={true}>
                        <NavFrontendChevron type="venstre" />
                    </div>
                    <Link to="/">
                        <SiteTitle />
                    </Link>
                </div>
            </div>
            <div className={bem.classNames(bem.block, bem.modifierConditional('expanded', isOpen))} onClick={onClick}>
                {/* <div className={bem.element('icon')}>
                    <CircleMask color={styles.colors.theme} size="2.5rem" scaleSvg={false}>
                        <RocketSVG size="70%" />
                    </CircleMask>
                </div> */}
                <div className={bem.element('title')}>
                    <Element>{pageTitle}</Element>
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
