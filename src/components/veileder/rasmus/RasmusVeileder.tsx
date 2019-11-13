import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import RasmusSirkelSVG from './RasmusSirkelSVG';

import './rasmusVeileder.less';
import MediaQuery from 'react-responsive';

interface Props {
    kompakt?: boolean;
    type: 'normal' | 'plakat';
    children: React.ReactNode;
}

const RasmusVeileder: React.FunctionComponent<Props> = ({ type, children, kompakt }) => (
    <div className={'veilederpanel--rasmus'}>
        <MediaQuery maxWidth={800}>
            <Veilederpanel svg={<RasmusSirkelSVG />} type={'plakat'} kompakt={kompakt}>
                {children}
            </Veilederpanel>
        </MediaQuery>
        <MediaQuery minWidth={801}>
            <Veilederpanel svg={<RasmusSirkelSVG />} type={type} kompakt={kompakt}>
                {children}
            </Veilederpanel>
        </MediaQuery>
    </div>
);

export default RasmusVeileder;
