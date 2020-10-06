import React from 'react';
import Panel from 'nav-frontend-paneler';
import SvgCalculatorLogo from './SvgCalculatorLogo';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import bemUtils from '../../utils/bemUtils';
import './omsorgsdager-kalkulator-inngang.less';
import Lenke from 'nav-frontend-lenker';

const bem = bemUtils('omsorgsdager-kalkulator-inngang');

const OmsorgsdagerKalkulatorInngang = () => (
    <Panel border={true} className={bem.block}>
        <SvgCalculatorLogo />
        <Undertittel className={bem.element('calcUndertittel')}>Kalkulator omsorgsdager</Undertittel>
        <Normaltekst>Med denne kalkulatoren kan du regne ut hvor mange omsorgsdager du kan ha rett på.</Normaltekst>
        <Lenke href={'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgsdagerkalkulator-info'}>
            Fortsett til kalkulator
        </Lenke>
    </Panel>
);

export default OmsorgsdagerKalkulatorInngang;
