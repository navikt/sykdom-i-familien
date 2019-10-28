import React, { useState } from 'react';
import bemUtils from '../../utils/bemUtils';
import TabButton from './tab-button/TabButton';
import TabPanel from './tab-panel/TabPanel';

import './tabs.less';

export interface Tab {
    index: number;
    label: string;
    illustration?: React.ReactNode;
    content: string;
}

export interface TabsProps {
    name?: string;
    tabs: Tab[];
}

const bem = bemUtils('tabs');

const Tabs: React.FunctionComponent<TabsProps> = ({ tabs }: TabsProps) => {
    const [selectedTab, selectTab] = useState({ index: 0 });

    return (
        <div className={bem.class}>
            <div role="tablist" className={bem.element('tabs')}>
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.index}
                        label={tab.label}
                        icon={tab.illustration}
                        onSelect={() => selectTab({ index: tab.index })}
                        isSelected={selectedTab.index === tab.index}
                    />
                ))}
            </div>
            {tabs.map((tab) => (
                <TabPanel key={tab.index} tab={tab} selected={tab.index === selectedTab.index} />
            ))}
        </div>
    );
};

export default Tabs;
