import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import InlineSVG from '../../../components/elements/inline-svg/InlineSVG';
import Tabs, { PresentationMode, TabsProps } from '../../../components/elements/tabs/Tabs';
import { Locale } from '../../../i18n/locale';
import { getLocale } from '../../../utils/inltUtils';
import { SanityContentHeadingLevel } from '../../types';
import { TabsObject } from '../../types/objects';
import { getLocaleString, getOptionalLocaleString } from '../../utils';

interface Props {
    tabs: TabsObject;
    headingLevel: SanityContentHeadingLevel;
}

export const extractTabsData = (
    tabs: TabsObject,
    headingLevel: SanityContentHeadingLevel,
    locale: Locale
): TabsProps => {
    const { title, presentation } = tabs;

    const tabsData: TabsProps = {
        presentation: presentation === 'dropdown' ? PresentationMode.dropdown : PresentationMode.tabs,
        title: getOptionalLocaleString({ obj: title, locale }),
        bgcolor: tabs.bgcolor,
        headingLevel,
        sectionSlug: tabs.sectionSlug,
        tabs: tabs.content.map((tab, index: number) => {
            return {
                index,
                label: getLocaleString(tab.title, locale),
                illustration:
                    tab.tabIllustration && tab.tabIllustration.svg ? (
                        <InlineSVG illustration={tab.tabIllustration.svg} width="3.5rem" />
                    ) : (
                        undefined
                    ),
                contentTitle: tab.contentTitle ? getLocaleString(tab.contentTitle, locale) : undefined,
                content: tab.content,
                slug: tab.slug,
                sectionSlug: tabs.sectionSlug
            };
        })
    };
    return tabsData;
};

const SanityTabs: React.FunctionComponent<Props & InjectedIntlProps> = ({ tabs, headingLevel, intl }) => {
    const tabsData = extractTabsData(tabs, headingLevel, getLocale(intl));
    return <Tabs {...tabsData} />;
};

export default injectIntl(SanityTabs);
