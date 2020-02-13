import BlockContent from '@sanity/block-content-to-react';
import React from 'react';
import { InjectedIntlProps, injectIntl } from 'gatsby-plugin-intl';
import CollapsableTextBlock from '../../../components/elements/collapsable-text-block/CollapsableTextblock';
import InfopanelMedKnapperView, {
    InfopanelMedKnapper
} from '../../../components/infopanelMedKnapper/InfopanelMedKnapper';
import Box from '../../../components/layout/box/Box';
import Veileder from '../../../components/veileder/Veileder';
import {
    getSanityContentWithLocale, getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { SanityContentHeadingLevel } from '../../types';
import { IllustrationDocument } from '../../types/documents';
import {
    ExpandableContentObject, RasmusVeilederpanelObject, TabsObject, TextblockObject,
    VeilederpanelObject
} from '../../types/objects';
import {
    getHeadingLevelForChild, getLocaleBlockContent, getOptionalLocaleString
} from '../../utils';
import SanityBlock from '../sanity-block/SanityBlock';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import SanityTabs from '../sanity-tabs/SanityTabs';
import SanityTextblock from '../sanity-textblock/SanityTextblock';

interface Props {
    content: string | any;
    headingLevel: SanityContentHeadingLevel;
}

const SanityBlockContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ content, headingLevel, intl }) => {
    if (!content) {
        return null;
    }
    return (
        <div className={'formattedRichContent'}>
            <BlockContent
                blocks={content}
                serializers={{
                    types: {
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
                        textblock: ({ node: textblock }: { node: TextblockObject }) => {
                            const title = getOptionalLocaleString(textblock.title);
                            if (textblock.layout && textblock.layout === 'expandablePanel' && title !== undefined) {
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
                        )
                    }
                }}
            />
        </div>
    );
};
export default injectIntl(SanityBlockContent);
