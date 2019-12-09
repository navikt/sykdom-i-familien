import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import MediaQuery from 'react-responsive';

import './temaveileder.less';

interface Props {
    svg: React.ReactNode;
    kompakt?: boolean;
    type: 'normal' | 'plakat';
    children: React.ReactNode;
}

const Temaveileder: React.FunctionComponent<Props> = ({ svg, type, children, kompakt }) => (
    <div className={'veilederpanel--tema'}>
        <MediaQuery maxWidth={800}>
            <Veilederpanel svg={svg} type={'plakat'} kompakt={kompakt}>
                {children}
            </Veilederpanel>
        </MediaQuery>
        <MediaQuery minWidth={801}>
            <Veilederpanel svg={svg} type={type} kompakt={kompakt}>
                {children}
            </Veilederpanel>
        </MediaQuery>
    </div>
);

export default Temaveileder;
