import React from 'react';
import { Element } from 'nav-frontend-typografi';
import BEMHelper from 'app/utils/bem';
import NavFrontendChevron from 'nav-frontend-chevron';
import SvgMask from 'app/components/svg-mask/SvgMask';

const cls = BEMHelper('mobilmeny');
const icon = require('../../../assets/icons/rakett.svg').default;

const MobilMenyHeader = ({ isOpen, header }: { isOpen: boolean; header: string }) => (
    <div className={cls.element('header', isOpen ? 'expanded' : undefined)}>
        <div className={cls.element('flexLeft')}>
            <div className={cls.element('icon')}>
                <SvgMask smaller={true} svg={icon} />
            </div>
        </div>
        <Element>{header}</Element>
        <NavFrontendChevron stor={true} type={isOpen ? 'opp' : 'ned'} />
    </div>
);

export default MobilMenyHeader;
