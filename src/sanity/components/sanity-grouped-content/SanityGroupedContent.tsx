import React from 'react';
import { getSanityStringWithLocale } from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { Locale, defaultLocale } from '../../../i18n/locale';
import { getLocale } from '../../../utils/inltUtils';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import { SanityGroupedContentSchema, SanityLocaleStringSchema } from '../../schema-types';
import Tabs, { TabsProps } from '../../../components/elements/tabs/Tabs';

interface Props {
    node: SanityGroupedContentSchema;
}

const hasTitleValue = (title: SanityLocaleStringSchema): boolean =>
    title !== undefined && title.nb !== undefined && title[defaultLocale] !== '';

export const extractGroupedContentData = (node: SanityGroupedContentSchema, locale: Locale): TabsProps => {
    const tabsData: TabsProps = {
        presentation: node.presentation,
        title: hasTitleValue(node.title) ? getSanityStringWithLocale(node.title, defaultLocale) : undefined,
        tabs: node.content.map((tab, index: number) => ({
            index,
            label: getSanityStringWithLocale(hasTitleValue(tab.title) ? tab.title : tab.content.title, locale) || '',
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

const SanityGroupedContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ node, intl }) => {
    const tabsData = extractGroupedContentData(node, getLocale(intl));
    return <Tabs {...tabsData} />;
};

export default injectIntl(SanityGroupedContent);
