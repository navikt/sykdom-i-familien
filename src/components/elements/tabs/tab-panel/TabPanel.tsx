import React from 'react';
import { Tab } from '../Tabs';
import SanityBlockContent from '../../../../sanity/components/sanity-block-content/SanityBlockContent';
import bemUtils from '../../../../utils/bemUtils';
import { Systemtittel } from 'nav-frontend-typografi';

interface Props {
    tab: Tab;
    bgcolor?: string;
    selected: boolean;
}

const bem = bemUtils('tabs');

const TabPanel: React.FunctionComponent<Props> = ({ tab, selected, bgcolor }) => (
    <div
        role="tabpanel"
        key={tab.label}
        className={bem.element('panel', selected ? 'selected' : 'hidden')}
        style={bgcolor ? { backgroundColor: bgcolor } : undefined}>
        <Systemtittel tag="h3" className={bem.element('panelTitle')}>
            {tab.label}
        </Systemtittel>
        <SanityBlockContent content={tab.content} />
    </div>
);

export default TabPanel;
