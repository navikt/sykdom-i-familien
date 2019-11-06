import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { Undertittel } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import {
    getSanityContentWithLocale,
    getSanityStringWithLocale
} from '../../../utils/sanity/getSanityContentWithLocale';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Box from '../../../components/layout/box/Box';
import SanityTabs from '../sanity-grouped-content/SanityGroupedContent';
import SanityTitleAndText from '../sanity-title-and-text/SanityTitleAndText';
import {
    SanityGroupedContentSchema,
    SanityExpandableContentSchema,
    SanityIllustrationSchema
} from '../../schema-types';
import Veileder from '../../../components/veileder/Veileder';
import SanityIllustration from '../sanity-illustration/SanityIllustrationContent';
import CollapsableTextBlock from '../../../components/elements/collapsable-text-block/CollapsableTextblock';

interface Props {
    content: string;
}

const SanityBlockContent: React.FunctionComponent<Props & InjectedIntlProps> = ({ content, intl }) => {
    if (!content) {
        return null;
    }
    return (
        <BlockContent
            blocks={content}
            serializers={{
                types: {
                    illustration: (props: { node: SanityIllustrationSchema }) => {
                        return (
                            <Box padBottom="l">
                                <SanityIllustration illustration={props.node} inline={false} />
                            </Box>
                        );
                    },
                    expandableContent: (props: { node: SanityExpandableContentSchema }) => {
                        const title = getSanityStringWithLocale(props.node.title, intl.locale);
                        const blockContent = getSanityContentWithLocale(props.node.content, intl.locale);

                        return 1 + 1 === 2 ? (
                            <CollapsableTextBlock title={title}>
                                <BlockContent blocks={blockContent} />
                            </CollapsableTextBlock>
                        ) : (
                            <Ekspanderbartpanel tittel={title} border={true}>
                                <BlockContent blocks={blockContent} />
                            </Ekspanderbartpanel>
                        );
                    },
                    veilederpanel: ({ node }: any) => {
                        const contentBlocks = getSanityContentWithLocale(node.content, intl.locale);
                        return (
                            <Veileder ansikt={node.face || 'glad'} fargetema={node.color || 'normal'}>
                                <BlockContent blocks={contentBlocks} />
                            </Veileder>
                        );
                    },
                    groupedContent: ({ node }: { node: SanityGroupedContentSchema }) => <SanityTabs node={node} />,
                    titleAndText: ({ node }: any) => {
                        const title = node.title ? getSanityStringWithLocale(node.title, intl.locale) : undefined;
                        if (node.layout && node.layout === 'expandablePanel' && title !== undefined) {
                            const blockContent = getSanityContentWithLocale(node.content, intl.locale);
                            return (
                                <CollapsableTextBlock title={title}>
                                    <BlockContent blocks={blockContent} />
                                </CollapsableTextBlock>
                            );
                        }
                        return <SanityTitleAndText node={node} />;
                    }
                }
            }}
        />
    );
};
export default injectIntl(SanityBlockContent);
