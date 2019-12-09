import React from 'react';
import { Tab } from '../Tabs';
import SanityBlockContent from '../../../../sanity/components/sanity-block-content/SanityBlockContent';
import bemUtils from '../../../../utils/bemUtils';
import { Undertittel } from 'nav-frontend-typografi';
import { SanityContentHeadingLevel } from '../../../../sanity/types';
import { getHeadingLevelForChild, getHeadingTag } from '../../../../sanity/utils';

interface Props {
    tab: Tab;
    bgcolor?: string;
    selected: boolean;
    headingLevel: SanityContentHeadingLevel;
}

const bem = bemUtils('tabs');

const TabPanel: React.FunctionComponent<Props> = ({ tab, selected, bgcolor, headingLevel }) => (
    <div
        role="tabpanel"
        key={tab.label}
        className={bem.element('panel', selected ? 'selected' : 'hidden')}
        style={bgcolor ? { backgroundColor: bgcolor } : undefined}>
        <Undertittel tag={getHeadingTag(headingLevel)} className={bem.element('panelTitle')}>
            {tab.contentTitle || tab.label}
        </Undertittel>
        <SanityBlockContent content={tab.content} headingLevel={headingLevel} />
    </div>
);

export default TabPanel;
