import React from 'react';
import { getSanityContentWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale, defaultLocale } from '../../../i18n/locale';
import { getLocale } from '../../../utils/inltUtils';
import Tabs, { TabsProps } from '../../../components/tabs/Tabs';
import InlineSVG from '../../../components/inline-svg/InlineSVG';
import { SanityGroupedContentSchema, SanityLocaleStringSchema } from '../../schema-types';

interface Props {
    node: SanityGroupedContentSchema;
}

const hasTitleValue = (title: SanityLocaleStringSchema): boolean =>
    title !== undefined && title.nb !== undefined && title[defaultLocale] !== '';

export const extractGroupedContentData = (node: SanityGroupedContentSchema, locale: Locale): TabsProps => {
    const tabsData: TabsProps = {
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
    const tabsData = extractGroupedContentData(node, getLocale(intl));
    return <Tabs tabs={tabsData.tabs} />;
};

export default injectIntl(SanityTabs);
