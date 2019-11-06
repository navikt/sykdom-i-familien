import React from 'react';
import { Tab } from '../Tabs';
import BlockContent from '../../../../sanity/components/sanity-block-content/SanityBlockContent';
import bemUtils from '../../../../utils/bemUtils';
import { Systemtittel } from 'nav-frontend-typografi';

interface Props {
    tab: Tab;
    selected: boolean;
}

const bem = bemUtils('tabs');

const TabPanel: React.FunctionComponent<Props> = ({ tab, selected }) => (
    <div role="tabpanel" key={tab.label} className={bem.element('panel', selected ? 'selected' : 'hidden')}>
        <Systemtittel className={bem.element('panelTitle')}>{tab.label}</Systemtittel>
        <BlockContent content={tab.content as string} />
    </div>
);

export default TabPanel;
