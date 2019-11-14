import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import Box from '../../../components/layout/box/Box';
import SanityTabs from '../sanity-tabs/SanityTabs';
import SanityTextblock from '../sanity-textblock/SanityTextblock';
import Veileder from '../../../components/veileder/Veileder';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import CollapsableTextBlock from '../../../components/elements/collapsable-text-block/CollapsableTextblock';
import SanityBlock from '../sanity-block/SanityBlock';
import { TextblockObject, VeilederpanelObject, ExpandableContentObject, TabsObject } from '../../types/objects';
import { getOptionalLocaleString, getLocaleBlockContent } from '../../utils';
import { IllustrationDocument } from '../../types/documents';

interface Props {
    content: string | any;
}

const SanityBlockContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ content, intl }) => {
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
                                <CollapsableTextBlock title={title}>
                                    <SanityBlock content={blockContent} />
                                </CollapsableTextBlock>
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
                        tabs: ({ node: tabs }: { node: TabsObject }) => (
                            <Box padBottom="xl">
                                <SanityTabs tabs={tabs} />
                            </Box>
                        ),
                        textblock: ({ node: textblock }: { node: TextblockObject }) => {
                            const title = getOptionalLocaleString(textblock.title);
                            if (textblock.layout && textblock.layout === 'expandablePanel' && title !== undefined) {
                                const blockContent = getLocaleBlockContent(textblock.content, intl.locale);
                                return (
                                    <CollapsableTextBlock title={title}>
                                        <SanityBlock content={blockContent} />
                                    </CollapsableTextBlock>
                                );
                            }
                            return (
                                <Box padBottom="xl">
                                    <SanityTextblock textblock={textblock} />
                                </Box>
                            );
                        }
                    }
                }}
            />
        </div>
    );
};
export default injectIntl(SanityBlockContent);
