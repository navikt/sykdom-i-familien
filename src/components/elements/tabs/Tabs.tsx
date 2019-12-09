import React, { useState, useEffect } from 'react';
import bemUtils from '../../../utils/bemUtils';
import TabButton from './tab-button/TabButton';
import TabPanel from './tab-panel/TabPanel';

import './tabs.less';
import Select from './select/Select';
import { Undertittel } from 'nav-frontend-typografi';
import { BlockContentObjectTypes } from '../../../sanity/types/objects';
import useWindowSize from '../../../hooks/useWindowSize';
import styles from '../../../styles';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { getHeadingTag, getHeadingLevelForChild } from '../../../sanity/utils';

export enum PresentationMode {
    tabs = 'tabs',
    dropdown = 'dropdown'
}

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
    presentation: PresentationMode;
    headingLevel: SanityContentHeadingLevel;
}

const bem = bemUtils('tabs');

const Tabs: React.FunctionComponent<TabsProps> = ({
    tabs,
    presentation,
    title,
    headingLevel,
    bgcolor = styles.colors.themeLight
}: TabsProps) => {
    const [selectedTab, selectTab] = useState({ index: 0 });
    const [mode, setMode] = useState<PresentationMode>(PresentationMode.dropdown);

    //
    // React hydration fix:
    // Dersom denne ikke kjøres ved første render, vil en kunne havne i en
    // limbo mode med server-rendret htmlkode for select, mens content er tabs
    //
    const checkAndSetMode = (w: number) => {
        if (w <= 640 && mode !== PresentationMode.dropdown) {
            setMode(PresentationMode.dropdown);
        } else if (w > 640 && mode !== presentation) {
            setMode(presentation || PresentationMode.tabs);
        }
    };
    const { width } = useWindowSize((size) => {
        checkAndSetMode(size.width);
    });
    useEffect(() => {
        checkAndSetMode(width);
    }, []);
    // React hydration fix (end)

    const renderTabs = () => (
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
    );

    const renderSelect = () => (
        <div className={bem.element('select')}>
            <Select
                panelBkg={bgcolor}
                choices={tabs}
                onChoiceSelect={(index) => selectTab({ index })}
                selected={tabs[selectedTab.index]}
            />
        </div>
    );

    const renderContentPanels = () =>
        tabs.map((tab) => (
            <TabPanel
                key={tab.index}
                tab={tab}
                selected={tab.index === (selectedTab.index || 0)}
                bgcolor={bgcolor}
                headingLevel={getHeadingLevelForChild(headingLevel)}
            />
        ));

    return (
        <div className={bem.modifier(mode)}>
            {title && (
                <Undertittel tag={getHeadingTag(headingLevel)} className={bem.element('title')}>
                    {title}
                </Undertittel>
            )}
            {mode === PresentationMode.dropdown && renderSelect()}
            {mode === PresentationMode.tabs && renderTabs()}
            {renderContentPanels()}
        </div>
    );
};

export default Tabs;
