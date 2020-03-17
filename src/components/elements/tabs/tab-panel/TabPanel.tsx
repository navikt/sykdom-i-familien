import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import SanityBlockContent from '../../../../sanity/components/sanity-block-content/SanityBlockContent';
import { SanityContentHeadingLevel } from '../../../../sanity/types';
import { getHeadingTag } from '../../../../sanity/utils';
import bemUtils from '../../../../utils/bemUtils';
import { Tab } from '../Tabs';

interface Props {
    id?: string;
    tab: Tab;
    bgcolor?: string;
    selected: boolean;
    headingLevel: SanityContentHeadingLevel;
}

const bem = bemUtils('tabs');

const TabPanel: React.FunctionComponent<Props> = ({ id, tab, selected, bgcolor, headingLevel }) => (
    <div
        id={id}
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
