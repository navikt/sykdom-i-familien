import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
// import Lenke from 'nav-frontend-lenker';

interface Props {}

const TestInfo: React.FunctionComponent<Props> = (props) => (
    <div style={{ margin: '1rem' }}>
        <Alertstripe type="advarsel">
            <p>Dette er en side som er under testing for nye sider for Pleiepenger for sykt barn.</p>
            {/* <Lenke href="https://www.nav.no/no/Person/Familie/Sykdom+i+familien">
                sykdom i familien-sidene på nav.no
            </Lenke> */}
        </Alertstripe>
    </div>
);

export default TestInfo;
