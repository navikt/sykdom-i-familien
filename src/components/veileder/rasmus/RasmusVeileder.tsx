import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import RasmusSirkelSVG from './RasmusSirkelSVG';

import './rasmusVeileder.less';

interface Props {
    kompakt?: boolean;
    type: 'normal' | 'plakat';
    children: React.ReactNode;
}

const RasmusVeileder: React.FunctionComponent<Props> = ({ type, children, kompakt }) => (
    <div className={'veilederpanel--rasmus'}>
        <Veilederpanel svg={<RasmusSirkelSVG />} type={type} kompakt={kompakt}>
            {children}
        </Veilederpanel>
    </div>
);

export default RasmusVeileder;
