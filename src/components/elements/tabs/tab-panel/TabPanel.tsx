import React from 'react';
import { Tab } from '../Tabs';
import BlockContent from '../../../../sanity/components/sanity-block-content/SanityBlockContent';

interface Props {
    tab: Tab;
    selected: boolean;
}

const TabPanel: React.FunctionComponent<Props> = ({ tab, selected }) => (
    <div role="tabpanel" key={tab.label} style={{ display: selected ? 'block' : 'none' }}>
        <BlockContent content={tab.content} />
    </div>
);

export default TabPanel;
