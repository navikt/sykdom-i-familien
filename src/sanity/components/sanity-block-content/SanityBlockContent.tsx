import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import AlertStripe from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';
import CollapsableTextBlock from '../../../components/elements/collapsable-text-block/CollapsableTextblock';
import InfopanelMedKnapperView, {
    InfopanelMedKnapper,
} from '../../../components/infopanelMedKnapper/InfopanelMedKnapper';
import Box from '../../../components/layout/box/Box';
import Veileder from '../../../components/veileder/Veileder';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale,
} from '../../../utils/sanity/getSanityContentWithLocale';
import { SanityContentHeadingLevel } from '../../types';
import { AlertStripeObject, IllustrationDocument, MessageDocument } from '../../types/documents';
import {
    ExpandableContentObject,
    FaqObject,
    RasmusVeilederpanelObject,
    TabsObject,
    LinkCollectionObject,
    TextblockObject,
    VeilederpanelObject,
} from '../../types/objects';
import { getHeadingLevelForChild, getLocaleBlockContent, getLocaleString, getOptionalLocaleString } from '../../utils';
import SanityBlock from '../sanity-block/SanityBlock';
import SanityCustomComponent from '../sanity-custom-component/SanityCustomComponent';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import SanityMessage from '../sanity-message/SanityMessage';
import SanityTabs from '../sanity-tabs/SanityTabs';
import SanityTextblock from '../sanity-textblock/SanityTextblock';
import SanityLinkCollection from '../sanity-link-collection/SanityLinkCollection';
import { mapLinkCollectionItem } from '../../utils/linkCollectionUtils';
import { Site } from '../../../utils/site';

interface Props {
    content: string | any;
    headingLevel: SanityContentHeadingLevel;
    site: Site;
}

const SanityBlockContent: React.FunctionComponent<Props & InjectedIntlProps> = ({
    content,
    headingLevel,
    site,
    intl,
}) => {
    if (!content) {
        return null;
    }
    return (
        <div className={'formattedRichContent'}>
            <BlockContent
                blocks={content}
                serializers={{
                    types: {
                        customComponent: ({ node }: { node: any }) => {
                            return <SanityCustomComponent component={node} />;
                        },
                        message: ({ node }: { node: MessageDocument }) => {
                            return (
                                <Box padBottom="l">
                                    <SanityMessage message={node} />
                                </Box>
                            );
                        },
                        alertstripe: ({ node }: { node: AlertStripeObject }) => {
                            const title = getLocaleString(node.title, intl.locale);
                            const blockContent = getLocaleBlockContent(node.content, intl.locale);
                            return (
                                <Box padBottom="l">
                                    <AlertStripe type={node.style}>
                                        {title && <Element style={{ marginBottom: '.5rem' }}>{title}</Element>}
                                        <SanityBlock content={blockContent} />
                                    </AlertStripe>
                                </Box>
                            );
                        },
                        illustration: ({ node: illustration }: { node: IllustrationDocument }) => {
                            return (
                                <Box padBottom="l">
                                    <SanityIllustration illustration={illustration} inline={false} />
                                </Box>
                            );
                        },

                        expandableContent: ({ node: expandableContent }: { node: ExpandableContentObject }) => {
                            const title = getSanityStringWithLocale(expandableContent.title, intl.locale);
                            const blockContent = getSanityContentWithLocale(expandableContent.content, intl.locale);
                            return (
                                <Box padBottom="xl">
                                    <CollapsableTextBlock
                                        title={title}
                                        headingLevel={getHeadingLevelForChild(headingLevel)}>
                                        <SanityBlock content={blockContent} />
                                    </CollapsableTextBlock>
                                </Box>
                            );
                        },

                        veilederpanel: ({ node: veilederpanel }: { node: VeilederpanelObject }) => {
                            const contentBlocks = getSanityContentWithLocale(veilederpanel.content, intl.locale);
                            return (
                                <Box padBottom="xl">
                                    <Veileder
                                        veiledertype={veilederpanel.veiledertype}
                                        ansikt={veilederpanel.face || 'glad'}
                                        fargetema={veilederpanel.color || 'normal'}
                                        type={veilederpanel.type}
                                        kompakt={veilederpanel.kompakt === 'kompakt'}>
                                        <SanityBlock content={contentBlocks} />
                                    </Veileder>
                                </Box>
                            );
                        },
                        rasmusVeilederpanel: ({ node: veilederpanel }: { node: RasmusVeilederpanelObject }) => {
                            const contentBlocks = getSanityContentWithLocale(veilederpanel.content, intl.locale);
                            const title = getSanityStringWithLocale(veilederpanel.title, intl.locale);
                            return (
                                <Box padBottom="xl">
                                    <Veileder type="normal" veiledertype="rasmus" kompakt={true}>
                                        <div className="rasmusPanel">
                                            <h2 className="panelTitle">{title}</h2>
                                            <SanityBlock content={contentBlocks} />
                                        </div>
                                    </Veileder>
                                </Box>
                            );
                        },
                        tabs: ({ node: tabs }: { node: TabsObject }) => (
                            <Box padBottom="xl">
                                <SanityTabs tabs={tabs} headingLevel={getHeadingLevelForChild(headingLevel)} />
                            </Box>
                        ),
                        faq: ({ node }: { node: FaqObject }) => {
                            const title = getSanityStringWithLocale(node.title, intl.locale);
                            const blockContent = getLocaleBlockContent(node.content, intl.locale);
                            return (
                                <Box padBottom="xl">
                                    <CollapsableTextBlock
                                        isFaq={true}
                                        title={title}
                                        headingLevel={getHeadingLevelForChild(headingLevel)}>
                                        <SanityBlock content={blockContent} />
                                    </CollapsableTextBlock>
                                </Box>
                            );
                        },
                        textblock: ({ node: textblock }: { node: TextblockObject }) => {
                            const title = getOptionalLocaleString({ obj: textblock.title, locale: intl.locale });
                            if (
                                textblock.layout &&
                                (textblock.layout === 'expandablePanel' || textblock.layout === 'faq') &&
                                title !== undefined
                            ) {
                                const blockContent = getLocaleBlockContent(textblock.content, intl.locale);
                                return (
                                    <Box padBottom="xl">
                                        <CollapsableTextBlock
                                            title={title}
                                            isFaq={textblock.layout === 'faq'}
                                            headingLevel={getHeadingLevelForChild(headingLevel)}>
                                            <SanityBlock content={blockContent} />
                                        </CollapsableTextBlock>
                                    </Box>
                                );
                            }
                            if (textblock.layout && textblock.layout === 'faq' && title !== undefined) {
                                const blockContent = getLocaleBlockContent(textblock.content, intl.locale);
                                return (
                                    <Box padBottom="xl">
                                        <CollapsableTextBlock
                                            title={title}
                                            headingLevel={getHeadingLevelForChild(headingLevel)}>
                                            <SanityBlock content={blockContent} />
                                        </CollapsableTextBlock>
                                    </Box>
                                );
                            }
                            return (
                                <Box padBottom="xl">
                                    <SanityTextblock
                                        textblock={textblock}
                                        headingLevel={getHeadingLevelForChild(headingLevel)}
                                    />
                                </Box>
                            );
                        },
                        infopanelMedKnapper: ({ node: infopanelMedKnapper }: { node: InfopanelMedKnapper }) => (
                            <InfopanelMedKnapperView
                                infopanelMedKnapper={infopanelMedKnapper}
                                intl={intl}
                                headingLevel={headingLevel}
                            />
                        ),
                        linkCollection: ({ node }: { node: LinkCollectionObject }) => {
                            const title = getSanityStringWithLocale(node.title, intl.locale);
                            const ingress = getSanityContentWithLocale(node.ingress, intl.locale);
                            const links = node.links.map((item) => mapLinkCollectionItem(item, intl.locale));
                            return (
                                <SanityLinkCollection
                                    title={title}
                                    ingress={ingress}
                                    links={links}
                                    headingLevel={headingLevel}
                                    site={site}
                                />
                            );
                        },
                    },
                }}
            />
        </div>
    );
};
export default injectIntl(SanityBlockContent);
