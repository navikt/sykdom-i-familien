import React from 'react';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale, defaultLocale } from '../../../types/locale';
import { getLocale } from '../../../utils/inltUtils';
import Tabs, { TabsProps } from '../../tabs/Tabs';
import { SanityTabsNode } from '../../../types/sanity-schema/sanityTabsNode';
import InlineSVG from '../../inline-svg/InlineSVG';
import { SanityLocaleStringNode } from '../../../types/sanity-schema/sanityLocaleStringNode';

interface Props {
    node: SanityTabsNode;
}

const hasTitleValue = (title: SanityLocaleStringNode): boolean =>
    title !== undefined && title.nb !== undefined && title[defaultLocale] !== '';

export const extractTabsData = (node: SanityTabsNode, locale: Locale): TabsProps => {
    const tabsData: TabsProps = {
        name: node.name,
        tabs: node.content.map((tab, index: number) => ({
            index,
            label: getSanityContentWithLocale(hasTitleValue(tab.title) ? tab.title : tab.content.title, locale),
            illustration:
                tab.tabIllustration && tab.tabIllustration.svg ? (
                    <InlineSVG illustration={tab.tabIllustration.svg} width="3.5rem" />
                ) : (
                    undefined
                ),
            content: tab.content.content
        }))
    };
    return tabsData;
};

const SanityTabs: React.FunctionComponent<Props & InjectedIntlProps> = ({ node, intl }) => {
    const tabsData = extractTabsData(node, getLocale(intl));
    return <Tabs tabs={tabsData.tabs} />;
};

export default injectIntl(SanityTabs);
