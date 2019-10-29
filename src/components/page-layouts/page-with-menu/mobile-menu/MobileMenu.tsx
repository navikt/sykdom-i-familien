import React from 'react';
import { MenuItem } from '../PageWithMenu';
import bemUtils from '../../../../utils/bemUtils';

import './mobileMenu.less';

interface Props {
    items: MenuItem[];
}

const bem = bemUtils('mobileMenu');

const MobileMenu: React.FunctionComponent<Props> = (props) => <nav className={bem.block}>sdf</nav>;

export default MobileMenu;
