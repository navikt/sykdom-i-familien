import React from 'react';
import bemUtils from '../../../../utils/bemUtils';
import CircleMask from '../../../elements/circle-mask/CircleMask';
import RocketSVG from '../../../../assets/rocketSVG';
import styles from '../../../../styles';
import { Element } from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';

interface Props {
    isOpen: boolean;
    title: string;
    onClick: () => void;
}

const bem = bemUtils('mobileMenu').child('header');

const MobileMenuHeader: React.FunctionComponent<Props> = ({ title, isOpen, onClick }) => {
    return (
        <div className={bem.classNames(bem.block, isOpen ? 'expanded' : undefined)} onClick={onClick}>
            <div className={bem.element('icon')}>
                <CircleMask color={styles.colors.theme} size="3rem">
                    <RocketSVG size="70%" />
                </CircleMask>
            </div>
            <div className={bem.element('title')}>
                <Element>{title}</Element>
            </div>
            <div className={bem.element('chevron')}>
                <NavFrontendChevron stor={true} type={isOpen ? 'opp' : 'ned'} />
            </div>
        </div>
    );
};

export default MobileMenuHeader;
