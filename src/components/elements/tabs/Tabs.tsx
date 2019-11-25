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
import { isBrowser } from '../../../utils/build';

type PresentationMode = 'tabs' | 'select';

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
}

const bem = bemUtils('tabs');

const Tabs: React.FunctionComponent<TabsProps> = ({
    tabs,
    presentation,
    title,
    bgcolor = styles.colors.themeLight
}: TabsProps) => {
    const [selectedTab, selectTab] = useState({ index: 0 });
    const [mode, setMode] = useState<PresentationMode>('select');

    //
    // React hydration fix:
    // Dersom denne ikke kjøres ved første render, vil en kunne havne i en
    // limbo mode med server-rendret htmlkode for select, mens content er tabs
    //
    const checkAndSetMode = (w: number) => {
        if (w <= 640 && mode !== 'select') {
            setMode('select');
        } else if (w > 640 && mode !== presentation) {
            setMode(presentation);
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
            <TabPanel key={tab.index} tab={tab} selected={tab.index === (selectedTab.index || 0)} bgcolor={bgcolor} />
        ));

    return (
        <div className={bem.modifier(mode)}>
            {title && (
                <Undertittel tag="h3" className={bem.element('title')}>
                    {title}
                </Undertittel>
            )}
            {mode === 'select' && renderSelect()}
            {mode === 'tabs' && renderTabs()}
            {renderContentPanels()}
        </div>
    );
};

export default Tabs;
