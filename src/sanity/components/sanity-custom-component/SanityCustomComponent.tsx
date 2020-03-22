import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import OmsorgsdagerKalkis from '../../../custom-components/omsorgsdager-kalkis/OmsorgsdagerKalkis';
import { CusomComponentDocument } from '../../types/documents';

enum RegisteredComponents {
    'omsorgspenger_kalkis' = 'omsorgspenger_kalkis'
}

interface Props {
    component: CusomComponentDocument;
}

const SanityCustomComponent: React.FunctionComponent<Props> = ({ component: { componentId, name } }) => {
    switch (componentId) {
        case RegisteredComponents.omsorgspenger_kalkis:
            return <OmsorgsdagerKalkis />;
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
