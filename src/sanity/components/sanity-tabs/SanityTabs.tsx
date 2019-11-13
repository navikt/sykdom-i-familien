import React from 'react';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale } from '../../../i18n/locale';
import { getLocale } from '../../../utils/inltUtils';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import Tabs, { TabsProps } from '../../../components/elements/tabs/Tabs';
import { TabsObject } from '../../types/objects';
import { getOptionalLocaleString, getLocaleString } from '../../utils';

interface Props {
    tabs: TabsObject;
}

export const extractTabsData = (tabs: TabsObject, locale: Locale): TabsProps => {
    const { title, presentation } = tabs;
    const tabsData: TabsProps = {
        presentation,
        title: getOptionalLocaleString(title),
        bgcolor: tabs.bgcolor,
        tabs: tabs.content.map((tab, index: number) => ({
            index,
            label: getLocaleString(tab.title, locale),
            illustration:
                tab.tabIllustration && tab.tabIllustration.svg ? (
                    <InlineSVG illustration={tab.tabIllustration.svg} width="3.5rem" />
                ) : (
                    undefined
                ),
            content: tab.content
        }))
    };
    return tabsData;
};

const SanityGroupedContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ tabs, intl }) => {
    const tabsData = extractTabsData(tabs, getLocale(intl));
    return <Tabs {...tabsData} />;
};

export default injectIntl(SanityGroupedContent);
