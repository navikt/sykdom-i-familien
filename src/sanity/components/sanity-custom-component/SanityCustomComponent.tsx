import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { CusomComponentDocument } from '../../types/documents';
import OmsorgsdagerKalkulator from '@navikt/omsorgsdager-kalkulator/lib/OmsorgsdagerKalkulator';
import OmsorgsdagerKalkulatorInfo from '@navikt/omsorgsdager-kalkulator/lib/OmsorgsdagerKalkulatorInfo';
import OmsorgsdagerKalkulatorInngang from '../../../custom-components/omsorgsdager-kalkulator-inngang/OmsorgsdagerKalkulatorInngang';

enum RegisteredComponents {
    'omsorgsdager_kalkulator_info' = 'omsorgsdager_kalkulator_info',
    'omsorgsdager_kalkulator' = 'omsorgsdager_kalkulator',
    'omsorgsdager_kalkulator_inngang' = 'omsorgsdager_kalkulator_inngang',
}

interface Props {
    component: CusomComponentDocument;
}

const SanityCustomComponent: React.FunctionComponent<Props> = ({ component: { componentId, name } }) => {
    switch (componentId) {
        case RegisteredComponents.omsorgsdager_kalkulator:
            return <OmsorgsdagerKalkulator includeHeader={false} />;
        case RegisteredComponents.omsorgsdager_kalkulator_info:
            return (
                <OmsorgsdagerKalkulatorInfo
                    kalkulatorHref={'https://www.nav.no/familie/sykdom-i-familien/nb/omsorgsdagerkalkulator-beregn'}
                    includeHeader={false}
                />
            );
        case RegisteredComponents.omsorgsdager_kalkulator_inngang:
            return <OmsorgsdagerKalkulatorInngang />;
        default:
            return (
                <>
                    <AlertStripeInfo>
                        <p>
                            Finner ikke{' '}
                            <strong>
                                <code>[{componentId}]</code>
                            </strong>
                        </p>
                        Gyldige valg er:
                        <ul>
                            {Object.keys(RegisteredComponents).map((key) => (
                                <li key={key}>{RegisteredComponents[key]}</li>
                            ))}
                        </ul>
                    </AlertStripeInfo>
                </>
            );
    }
};

export default SanityCustomComponent;
