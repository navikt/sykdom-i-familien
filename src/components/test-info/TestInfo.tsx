import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';

interface Props {}

const TestInfo: React.FunctionComponent<Props> = (props) => (
    <div style={{ margin: '1rem' }}>
        <Alertstripe type="advarsel">
            <p>
                Dette er en side som er under testing for nye sider på <Lenke href="https://www.nav.no/">nav.no</Lenke>{' '}
                for Pleiepenger for sykt barn.
            </p>
        </Alertstripe>
    </div>
);

export default TestInfo;
