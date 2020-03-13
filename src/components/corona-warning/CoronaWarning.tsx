import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { Undertittel } from 'nav-frontend-typografi';
import Box from '../layout/box/Box';

interface Props {}

const CoronaWarning: React.FunctionComponent<Props> = (props) => (
    <div style={{ margin: '0 auto', maxWidth: '50rem' }}>
        <AlertStripeInfo>
            <Box padBottom="m">
                <Undertittel>Omsorgsdager og koronaviruset</Undertittel>
            </Box>
            <p>
                <Lenke href="https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/stengte-skoler-og-barnehager-gir-rett-til-omsorgspenger">
                    Du kan bruke omsorgsdager når barnehagen eller skolen stenger på grunn av koronaviruset
                </Lenke>
                .
            </p>
        </AlertStripeInfo>
    </div>
);

export default CoronaWarning;
