import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

interface Props {}

const TestInfo: React.FunctionComponent<Props> = (props) => (
    <div style={{ margin: '1rem' }}>
        <Alertstripe type="advarsel">
            Denne siden er en testversjon av nye sider for sykdom i familien. Dersom du ikke skal teste sidene, må du gå
            til{' '}
            <Lenke href="https://www.nav.no/no/Person/Familie/Sykdom+i+familien">
                sykdom i familien-sidene på nav.no
            </Lenke>
            .
        </Alertstripe>
    </div>
);

export default TestInfo;
