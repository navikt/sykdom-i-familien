import React, { useState } from 'react';
import bemUtils from '../../../utils/bemUtils';
import TabButton from './tab-button/TabButton';
import TabPanel from './tab-panel/TabPanel';

import './tabs.less';
import Select from './select/Select';
import { Undertittel } from 'nav-frontend-typografi';
import { BlockContentObjectTypes } from '../../../sanity/types/objects';
import MediaQuery from 'react-responsive';
import styles from '../../../styles';

export interface Tab {
    index: number;
    label: string;
    illustration?: React.ReactNode;
    contentTitle?: string;
    content: BlockContentObjectTypes[];
}

export interface TabsProps {
    title?: string;
    tabs: Tab[];
    bgcolor?: string;
    presentation: 'tabs' | 'dropdown';
}

const bem = bemUtils('tabs');

const Tabs: React.FunctionComponent<TabsProps> = ({
    tabs,
    presentation,
    title,
    bgcolor = styles.colors.theme
}: TabsProps) => {
    const [selectedTab, selectTab] = useState({ index: 0 });

    const renderTabs = () => (
        <>
            {title && (
                <Undertittel tag="h3" className={bem.element('title')}>
                    {title}
                </Undertittel>
            )}

            <div role="tablist" className={bem.element('tabs')}>
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.index}
                        label={tab.label}
                        icon={tab.illustration}
                        onSelect={() => selectTab({ index: tab.index })}
                        isSelected={selectedTab.index === tab.index}
                        panelBkg={bgcolor}
                    />
                ))}
            </div>
        </>
    );

    const renderSelect = () => (
        <>
            {title && (
                <Undertittel tag="h3" className={bem.element('title')}>
                    {title}
                </Undertittel>
            )}
            <div className={bem.element('select')}>
                <Select
                    choices={tabs}
                    onChoiceSelect={(index) => selectTab({ index })}
                    selected={tabs[selectedTab.index]}
                />
            </div>
        </>
    );

    return (
        <div className={bem.block}>
            <MediaQuery maxWidth={640}>{renderSelect()}</MediaQuery>
            <MediaQuery minWidth={641}>{presentation === 'tabs' ? renderTabs() : renderSelect()}</MediaQuery>
            {tabs.map((tab) => (
                <TabPanel key={tab.index} tab={tab} selected={tab.index === selectedTab.index} bgcolor={bgcolor} />
            ))}
        </div>
    );
};

export default Tabs;
