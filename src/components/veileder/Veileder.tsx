import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import classnames from 'classnames';
import VeilederSvg from './VeilederSvg';
import { VeilederpanelVeiledertype } from '../../sanity/types/objects';
import './veileder.less';
import Temaveileder from './temaveileder/Temaveileder';
import RasmusSirkelSVG from './temaveileder/RasmusSirkelSVG';

interface VeilederProps {
    veiledertype?: VeilederpanelVeiledertype;
    fargetema?: 'normal' | 'suksess' | 'advarsel' | 'feilmelding';
    ansikt?: 'glad' | 'undrende' | 'skeptisk';
    kompakt?: boolean;
    type: 'normal' | 'plakat';
    children: React.ReactNode;
    className?: string;
}

const Veileder = (props: VeilederProps) => {
    const {
        veiledertype = 'nomal',
        fargetema = 'normal',
        ansikt = 'glad',
        kompakt = true,
        type = 'normal',
        children,
        className
    } = props;

    const svgProps = {
        className: classnames('veileder', `veileder--${ansikt}`)
    };

    return veiledertype === 'rasmus' || veiledertype === 'temafarge' ? (
        <Temaveileder
            type={type}
            kompakt={kompakt}
            svg={veiledertype === 'rasmus' ? <RasmusSirkelSVG /> : <VeilederSvg svgProps={svgProps} />}>
            {children}
        </Temaveileder>
    ) : (
        <Veilederpanel
            veilederProps={{
                className,
                children: <VeilederSvg svgProps={svgProps} />
            }}
            svg={<VeilederSvg svgProps={svgProps} />}
            fargetema={fargetema}
            type={type}
            kompakt={kompakt}>
            {children}
        </Veilederpanel>
    );
};

export default Veileder;
