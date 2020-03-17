import React, { useEffect, useState } from 'react';
import { useLocation } from '@reach/router';
import { Undertittel } from 'nav-frontend-typografi';
import useWindowSize from '../../../hooks/useWindowSize';
import { SanityContentHeadingLevel } from '../../../sanity/types';
import { BlockContentObjectTypes } from '../../../sanity/types/objects';
import { getHeadingLevelForChild, getHeadingTag } from '../../../sanity/utils';
import styles from '../../../styles';
import bemUtils from '../../../utils/bemUtils';
import Select from './select/Select';
import TabButton from './tab-button/TabButton';
import TabPanel from './tab-panel/TabPanel';
import './tabs.less';

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
    slug?: string;
    sectionSlug?: string;
}

export interface TabsProps {
    title?: string;
    tabs: Tab[];
    bgcolor?: string;
    presentation: PresentationMode;
    headingLevel: SanityContentHeadingLevel;
    sectionSlug?: string;
}

const bem = bemUtils('tabs');

interface TabState {
    index: number;
}

const Tabs: React.FunctionComponent<TabsProps> = ({
    tabs,
    presentation,
    title,
    sectionSlug,
    headingLevel,
    bgcolor = styles.colors.themeLight
}: TabsProps) => {
    const [selectedTab, setSelectedTab] = useState<TabState>({ index: 0 });
    const [mode, setMode] = useState<PresentationMode>(PresentationMode.dropdown);
    const location = useLocation();
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

    const checkUrlAndSetActiveTab = () => {
        if (window && location) {
            const { hash } = location;
            const hashTab = hash !== '' && tabs.find((t) => t.slug !== undefined && hash.indexOf(t.slug) >= 0);
            if (hashTab) {
                setSelectedTab({ index: hashTab.index });
            }
        }
    };

    const { width } = useWindowSize((size) => {
        checkAndSetMode(size.width);
    });

    useEffect(() => {
        checkAndSetMode(width);
        checkUrlAndSetActiveTab();
    }, []);

    // React hydration fix (end)
    const renderTabs = () => (
        <div role="tablist" className={bem.element('tabs')}>
            {tabs.map((tab) => (
                <TabButton
                    key={tab.index}
                    label={tab.label}
                    icon={tab.illustration}
                    onSelect={() => setSelectedTab({ index: tab.index })}
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
                onChoiceSelect={(index) => setSelectedTab({ index })}
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
            {tabs
                .filter((tab) => tab.slug)
                .map(({ slug }) => {
                    const sectionTabSlug = `${sectionSlug}--${slug}`;
                    return <span key={sectionTabSlug} className="tabAnchor" id={sectionTabSlug} />;
                })}
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
